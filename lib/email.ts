import nodemailer from "nodemailer"

// Create transporter for Google SMTP
export function createEmailTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, // Your Gmail address
      pass: process.env.SMTP_PASSWORD, // Your Gmail App Password
    },
  })
}

// Send email notification when business sends a message
export async function sendMessageNotificationEmail(
  customerEmail: string,
  customerName: string | undefined,
  businessName: string,
  messageText: string | undefined,
  chatUrl: string
): Promise<void> {
  const transporter = createEmailTransporter()

  const customerDisplayName = customerName || customerEmail.split("@")[0]

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message from ${businessName}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Message from ${businessName}</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin-bottom: 20px;">Hi ${customerDisplayName},</p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            You have a new message from <strong>${businessName}</strong>:
          </p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <p style="margin: 0; font-size: 16px; color: #333;">
              ${messageText || "📷 [Image attachment]"}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${chatUrl}" 
               style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Open Chat
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center;">
            Click the button above to view and reply to this message.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="font-size: 12px; color: #999; margin: 0;">
            This is an automated notification from Leenk. Please do not reply to this email.
          </p>
        </div>
      </body>
    </html>
  `

  const textContent = `
New Message from ${businessName}

Hi ${customerDisplayName},

You have a new message from ${businessName}:

${messageText || "[Image attachment]"}

Open the chat to view and reply: ${chatUrl}

---
This is an automated notification from Leenk. Please do not reply to this email.
  `

  await transporter.sendMail({
    from: `"${businessName}" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `New message from ${businessName}`,
    text: textContent,
    html: htmlContent,
  })
}

// Send email notification when business receives a message from a customer
export async function sendBusinessNotificationEmail(
  businessEmail: string,
  businessName: string,
  customerName: string | undefined,
  customerPhone: string,
  messageText: string | undefined,
  dashboardUrl: string
): Promise<void> {
  const transporter = createEmailTransporter()

  const customerDisplayName = customerName || customerPhone

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message from ${customerDisplayName}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Message from ${customerDisplayName}</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin-bottom: 20px;">Hi ${businessName},</p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            You have received a new message from <strong>${customerDisplayName}</strong>:
          </p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <p style="margin: 0; font-size: 16px; color: #333;">
              ${messageText || "📷 [Image attachment]"}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardUrl}" 
               style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Open Dashboard
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center;">
            Click the button above to view and reply to this message.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="font-size: 12px; color: #999; margin: 0;">
            This is an automated notification from Leenk. Please do not reply to this email.
          </p>
        </div>
      </body>
    </html>
  `

  const textContent = `
New Message from ${customerDisplayName}

Hi ${businessName},

You have received a new message from ${customerDisplayName}:

${messageText || "[Image attachment]"}

Open the dashboard to view and reply: ${dashboardUrl}

---
This is an automated notification from Leenk. Please do not reply to this email.
  `

  await transporter.sendMail({
    from: `"Leenk" <${process.env.SMTP_USER}>`,
    to: businessEmail,
    subject: `New message from ${customerDisplayName}`,
    text: textContent,
    html: htmlContent,
  })
}

