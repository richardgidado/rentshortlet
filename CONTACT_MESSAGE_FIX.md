# Contact Message Display Fix

## Problem Identified
You're not seeing the contact message content in Gmail because the EmailJS template is looking for `{{message}}` but the contact form is sending the message content through the `{{guest_phone}}` variable.

## Solution: Update Your EmailJS Template

Replace your current template with this updated version:

```
Subject: {{subject}}

🌟 AZULHOMES FORM SUBMISSION 🌟

📋 MESSAGE TYPE: {{property_price}}

👤 SENDER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━
📛 Name: {{guest_name}}
📧 Email: {{guest_email}}
📱 Message: {{guest_phone}}

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

━━━━━━━━━━━━━━━━━━━━━━━━━
📨 Reply To: {{guest_email}}

Best regards,
AzulHomes System
```

## Key Change
**Before:** The template showed `📱 Phone: {{guest_phone}}`
**After:** The template shows `📱 Message: {{guest_phone}}`

## How It Works Now

### For Booking Requests:
- `guest_phone` contains the actual phone number
- Shows as "Phone: [phone number]"

### For Contact Messages:
- `guest_phone` contains the contact message text
- Shows as "Message: [the actual message content]"

## What You'll See

**Contact Form Submissions will now show:**
- ✅ Sender's name: `{{guest_name}}`
- ✅ Sender's email: `{{guest_email}}`
- ✅ **Contact Message**: `{{guest_phone}}` (now contains the message!)
- ✅ Clear indication it's a "Contact Form" submission

The contact message content will now appear in the "Message" field instead of being lost.