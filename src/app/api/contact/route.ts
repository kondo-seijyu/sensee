import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message, company = '-', tel = '-' } = data;

    // 必須項目チェック
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: '必須項目が不足しています。' },
        { status: 400 }
      );
    }

    // SMTP トランスポートの設定
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org', // Mailgun の例。必要に応じて変更
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // メール内容
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'sensee@reflection-inc.com',
      subject: '【Sensee】お問い合わせが届きました',
      text: `
【Sensee】お問い合わせフォームからメッセージが届きました。

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
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json({ success: false, error: '送信に失敗しました。' }, { status: 500 });
  }
}