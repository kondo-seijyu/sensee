import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { company = '-', name = '-', email = '-', request, purpose = '-' } = await req.json();

    const safePurpose = purpose?.trim() !== '' ? purpose : '（未記入）';

    if (!request || request.trim() === '') {
      return NextResponse.json({ success: false, error: 'リクエスト内容は必須です。' }, { status: 400 });
    }

    const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // 管理者宛メール
    await transporter.sendMail({
      from: `"画像リクエストフォーム" <${process.env.SMTP_USER}>`,
      to: process.env.TARGET_EMAIL!,
      replyTo: email,
      subject: '【Sensee】画像リクエストが届きました',
      text: `
【Sensee】画像リクエストフォームからメッセージが届きました。

▼受信日時：
${now}

▼会社名・学校名：
${company}

▼氏名：
${name}

▼メールアドレス：
${email}

▼リクエスト内容：
${request}

▼利用目的・シーン：
${safePurpose}
      `.trim(),
    });

    // 自動返信メール（メールアドレス入力時のみ）
    if (email && email.includes('@')) {
      await transporter.sendMail({
        from: `"Sensee運営" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '【Sensee】画像リクエストを受け付けました',
        text: `
${name} 様

画像リクエストありがとうございます！
以下の内容でリクエストを受け付けました。

=======================
▼会社名・学校名：
${company}

▼氏名：
${name}

▼リクエスト内容：
${request}

▼利用目的・シーン：
${safePurpose}
=======================

内容を確認し、できるだけ早く対応いたします。
今後ともSenseeをよろしくお願いいたします。

-------------------------
Sensee（センシー）運営
https://sensee.site/
      `.trim(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('💥 リクエスト処理エラー:', error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: '送信に失敗しました。' }, { status: 500 });
  }
}