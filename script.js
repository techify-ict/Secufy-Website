// Sector Data
const sectorData = {
    'zakelijke-dienstverlening': {
        title: 'Zakelijke Dienstverlening',
        icon: 'fas fa-briefcase',
        description: 'Voor zakelijke dienstverleners is een veilige en professionele omgeving essentieel. Wij begrijpen de unieke uitdagingen van kantooromgevingen, van toegangscontrole tot het beschermen van vertrouwelijke informatie. Onze beveiligingsoplossingen zorgen ervoor dat uw medewerkers en klanten zich veilig voelen, terwijl uw bedrijfsactiviteiten ongestoord kunnen doorgaan.',
        features: [
            'Professionele receptie en toegangscontrole voor kantoorgebouwen',
            '24/7 camera monitoring en bewaking',
            'Beveiliging van datacenters en serverruimtes',
            'Evenementbeveiliging voor zakelijke bijeenkomsten',
            'Mobiele surveillance en patrouilles',
            'Noodrespons en evacuatieprocedures'
        ]
    },
    'onderwijs': {
        title: 'Onderwijs',
        icon: 'fas fa-graduation-cap',
        description: 'Scholen, universiteiten en onderwijsinstellingen verdienen een veilige leeromgeving. Wij bieden beveiligingsoplossingen die zowel studenten als personeel beschermen, zonder de open en toegankelijke sfeer van onderwijs te verstoren. Van basisscholen tot hoger onderwijs, wij zorgen voor een veilige leeromgeving.',
        features: [
            'Toegangscontrole en registratiesystemen',
            'Camera surveillance op strategische locaties',
            'Beveiliging tijdens schooltijden en evenementen',
            'Anti-pestprotocollen en veiligheidsmonitoring',
            'Noodknopsystemen en snelle respons',
            'Samenwerking met schoolleiding voor veiligheidsbeleid'
        ]
    },
    'hospitality': {
        title: 'Hospitality & Leisure',
        icon: 'fas fa-hotel',
        description: 'In de hospitality sector draait alles om gastbeleving. Onze beveiligingsoplossingen combineren veiligheid met gastvrijheid. Voor hotels, restaurants, theaters en recreatiefaciliteiten bieden wij discrete maar effectieve beveiliging die de ervaring van uw gasten verrijkt in plaats van verstoort.',
        features: [
            'Gastgerichte receptie en toegangsbeheer',
            'Discrete beveiliging voor VIP-gasten',
            'Evenementbeveiliging en crowd management',
            'Parkeerbeveiliging en valet services',
            'Nachtelijke surveillance en veiligheidsrondes',
            'Verloren en gevonden beheer'
        ]
    },
    'retail': {
        title: 'Retail',
        icon: 'fas fa-shopping-cart',
        description: 'Retail vraagt om een unieke beveiligingsaanpak. Winkeldiefstal, fraude en veiligheid van personeel en klanten vereisen gespecialiseerde oplossingen. Wij bieden retail security die zowel preventief als reactief werkt, met focus op het beschermen van uw omzet en het creëren van een veilige winkelervaring.',
        features: [
            'Winkelbeveiliging en diefstalpreventie',
            'RFID en EAS-systemen (Electronic Article Surveillance)',
            'Camera monitoring met gezichtsherkenning',
            'Mystery shopping en veiligheidsaudits',
            'Kassabeveiliging en geldtransport',
            'Crowd control tijdens uitverkoop en events'
        ]
    },
    'industrie': {
        title: 'Industrie & Haven',
        icon: 'fas fa-industry',
        description: 'Industriële complexen en havens vereisen robuuste beveiligingsoplossingen. Van toegangscontrole tot het bewaken van gevaarlijke stoffen, wij begrijpen de complexiteit van industriële beveiliging. Onze oplossingen zijn ontworpen voor 24/7 operaties in uitdagende omgevingen.',
        features: [
            'Perimeterbewaking en toegangscontrole',
            'Beveiliging van gevaarlijke stoffen en installaties',
            'Havenbeveiliging en ladingcontrole',
            'Industriële brandbeveiliging',
            'Drone surveillance voor grote terreinen',
            'Samenwerking met veiligheidsregio en douane'
        ]
    },
    'publieke-sector': {
        title: 'Publieke Sector',
        icon: 'fas fa-landmark',
        description: 'Overheidsgebouwen, gemeentehuizen en publieke instellingen hebben specifieke beveiligingseisen. Wij bieden oplossingen die voldoen aan overheidsstandaarden en zorgen voor de veiligheid van ambtenaren en burgers. Onze beveiligers zijn getraind in omgang met het publiek en crisissituaties.',
        features: [
            'Beveiliging van overheidsgebouwen',
            'Toegangscontrole met hoge veiligheidseisen',
            'Evenementbeveiliging voor publieke bijeenkomsten',
            'VIP-bescherming voor politici en ambtenaren',
            'Crisismanagement en evacuatieprocedures',
            'Samenwerking met politie en veiligheidsdiensten'
        ]
    },
    'zorg': {
        title: 'Zorg',
        icon: 'fas fa-heartbeat',
        description: 'Zorginstellingen vereisen een empathische maar effectieve beveiligingsaanpak. Van ziekenhuizen tot verpleeghuizen, wij zorgen voor de veiligheid van patiënten, bezoekers en zorgpersoneel. Onze beveiligers zijn speciaal getraind in omgang met kwetsbare personen en medische noodsituaties.',
        features: [
            'Ziekenhuisbeveiliging en toegangsbeheer',
            'Bescherming van medicijnen en medische apparatuur',
            'Agressiebeheersing en de-escalatie',
            'Beveiliging van psychiatrische afdelingen',
            'Nachtelijke surveillance en rondes',
            'Samenwerking met medisch personeel'
        ]
    },
    'logistiek': {
        title: 'Logistiek',
        icon: 'fas fa-truck',
        description: 'Logistieke centra en distributiecentra zijn 24/7 in bedrijf en vereisen continue beveiliging. Van goederencontrole tot personeelsbeveiliging, wij bieden oplossingen die uw supply chain beschermen. Onze systemen integreren naadloos met uw logistieke processen.',
        features: [
            'Toegangscontrole voor chauffeurs en bezoekers',
            'Bewaking van laad- en losplaatsen',
            'Voorraadbeveiliging en diefstalpreventie',
            'Camera monitoring van magazijnen',
            'Beveiliging van waardevolle goederen',
            'Integratie met warehouse management systemen'
        ]
    },
    'luchtvaart': {
        title: 'Luchtvaart',
        icon: 'fas fa-plane',
        description: 'Luchtvaartbeveiliging vereist de hoogste standaarden en certificeringen. Wij bieden beveiligingsoplossingen voor luchthavens, cargo en luchtvaartmaatschappijen die voldoen aan alle internationale regelgeving. Onze beveiligers zijn gecertificeerd volgens luchtvaartstandaarden.',
        features: [
            'Passagiersscreening en bagagecontrole',
            'Cargo beveiliging en vrachtcontrole',
            'Perimeterbewaking van luchthaventerreinen',
            'Toegangscontrole voor beveiligde zones',
            'Samenwerking met Koninklijke Marechaussee',
            'Compliance met ICAO en EASA regelgeving'
        ]
    },
    'vitale-infrastructuur': {
        title: 'Vitale Infrastructuur',
        icon: 'fas fa-bolt',
        description: 'Vitale infrastructuur zoals energiecentrales, waterzuiveringsinstallaties en telecom-faciliteiten vereisen maximale beveiliging. Wij bieden oplossingen die kritieke infrastructuur beschermen tegen sabotage, terrorisme en ongeautoriseerde toegang. Onze beveiligers hebben speciale clearance en training.',
        features: [
            'Hoogwaardige perimeterbewaking',
            'Biometrische toegangscontrole',
            'Cybersecurity integratie',
            'Anti-drone systemen',
            'Crisismanagement en business continuity',
            'Samenwerking met NCTV en veiligheidsregio'
        ]
    }
};

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            span.style.transform = '';
            span.style.opacity = '';
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const isMobile = window.innerWidth <= 768;
            target.scrollIntoView({
                behavior: isMobile ? 'auto' : 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.industry-card, .stat, .contact-item, .why-item');
    animateElements.forEach(el => observer.observe(el));
});

// Interactive Service Selector
const serviceMenuItems = document.querySelectorAll('.service-menu-item');
const serviceContents = document.querySelectorAll('.service-content');

serviceMenuItems.forEach(item => {
    item.addEventListener('click', function() {
        const serviceId = this.getAttribute('data-service');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile accordion behavior
            const wasActive = this.classList.contains('active');
            
            // Close all items
            serviceMenuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            serviceContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Toggle current item
            if (!wasActive) {
                this.classList.add('active');
                const selectedContent = document.querySelector(`.service-content[data-service="${serviceId}"]`);
                if (selectedContent) {
                    selectedContent.classList.add('active');
                }
            }
        } else {
            // Desktop side-by-side behavior
            serviceMenuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            this.classList.add('active');
            
            serviceContents.forEach(content => {
                content.classList.remove('active');
            });
            
            const selectedContent = document.querySelector(`.service-content[data-service="${serviceId}"]`);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
        }
    });
});

// Multi-Step Form Navigation
let currentStep = 1;
const totalSteps = 2;

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.style.display = 'none';
    });
    
    // Show current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (currentStepEl) {
        currentStepEl.style.display = 'block';
    }
    
    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        step.classList.remove('active', 'completed');
        
        if (stepNum === stepNumber) {
            step.classList.add('active');
        } else if (stepNum < stepNumber) {
            step.classList.add('completed');
        }
    });
    
    // Update progress bar
    const progressPercent = (stepNumber / totalSteps) * 100;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = progressPercent + '%';
    }
    
    currentStep = stepNumber;
}

// Next button handler
document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', function() {
        // Validate current step
        const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepEl.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc2626';
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showNotification('Vul alle verplichte velden in voordat u doorgaat.', 'error');
            return;
        }
        
        // Validate email in step 1
        if (currentStep === 1) {
            const emailField = currentStepEl.querySelector('input[type="email"]');
            if (emailField) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    showNotification('Voer een geldig e-mailadres in.', 'error');
                    emailField.style.borderColor = '#dc2626';
                    return;
                }
            }
        }
        
        // Go to next step
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
            // Scroll to top of form
            const isMobile = window.innerWidth <= 768;
            document.querySelector('.quotation-form').scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth', block: 'start' });
        }
    });
});

// Previous button handler
document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', function() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
            const isMobile = window.innerWidth <= 768;
            document.querySelector('.quotation-form').scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth', block: 'start' });
        }
    });
});

// Quotation Form Handler - Now handled by firebase-forms.js

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
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
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Hero Button Actions
document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const isMobile = window.innerWidth <= 768;
        const scrollBehavior = isMobile ? 'auto' : 'smooth';
        
        if (this.textContent.includes('Contact')) {
            document.querySelector('#contact').scrollIntoView({
                behavior: scrollBehavior
            });
        } else if (this.textContent.includes('Diensten')) {
            document.querySelector('#services').scrollIntoView({
                behavior: scrollBehavior
            });
        }
    });
});

// Industry cards are now non-clickable - click handlers removed

// Show Sector Detail Page
function showSectorDetail(sectorId) {
    const sector = sectorData[sectorId];
    if (!sector) return;
    
    // Hide main sections
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.services').style.display = 'none';
    document.querySelector('.industries').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.contact').style.display = 'none';
    
    // Show sector detail
    const sectorDetail = document.querySelector('#sector-detail');
    sectorDetail.style.display = 'block';
    
    // Populate sector information
    document.querySelector('.sector-icon').className = `sector-icon ${sector.icon}`;
    document.querySelector('.sector-title').textContent = sector.title;
    document.querySelector('.sector-description').textContent = sector.description;
    
    // Populate features list
    const featuresList = document.querySelector('.features-list');
    featuresList.innerHTML = '';
    sector.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Scroll to top
    const isMobile = window.innerWidth <= 768;
    window.scrollTo({ top: 0, behavior: isMobile ? 'auto' : 'smooth' });
}

// Back Button Handler
document.querySelector('.back-button').addEventListener('click', function() {
    // Hide sector detail
    document.querySelector('#sector-detail').style.display = 'none';
    
    // Show main sections
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.services').style.display = 'block';
    document.querySelector('.industries').style.display = 'block';
    document.querySelector('.about').style.display = 'block';
    document.querySelector('.contact').style.display = 'block';
    
    // Scroll to industries section
    const isMobile = window.innerWidth <= 768;
    document.querySelector('.industries').scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth' });
});

// Quote Form Handler
const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            company: this.querySelector('input[name="company"]').value,
            name: this.querySelector('input[name="name"]').value,
            email: this.querySelector('input[name="email"]').value,
            phone: this.querySelector('input[name="phone"]').value,
            employees: this.querySelector('select[name="employees"]').value,
            message: this.querySelector('textarea[name="message"]').value,
            sector: document.querySelector('.sector-title').textContent
        };
        
        // Validate privacy checkbox
        const privacyCheckbox = this.querySelector('input[name="privacy"]');
        if (!privacyCheckbox.checked) {
            showNotification('U moet akkoord gaan met de privacyverklaring.', 'error');
            return;
        }
        
        // Submit form
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Versturen...';
        submitBtn.disabled = true;
        
        // Send email via PHP
        fetch('send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formType: 'quote',
                ...formData
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification(`Bedankt ${formData.name}! Uw offerte aanvraag voor ${formData.sector} is succesvol verzonden. We nemen binnen 24 uur contact met u op.`, 'success');
                this.reset();
            } else {
                showNotification(data.message || 'Er is een fout opgetreden. Probeer het later opnieuw.', 'error');
            }
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Er is een fout opgetreden. Probeer het later opnieuw.', 'error');
            submitBtn.textContent = originalText;
        });
    });
}

// Counter Animation for Stats
let start = 0;
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(stat, number);
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 800;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Check for sector parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sector = urlParams.get('sector');
    if (sector && sectorData[sector]) {
        setTimeout(() => {
            showSectorDetail(sector);
        }, 500);
    }
});

// Form Input Focus Effects
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Social Links Hover Effects
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});
