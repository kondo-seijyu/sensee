import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, message, company = '-', tel = '-' } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: '必須項目が不足しています。' }, { status: 400 });
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

    await transporter.sendMail({
      from: `"お問い合わせフォーム" <${process.env.SMTP_USER}>`,
      to: process.env.TARGET_EMAIL!,
      replyTo: email,
      subject: '【Sensee】お問い合わせが届きました',
      text: `
【Sensee】お問い合わせフォームからメッセージが届きました。

▼受信日時：
${now}

▼会社名・学校名：
${company}

▼氏名：
${name}

▼電話番号：
${tel}

▼メールアドレス：
${email}

▼お問い合わせ内容：
${message}
      `.trim(),
    });

    await transporter.sendMail({
      from: `"Sensee運営" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '【Sensee】お問い合わせありがとうございます',
      text: `
${name} 様

この度はお問い合わせいただきありがとうございます。
以下の内容でお問い合わせを受け付けました。

=======================
▼会社名・学校名：
${company}

▼氏名：
${name}

▼電話番号：
${tel}

▼メールアドレス：
${email}

▼お問い合わせ内容：
${message}
=======================

内容を確認のうえ、担当よりご連絡させていただく場合がございます。
今後ともSenseeをよろしくお願いいたします。

-------------------------
Sensee（センシー）運営
https://sensee.site/
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('📮 メール送信エラー:', error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: '送信に失敗しました。' }, { status: 500 });
  }
}