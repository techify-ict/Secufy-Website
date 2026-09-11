// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVXChcTYU9JV6wYQDu1iXHggl56B0SfAA",
    authDomain: "secufy-50bba.firebaseapp.com",
    projectId: "secufy-50bba",
    storageBucket: "secufy-50bba.appspot.com",
    messagingSenderId: "873623578558",
    appId: "1:873623578558:web:fc087725041d1965b7bbef",
    measurementId: "G-BZ2E091SBH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Analytics (optional)
const analytics = firebase.analytics();

// Form submission handler
async function submitFormToFirebase(formData, formType) {
    try {
        // Add timestamp
        formData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
        formData.status = 'new';
        
        // Save to Firestore
        const docRef = await db.collection(formType).add(formData);
        
        console.log('Form submitted with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error: error.message };
    }
}

// Email notification function (to be used with Firebase Cloud Functions)
async function sendEmailNotification(formData, formType) {
    try {
        const response = await fetch('https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formType: formType,
                data: formData
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}
