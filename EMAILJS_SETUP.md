# EmailJS Setup Guide for BookingModal and ContactSection

This guide will help you configure EmailJS to send booking requests and contact messages directly to your Gmail address without requiring an email client.

## What is EmailJS?

EmailJS allows you to send emails directly from your frontend application without needing a backend server. It's perfect for contact forms and booking requests.

## EmailJS Configuration Used

Both the BookingModal and ContactSection components use the same EmailJS configuration:

- **Service ID**: `service_gmx0l6n`
- **Template ID**: `template_oqt7v55`
- **Public Key**: `ZUW_svgen2b3a2GG2`
- **Recipient Email**: `gidzdaquan@gmail.com`

## Setup Steps

### 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails per month)
3. Verify your email address

### 2. Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the instructions to connect your email account
5. **Save the Service ID** (e.g., `service_abc123`)

### 3. Create a Unified Email Template

Since you're limited to one template, use this unified template that handles both bookings and contact messages:

1. Go to **Email Templates**
2. Click **Create New Template** (or edit your existing template)
3. Use this template content:

```
Subject: {{subject}}

{{#if_equals property_price "Contact Form"}}

🌟 NEW CONTACT FORM MESSAGE 🌟

👤 SENDER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━
📛 Name: {{guest_name}}
📧 Email: {{guest_email}}

💬 MESSAGE CONTENT:
━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━
📨 Reply To: {{guest_email}}

Please respond to this inquiry.
{{else}}

📋 NEW BOOKING REQUEST DETAILS:

Property Information:
- Name: {{property_name}}
- Location: {{property_location}}
- Price: {{property_price}}

Guest Information:
- Name: {{guest_name}}
- Email: {{guest_email}}
- Phone: {{guest_phone}}

Booking Details:
- Check-in: {{check_in}}
- Check-out: {{check_out}}
- Guests: {{guests}}

Please contact the guest to confirm this booking request.
{{/if_equals}}

Best regards,
AzulHomes System
```

**Alternative Universal Template** (works with any EmailJS account):

```
Subject: {{subject}}

🌟 AZULHOMES FORM SUBMISSION 🌟

📋 MESSAGE TYPE: {{property_price}}

👤 SENDER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━
📛 Name: {{guest_name}}
📧 Email: {{guest_email}}
📱 Phone: {{guest_phone}}

📍 PROPERTY INFO:
━━━━━━━━━━━━━━━━━━━━━━━━━
🏠 Property: {{property_name}}
📍 Location: {{property_location}}
💰 Type: {{property_price}}

📅 BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Check-in: {{check_in}}
📅 Check-out: {{check_out}}
👥 Guests: {{guests}}

💬 MESSAGE CONTENT:
━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━
📨 Reply To: {{guest_email}}

Best regards,
AzulHomes System
```

4. **Save the Template** (same template ID for both booking and contact)

### 4. Get Your Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_def456`)

### 5. Update the BookingModal Component

1. Open `azulhomes/components/BookingModal.tsx`
2. Replace the placeholder values in the `handleSubmit` function:

```typescript
// Replace these with your actual EmailJS credentials
const serviceId = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with your Service ID
const templateId = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with your Template ID
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your Public Key
```

**Example:**
```typescript
const serviceId = 'service_abc123';
const templateId = 'template_xyz789';
const publicKey = 'user_def456';
```

### 6. Update the Recipient Email (Optional)

1. In the `templateParams` object, you can change the `to_email` field:
```typescript
to_email: 'your-email@gmail.com', // Replace with your preferred email
```

## Testing Both Forms

### Testing the Booking Form
1. Start your development server: `npm run dev`
2. Open your website in a browser
3. Navigate to any shortlet listing
4. Click "Book Now" to open the booking modal
5. Fill out all required booking information
6. Submit the form
7. Check your email for the booking request

### Testing the Contact Form
1. Navigate to the contact section on your website
2. Fill out the contact form with:
   - Your name
   - Your email address
   - A test message
3. Click "Send Message"
4. Check your email for the contact message

### Expected Results
- Both forms should show loading states while submitting
- Success messages should appear after successful submission
- Error messages should appear if there's an issue
- Check your Gmail inbox for messages from both forms

## Troubleshooting

- **Emails not sending**: Check your EmailJS service connection and template
- **Rate limiting**: Free accounts have a 200 email/month limit
- **CORS issues**: EmailJS handles CORS automatically
- **Template variables**: Ensure all template variables match exactly

## Security Notes

- EmailJS is safe for contact forms but not for sensitive data
- Consider rate limiting on the frontend for production use
- Monitor your email usage in the EmailJS dashboard

## Support

If you encounter issues:
1. Check the EmailJS documentation: https://www.emailjs.com/docs/
2. Review the browser console for error messages
3. Verify your service and template configuration

## Cost

- **Free Plan**: 200 emails/month
- **Personal Plan**: $15/month for 1,000 emails
- **Professional Plan**: $29/month for 10,000 emails

Choose the plan that fits your expected booking volume.