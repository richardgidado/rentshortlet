# Unified EmailJS Template for Both Booking and Contact

## Problem Solved
You're limited to one EmailJS template, so I've modified the contact form to use the same variables as your booking system, allowing both forms to share the same template.

## How It Works

### Booking Forms
Booking forms send these variables:
- `property_name`: The property name
- `property_location`: Property location
- `property_price`: Price per night
- `guest_name`: Customer name
- `guest_email`: Customer email
- `guest_phone`: Customer phone
- `check_in`: Check-in date
- `check_out`: Check-out date
- `guests`: Number of guests

### Contact Forms
Contact forms now send compatible variables:
- `property_name`: "Contact Message from [Name]"
- `property_location`: "General Inquiry"
- `property_price`: "Contact Form"
- `guest_name`: Sender's name
- `guest_email`: Sender's email
- `guest_phone`: "Not provided"
- `check_in`: "N/A"
- `check_out`: "N/A"
- `guests`: 1
- `message`: The contact message content

## Updated EmailJS Template

Replace your current template with this universal version:

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

## What You'll See

### For Booking Requests:
- **Message Type**: Shows the actual price (e.g., "$150/night")
- **Property Info**: Shows actual property details
- **Booking Details**: Shows actual dates and guest count
- **Message Content**: Will be empty for bookings

### For Contact Messages:
- **Message Type**: Shows "Contact Form"
- **Property Info**: Shows "General Inquiry" and contact details
- **Booking Details**: Shows "N/A" for dates and "1" for guests
- **Message Content**: Shows the actual contact message

## Benefits of This Approach

✅ **Single Template**: One EmailJS template handles both forms
✅ **No Conflicts**: Variables are mapped to work with existing booking template
✅ **Clear Distinction**: Easy to identify booking vs contact in Gmail
✅ **Cost Effective**: Uses your existing EmailJS plan efficiently
✅ **Maintainable**: Single template to update for both form types

## Testing

1. Submit a **booking request** - you should see property details and booking information
2. Submit a **contact message** - you should see "Contact Form" as type and the message content
3. Both should arrive at the same Gmail address (gidzdaquan@gmail.com)

The unified template makes it easy to distinguish between booking requests and general inquiries while using just one EmailJS template.