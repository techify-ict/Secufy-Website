// Firebase Form Handlers for Secufy Website

console.log('Firebase Forms JS loaded');
console.log('Firebase available:', typeof firebase !== 'undefined');
console.log('Firestore available:', typeof db !== 'undefined');

// Quotation Form Handler
const quotationForm = document.getElementById('quotationForm');
console.log('Quotation form found:', quotationForm !== null);

if (quotationForm) {
    console.log('Attaching submit handler to quotation form');
    quotationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submitted!');
        
        // Get form data safely
        const getFieldValue = (selector) => {
            const element = this.querySelector(selector);
            return element ? element.value : '';
        };
        
        const formData = {
            company: getFieldValue('input[name="company"]'),
            name: getFieldValue('input[name="name"]'),
            email: getFieldValue('input[name="email"]'),
            phone: getFieldValue('input[name="phone"]'),
            address: getFieldValue('input[name="address"]'),
            postcode: getFieldValue('input[name="postcode"]'),
            city: getFieldValue('input[name="city"]'),
            service_type: getFieldValue('select[name="service_type"]'),
            description: getFieldValue('textarea[name="description"]'),
            start_date: getFieldValue('input[name="start_date"]'),
            duration: getFieldValue('select[name="duration"]'),
            guards_needed: getFieldValue('input[name="guards_needed"]'),
            budget: getFieldValue('select[name="budget"]'),
            special_requirements: getFieldValue('textarea[name="special_requirements"]')
        };
        
        console.log('Form data collected:', formData);
        
        // Validate privacy checkbox
        const privacyChecked = this.querySelector('input[name="privacy"]').checked;
        if (!privacyChecked) {
            showNotification('U moet akkoord gaan met de privacyverklaring.', 'error');
            return;
        }
        
        // Submit form
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Versturen...';
        submitBtn.disabled = true;
        
        try {
            console.log('Submitting to Firebase:', formData);
            
            // Save to Firestore
            const result = await submitFormToFirebase(formData, 'quotations');
            console.log('Firebase result:', result);
            
            if (result.success) {
                console.log('Form submitted successfully!');
                showNotification(`Bedankt ${formData.name}! Uw offerte aanvraag is succesvol verzonden. We nemen binnen 24 uur contact met u op.`, 'success');
                this.reset();
                // Reset to step 1
                if (typeof currentStep !== 'undefined') {
                    currentStep = 1;
                    showStep(1);
                }
            } else {
                console.error('Form submission failed:', result.error);
                showNotification('Er is een fout opgetreden. Probeer het later opnieuw.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification('Er is een fout opgetreden. Probeer het later opnieuw.', 'error');
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Klachten Form Handler
const klachtenForm = document.getElementById('klachtenForm');
console.log('Klachten form found:', klachtenForm !== null);

if (klachtenForm) {
    console.log('Attaching submit handler to klachten form');
    klachtenForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Klachten form submitted!');
        
        // Get form data safely
        const getFieldValue = (selector) => {
            const element = this.querySelector(selector);
            return element ? element.value : '';
        };
        
        const formData = {
            naam: getFieldValue('input[name="naam"]'),
            email: getFieldValue('input[name="email"]'),
            telefoon: getFieldValue('input[name="telefoon"]'),
            klantnummer: getFieldValue('input[name="klantnummer"]'),
            type: getFieldValue('select[name="type"]'),
            onderwerp: getFieldValue('input[name="onderwerp"]'),
            bericht: getFieldValue('textarea[name="bericht"]'),
            gewenste_oplossing: getFieldValue('textarea[name="gewenste_oplossing"]')
        };
        
        console.log('Klachten form data collected:', formData);
        
        // Validate privacy checkbox
        const privacyChecked = this.querySelector('input[name="privacy"]').checked;
        if (!privacyChecked) {
            showNotification('U moet akkoord gaan met de privacyverklaring.', 'error');
            return;
        }
        
        // Submit form
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Versturen...';
        submitBtn.disabled = true;
        
        try {
            console.log('Submitting klachten to Firebase:', formData);
            
            // Save to Firestore
            const result = await submitFormToFirebase(formData, 'complaints');
            console.log('Firebase result:', result);
            
            if (result.success) {
                console.log('Klachten submitted successfully!');
                showNotification('Bedankt voor uw melding. Wij hebben uw bericht ontvangen en nemen binnen 24 uur contact met u op.', 'success');
                this.reset();
            } else {
                console.error('Klachten submission failed:', result.error);
                showNotification('Er is een fout opgetreden. Probeer het later opnieuw.', 'error');
            }
        } catch (error) {
            console.error('Error submitting klachten:', error);
            showNotification('Er is een fout opgetreden. Probeer het later opnieuw.', 'error');
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Notification System (if not already defined)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
}
