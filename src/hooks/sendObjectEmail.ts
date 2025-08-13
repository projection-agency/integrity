import nodemailer from 'nodemailer';

export async function sendObjectEmail(data: Record<string, any>) {
  // Створюємо HTML-таблицю з об'єкта
  const htmlTable = `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial; font-size: 14px;">
      <thead>
        <tr>
          <th align="left">Key</th>
          <th align="left">Value</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td>${key}</td><td>${String(value)}</td></tr>`
    )
    .join('')}
      </tbody>
    </table>
  `;

  // Створюємо транспортер
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 's.slashua@gmail.com',
      pass: 'wdzq tcir uizn dgaq',
    },
  });

  // Надсилаємо лист
  const info = await transporter.sendMail({
    from: `"Payload CMS" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // на свою ж пошту
    subject: 'Нові дані з форми',
    html: htmlTable,
  });

  console.log('📨 Email sent:', info.messageId);
  return info;
}
