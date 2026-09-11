# Firebase Quick Start Guide - Secufy Website

Your Firebase project is already configured! Here's what you need to do to get forms working.

## Your Firebase Project Details
- **Project ID:** secufy-50bba
- **Project Name:** Secufy
- **Status:** ✅ Already configured in the code

## Quick Setup Steps

### 1. Enable Firestore Database (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **secufy-50bba**
3. Click **Firestore Database** in the left menu
4. Click **Create database**
5. Choose **Start in production mode**
6. Select location: **europe-west3** (Frankfurt) - closest to Netherlands
7. Click **Enable**

### 2. Set Firestore Security Rules

After database is created, go to **Rules** tab and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to form collections (read-only for security)
    match /quotations/{document=**} {
      allow write: if true;
      allow read: if false;
    }
    match /complaints/{document=**} {
      allow write: if true;
      allow read: if false;
    }
  }
}
```

Click **Publish**

### 3. Install Firebase CLI (One-time setup)

```bash
npm install -g firebase-tools
```

### 4. Login to Firebase

```bash
firebase login
```

### 5. Initialize Cloud Functions

```bash
cd c:/Users/moh_b/CascadeProjects/windsurf-project-8
firebase init functions
```

**Select these options:**
- Use existing project: **secufy-50bba**
- Language: **JavaScript**
- ESLint: **Yes** (optional)
- Install dependencies: **Yes**

### 6. Install Email Dependencies

```bash
cd functions
npm install nodemailer cors
cd ..
```

### 7. Configure SMTP Settings

```bash
firebase functions:config:set smtp.host="smtp.hostnet.nl" smtp.port="587" smtp.user="vraagje@secufy.nl" smtp.pass="SECUFY.sfenza.2023"
```

### 8. Deploy Cloud Functions

```bash
firebase deploy --only functions
```

This will deploy:
- `sendEmail` - HTTP function for sending emails
- `onQuotationCreated` - Auto-trigger when quotation submitted
- `onComplaintCreated` - Auto-trigger when complaint submitted

### 9. Test Your Forms

1. Start a local server:
   ```bash
   python -m http.server 8000
   ```
   Or any other static file server

2. Open: `http://localhost:8000`

3. Fill out the quotation form or complaints form

4. Check:
   - Firebase Console > Firestore Database - you should see the data
   - Your email (vraagje@secufy.nl) - you should receive an email

## What Happens When Forms Are Submitted?

1. **User fills out form** → Data is validated
2. **Data saved to Firestore** → Stored in `quotations` or `complaints` collection
3. **Cloud Function triggered** → Automatically sends email to vraagje@secufy.nl
4. **Email sent via SMTP** → Using your Hostnet.nl credentials
5. **User sees success message** → Form is reset

## Viewing Form Submissions

### In Firebase Console:
1. Go to **Firestore Database**
2. Click on `quotations` or `complaints` collection
3. See all submissions with timestamps

### Each submission includes:
- All form fields
- `timestamp` - When submitted
- `status` - 'new' by default
- Unique document ID

## Email Templates

All emails are sent with:
- **From:** Secufy Website <vraagje@secufy.nl>
- **To:** vraagje@secufy.nl
- **Reply-To:** Customer's email
- **Format:** Professional HTML with Secufy branding (blue/yellow)

## Costs

**Firebase Free Tier (Spark Plan):**
- ✅ Firestore: 50K reads/day, 20K writes/day
- ✅ Cloud Functions: 125K invocations/month
- ✅ **Cost: FREE** for typical business website traffic

## Troubleshooting

### Forms not submitting?
- Check browser console for errors
- Verify Firestore rules are published
- Check Firebase SDK is loaded (look for firebase in console)

### Emails not arriving?
- Verify Cloud Functions are deployed: `firebase functions:list`
- Check function logs: `firebase functions:log`
- Verify SMTP credentials are correct

### "Permission denied" error?
- Check Firestore security rules
- Make sure rules allow `write: if true` for your collections

## Support

If you need help:
1. Check Firebase Console > Functions > Logs
2. Check browser console for JavaScript errors
3. Verify all steps above are completed

## Next Steps (Optional)

- Add reCAPTCHA for spam protection
- Create admin dashboard to view submissions
- Set up email notifications for team members
- Add automatic follow-up emails
