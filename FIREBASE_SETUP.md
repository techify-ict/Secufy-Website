# Firebase Setup Guide for Secufy Website

This guide will help you set up Firebase to handle form submissions and email notifications for the Secufy website.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `secufy-website`
4. Follow the setup wizard (you can disable Google Analytics if not needed)

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web** icon (`</>`)
2. Register app with nickname: `Secufy Website`
3. Copy the Firebase configuration object
4. Replace the values in `firebase-config.js` with your actual credentials

## Step 3: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode** (we'll set up rules later)
4. Choose a location close to your users (e.g., `europe-west1`)

### Firestore Security Rules

After creating the database, update the rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to form collections
    match /quotations/{document=**} {
      allow write: if true;
      allow read: if false;
    }
    match /complaints/{document=**} {
      allow write: if true;
      allow read: if false;
    }
    match /contacts/{document=**} {
      allow write: if true;
      allow read: if false;
    }
  }
}
```

## Step 4: Set Up Firebase Cloud Functions (for Email)

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Login to Firebase

```bash
firebase login
```

### Initialize Cloud Functions

```bash
cd c:/Users/moh_b/CascadeProjects/windsurf-project-8
firebase init functions
```

Select:
- Use existing project: `secufy-website`
- Language: JavaScript
- ESLint: Yes (optional)
- Install dependencies: Yes

### Configure Email Service

1. Install Nodemailer in functions folder:
```bash
cd functions
npm install nodemailer
```

2. Set environment variables for SMTP:
```bash
firebase functions:config:set smtp.host="smtp.hostnet.nl" smtp.port="587" smtp.user="vraagje@secufy.nl" smtp.pass="SECUFY.sfenza.2023"
```

## Step 5: Add Firebase SDK to Your Website

Add these scripts to your HTML files (before closing `</body>` tag):

```html
<!-- Firebase App (the core Firebase SDK) -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

<!-- Your Firebase configuration -->
<script src="firebase-config.js"></script>
```

## Step 6: Deploy Cloud Functions

After setting up the functions (see `functions/index.js`), deploy:

```bash
firebase deploy --only functions
```

## Step 7: Update Your Firebase Config

After deployment, update `firebase-config.js` with your Cloud Function URL.

## Collections Structure

### Quotations Collection
- company (string)
- name (string)
- email (string)
- phone (string)
- address (string)
- postcode (string)
- city (string)
- service_type (string)
- description (string)
- start_date (string)
- duration (string)
- guards_needed (string)
- budget (string)
- special_requirements (string)
- timestamp (timestamp)
- status (string: 'new', 'contacted', 'completed')

### Complaints Collection
- naam (string)
- email (string)
- telefoon (string)
- klantnummer (string)
- type (string)
- onderwerp (string)
- bericht (string)
- gewenste_oplossing (string)
- timestamp (timestamp)
- status (string: 'new', 'in_progress', 'resolved')

## Testing

1. Open your website: `http://localhost:8000`
2. Fill out a form
3. Check Firebase Console > Firestore Database to see the submission
4. Check your email (vraagje@secufy.nl) for the notification

## Troubleshooting

- **CORS errors**: Make sure your Cloud Function has CORS enabled
- **Permission denied**: Check Firestore security rules
- **Email not sending**: Verify SMTP credentials in Firebase config
- **Form not submitting**: Check browser console for errors

## Cost Considerations

Firebase Free Tier (Spark Plan) includes:
- Firestore: 1GB storage, 50K reads/day, 20K writes/day
- Cloud Functions: 125K invocations/month, 40K GB-seconds/month

This should be more than enough for a business website with moderate traffic.

## Next Steps

1. Set up email templates in Cloud Functions
2. Add admin panel to view submissions
3. Set up email notifications for new submissions
4. Add spam protection (reCAPTCHA)
