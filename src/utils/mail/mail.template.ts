import { sendEmail } from "@/utils/mail/mail";

export const sendVerificationEmail = async (options: {
  email: string;
  firstName: string;
  lastName: string;
  code: string;
}) => {
  const { email, firstName, lastName, code } = options;

  const companyName = "To-Do App";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #1e293b;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #2b6cb0 0%, #4f87c2 50%, #7fb2e5 100%);
            padding: 32px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.025em;
          }
          .header p {
            color: rgba(255,255,255,0.8);
            margin: 8px 0 0 0;
            font-size: 14px;
          }
          .content {
            padding: 40px;
          }
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #0f172a;
          }
          .message {
            line-height: 1.6;
            margin-bottom: 32px;
            color: #475569;
          }
          .code-card {
            background: linear-gradient(135deg, #2b6cb0 0%, #4f87c2 100%);
            border-radius: 12px;
            padding: 32px;
            text-align: center;
            margin-bottom: 32px;
          }
          .code-label {
            color: rgba(255,255,255,0.8);
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
          }
          .code {
            color: #ffffff;
            font-size: 40px;
            font-weight: 700;
            letter-spacing: 0.3em;
          }
          .code-expiry {
            color: rgba(255,255,255,0.7);
            font-size: 12px;
            margin-top: 12px;
          }
          .warning {
            background-color: #fff7ed;
            border-left: 4px solid #f97316;
            border-radius: 8px;
            padding: 16px;
            font-size: 14px;
            color: #7c2d12;
            margin-bottom: 24px;
          }
          .footer {
            padding: 24px 32px;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
            background-color: #f8fafc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 To-Do App</h1>
            <p>Email Verification</p>
          </div>
          <div class="content">
            <div class="greeting">Hello, ${firstName} ${lastName}!</div>
            <p class="message">
              Thank you for registering. Please use the verification code below to verify your email address and activate your account.
            </p>

            <div class="code-card">
              <div class="code-label">Your Verification Code</div>
              <div class="code">${code}</div>
              <div class="code-expiry">This code expires in 10 minutes</div>
            </div>

            <div class="warning">
              ⚠️ If you did not create an account, please ignore this email. Do not share this code with anyone.
            </div>

            <p class="message">
              If you have any questions, feel free to reach out to our support team.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.<br/>
            This is an automated message, please do not reply.
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: `Verify your email - ${companyName}`,
    text: `Hello ${firstName} ${lastName},\n\nYour verification code is: ${code}\n\nThis code expires in 10 minutes.\n\nIf you did not create an account, please ignore this email.`,
    html: htmlContent,
  });
};

export const sendResetPasswordEmail = async (options: {
  email: string;
  firstName: string;
  lastName: string;
  code: string;
}) => {
  const { email, firstName, lastName, code } = options;
  const companyName = "To-Do App";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #1e293b;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #2b6cb0 0%, #4f87c2 50%, #7fb2e5 100%);
            padding: 32px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.025em;
          }
          .header p {
            color: rgba(255,255,255,0.8);
            margin: 8px 0 0 0;
            font-size: 14px;
          }
          .content {
            padding: 40px;
          }
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #0f172a;
          }
          .message {
            line-height: 1.6;
            margin-bottom: 32px;
            color: #475569;
          }
          .code-card {
            background: linear-gradient(135deg, #2b6cb0 0%, #4f87c2 100%);
            border-radius: 12px;
            padding: 32px;
            text-align: center;
            margin-bottom: 32px;
          }
          .code-label {
            color: rgba(255,255,255,0.8);
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
          }
          .code {
            color: #ffffff;
            font-size: 40px;
            font-weight: 700;
            letter-spacing: 0.3em;
          }
          .code-expiry {
            color: rgba(255,255,255,0.7);
            font-size: 12px;
            margin-top: 12px;
          }
          .warning {
            background-color: #fff7ed;
            border-left: 4px solid #f97316;
            border-radius: 8px;
            padding: 16px;
            font-size: 14px;
            color: #7c2d12;
            margin-bottom: 24px;
          }
          .footer {
            padding: 24px 32px;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
            background-color: #f8fafc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 To-Do App</h1>
            <p>Password Reset</p>
          </div>
          <div class="content">
            <div class="greeting">Hello, ${firstName} ${lastName}!</div>
            <p class="message">
              We received a request to reset your password. Use the code below to proceed. If you did not request this, you can safely ignore this email.
            </p>

            <div class="code-card">
              <div class="code-label">Your Reset Code</div>
              <div class="code">${code}</div>
              <div class="code-expiry">This code expires in 10 minutes</div>
            </div>

            <div class="warning">
              ⚠️ If you did not request a password reset, please ignore this email. Your password will remain unchanged.
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.<br/>
            This is an automated message, please do not reply.
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: `Password Reset Code - ${companyName}`,
    text: `Hello ${firstName} ${lastName},\n\nYour password reset code is: ${code}\n\nThis code expires in 10 minutes.\n\nIf you did not request a password reset, please ignore this email.`,
    html: htmlContent,
  });
};
