import nodemailer from 'nodemailer'

const senderEmail = process.env.BFF_EMAIL_SENDER_EMAIL
const senderPassword = process.env.BFF_EMAIL_SENDER_PASSWORD
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmail,
    pass: senderPassword
  }
})

export const sendMail: (
  to: string,
  subject: string,
  body: string
) => Promise<void> = async (to, subject, body) => {
  const mailOptions = {
    from: senderEmail,
    to,
    subject,
    body
  }
  await transporter.sendMail(mailOptions)
}
