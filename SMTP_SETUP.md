# SMTP Email Setup Guide

This guide explains how to set up Google SMTP for sending email notifications when business users send messages to customers.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# SMTP Configuration (Google Gmail)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Application URL (for email links)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production, use: https://yourdomain.com
```

## Setting up Google SMTP

### Step 1: Enable 2-Step Verification
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to [Google Account App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Select "Other (Custom name)" as the device
4. Enter "Leenk SMTP" as the name
5. Click "Generate"
6. Copy the 16-character password (this is your `SMTP_PASSWORD`)

### Step 3: Configure Environment Variables
1. Set `SMTP_USER` to your Gmail address (e.g., `your-email@gmail.com`)
2. Set `SMTP_PASSWORD` to the app password you generated
3. Set `NEXT_PUBLIC_BASE_URL` to your application URL

## How It Works

When a business user sends a message:
1. The message is saved to the database
2. An API call is made to `/api/send-email`
3. An email is sent to the customer with:
   - The message content
   - A button to open the chat
   - A link back to the conversation

## Email Template

The email includes:
- Business name in the header
- Message content in a styled box
- A prominent "Open Chat" button
- Direct link to the chat page

## Testing

To test the email functionality:
1. Ensure all environment variables are set
2. Send a message as a business user
3. Check the customer's email inbox
4. Click the "Open Chat" button to verify the link works

## Troubleshooting

### Email not sending
- Verify `SMTP_USER` and `SMTP_PASSWORD` are correct
- Check that 2-Step Verification is enabled
- Ensure you're using an App Password, not your regular password
- Check server logs for error messages

### Email link not working
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly
- Ensure the URL matches your deployed domain
- Check that the business phone number is correct in the database

