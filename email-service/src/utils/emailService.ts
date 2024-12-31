import { Patient } from "../types/Patient";

const { BASE_URL } = process.env;
const htmlTemplate = (patient: Patient, baseUrl: string) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
        <style>
            body, p {
                margin: 0;
                padding: 0;
            }
            .email-wrapper {
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
            }
            .content {
                line-height: 1.6;
                color: #333333;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                background-color: #4CAF50;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 4px;
                margin: 20px 0;
            }
            @media screen and (max-width: 600px) {
                .email-wrapper {
                    width: 100% !important;
                    padding: 10px !important;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
        <div class="email-wrapper">
            <div class="content">
                <p style="margin-bottom: 15px;">Dear ${patient.name},</p>
                <p style="margin-bottom: 20px;">To verify your account, please click the link below:</p>
                <div style="text-align: center;">
                    <a href="${baseUrl}/patients/${patient.id}/verify" class="button">
                        Verify your account
                    </a>
                </div>
                <p style="margin-top: 20px;">Thank you!</p>
                <p style="margin-top: 30px; font-size: 12px; color: #666666;">
                    If you didn't request this verification, please ignore this email.
                </p>
            </div>
        </div>
    </body>
    </html>
`;

export function createVerificationEmail(patient: Patient) {
  if (!BASE_URL)
    throw new Error("Base URL is required to generate verifation email");

  const text = `Dear ${patient.name},\nTo verify your account, please click the link below:\n${BASE_URL}/patients/${patient.id}\nThank you!\n`;

  const html = htmlTemplate(patient, BASE_URL);

  return { text, html };
}
