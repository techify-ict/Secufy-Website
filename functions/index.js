const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp();

// SMTP Configuration from .env file
const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.hostnet.nl',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || 'vraagje@secufy.nl',
        pass: process.env.SMTP_PASS
    }
};

// Create transporter
const transporter = nodemailer.createTransport(smtpConfig);

// Mail recipients
const MAIL_TO = 'vraagje@secufy.nl, platform.secufy@gmail.com';

// CORS middleware
const cors = require('cors')({ origin: true });

// Send Email Cloud Function
exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // Only allow POST
        if (req.method !== 'POST') {
            return res.status(405).json({ success: false, message: 'Method not allowed' });
        }

        const { formType, data } = req.body;

        if (!formType || !data) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        try {
            let emailHtml = '';
            let subject = '';

            // Generate email based on form type
            if (formType === 'quotation') {
                subject = `Nieuwe offerte aanvraag - ${data.company}`;
                emailHtml = getQuotationEmailTemplate(data);
            } else if (formType === 'complaints') {
                subject = `Nieuwe klacht/feedback - ${data.type}`;
                emailHtml = getComplaintEmailTemplate(data);
            } else if (formType === 'contact') {
                subject = `Nieuw contactformulier bericht van ${data.name}`;
                emailHtml = getContactEmailTemplate(data);
            } else if (formType === 'recruitment') {
                subject = `🎯 Nieuwe Werving Aanmelding - ${data.municipality || data.region || 'Onbekend'}`;
                emailHtml = getRecruitmentEmailTemplate(data);
            }

            // Send email
            const mailOptions = {
                from: `"Secufy Website" <${smtpConfig.auth.user}>`,
                to: MAIL_TO,
                replyTo: data.email,
                subject: subject,
                html: emailHtml
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({
                success: true,
                message: 'Email verzonden'
            });

        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                success: false,
                message: 'Fout bij verzenden email',
                error: error.message
            });
        }
    });
});

// Firestore trigger - send email when new quotation is added
exports.onQuotationCreated = functions.firestore
    .document('quotations/{quotationId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();
        
        try {
            const mailOptions = {
                from: `"Secufy Website" <${smtpConfig.auth.user}>`,
                to: MAIL_TO,
                replyTo: data.email,
                subject: `Nieuwe offerte aanvraag - ${data.company}`,
                html: getQuotationEmailTemplate(data)
            };

            await transporter.sendMail(mailOptions);
            console.log('Quotation email sent successfully');
        } catch (error) {
            console.error('Error sending quotation email:', error);
        }
    });

// Firestore trigger - send email when new complaint is added
exports.onComplaintCreated = functions.firestore
    .document('complaints/{complaintId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();
        
        try {
            const mailOptions = {
                from: `"Secufy Website" <${smtpConfig.auth.user}>`,
                to: MAIL_TO,
                replyTo: data.email,
                subject: `Nieuwe klacht/feedback - ${data.type}`,
                html: getComplaintEmailTemplate(data)
            };

            await transporter.sendMail(mailOptions);
            console.log('Complaint email sent successfully');
        } catch (error) {
            console.error('Error sending complaint email:', error);
        }
    });

// Email Templates
function getQuotationEmailTemplate(data) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #009EFE, #FFBE00); padding: 30px; text-align: center; color: white; }
            .content { background: #f9f9f9; padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #009EFE; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Nieuwe Offerte Aanvraag</h1>
            </div>
            <div class='content'>
                <h2 style='color: #009EFE; margin-bottom: 20px;'>Bedrijfsgegevens</h2>
                <div class='field'>
                    <div class='label'>Bedrijfsnaam:</div>
                    <div class='value'>${data.company || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Contactpersoon:</div>
                    <div class='value'>${data.name || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>E-mailadres:</div>
                    <div class='value'>${data.email || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Telefoonnummer:</div>
                    <div class='value'>${data.phone || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Adres:</div>
                    <div class='value'>${data.address || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Postcode:</div>
                    <div class='value'>${data.postcode || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Plaats:</div>
                    <div class='value'>${data.city || 'Niet opgegeven'}</div>
                </div>
                
                <h2 style='color: #009EFE; margin: 30px 0 20px 0;'>Beveiligingsbehoeften</h2>
                <div class='field'>
                    <div class='label'>Type beveiligingsdienst:</div>
                    <div class='value'>${data.service_type || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Beschrijving:</div>
                    <div class='value'>${(data.description || 'Niet opgegeven').replace(/\n/g, '<br>')}</div>
                </div>
                <div class='field'>
                    <div class='label'>Gewenste startdatum:</div>
                    <div class='value'>${data.start_date || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Duur van de opdracht:</div>
                    <div class='value'>${data.duration || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Aantal beveiligers benodigd:</div>
                    <div class='value'>${data.guards_needed || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Indicatief budget:</div>
                    <div class='value'>${data.budget || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Bijzondere eisen of opmerkingen:</div>
                    <div class='value'>${(data.special_requirements || 'Geen').replace(/\n/g, '<br>')}</div>
                </div>
            </div>
            <div class='footer'>
                <p>Dit bericht is verzonden via het offerte formulier op secufy.nl</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function getComplaintEmailTemplate(data) {
    const typeColors = {
        'klacht': '#ef4444',
        'feedback': '#3b82f6',
        'compliment': '#10b981',
        'vraag': '#f59e0b'
    };
    const typeColor = typeColors[data.type?.toLowerCase()] || '#009EFE';
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #009EFE, #FFBE00); padding: 30px; text-align: center; color: white; }
            .content { background: #f9f9f9; padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #009EFE; }
            .value { margin-top: 5px; }
            .type-badge { background: ${typeColor}; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; font-weight: bold; text-transform: uppercase; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Nieuwe Klacht/Feedback</h1>
                <p style='margin: 10px 0 0 0;'><span class='type-badge'>${data.type || 'Melding'}</span></p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Naam:</div>
                    <div class='value'>${data.naam || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>E-mailadres:</div>
                    <div class='value'>${data.email || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Telefoonnummer:</div>
                    <div class='value'>${data.telefoon || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Klantnummer:</div>
                    <div class='value'>${data.klantnummer || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Onderwerp:</div>
                    <div class='value'><strong>${data.onderwerp || 'Niet opgegeven'}</strong></div>
                </div>
                <div class='field'>
                    <div class='label'>Bericht:</div>
                    <div class='value'>${(data.bericht || 'Niet opgegeven').replace(/\n/g, '<br>')}</div>
                </div>
                <div class='field'>
                    <div class='label'>Gewenste oplossing:</div>
                    <div class='value'>${(data.gewenste_oplossing || 'Niet opgegeven').replace(/\n/g, '<br>')}</div>
                </div>
            </div>
            <div class='footer'>
                <p>Dit bericht is verzonden via het klachtenformulier op secufy.nl</p>
                <p><strong>Reactie binnen 24 uur vereist</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function getContactEmailTemplate(data) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #009EFE, #FFBE00); padding: 30px; text-align: center; color: white; }
            .content { background: #f9f9f9; padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #009EFE; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Nieuw Contactformulier Bericht</h1>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Naam:</div>
                    <div class='value'>${data.name || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>E-mailadres:</div>
                    <div class='value'>${data.email || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Telefoonnummer:</div>
                    <div class='value'>${data.phone || 'Niet opgegeven'}</div>
                </div>
                <div class='field'>
                    <div class='label'>Bericht:</div>
                    <div class='value'>${(data.message || 'Niet opgegeven').replace(/\n/g, '<br>')}</div>
                </div>
            </div>
            <div class='footer'>
                <p>Dit bericht is verzonden via het contactformulier op secufy.nl</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function getRecruitmentEmailTemplate(data) {
    const phone = data.phone || 'Niet opgegeven';
    const email = data.email || 'Niet opgegeven';
    const name = data.firstName || data.name || 'Niet opgegeven';
    const municipality = data.municipality || 'Niet opgegeven';
    const region = data.region || 'Niet opgegeven';
    const hours = data.hours || 'Niet opgegeven';
    const experience = data.experience || 'Niet opgegeven';
    const diploma = data.diploma || 'Niet opgegeven';
    const priorities = data.priorities || 'Niet opgegeven';
    const startDate = data.start_date || 'Niet opgegeven';
    const cvUrl = data.cvUrl || data.cv_url || '';
    const sourcePage = data.sourcePage || data.page || data.pageSlug || 'Niet opgegeven';

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #009EFE, #FFBE00); padding: 30px; text-align: center; color: white; }
            .content { background: #f9f9f9; padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #009EFE; }
            .value { margin-top: 5px; }
            .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #FFBE00; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🎯 Nieuwe Werving Aanmelding</h1>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>👤 Voornaam:</div>
                    <div class='value'><strong>${name}</strong></div>
                </div>

                <div class='field'>
                    <div class='label'>✉️ E-mailadres:</div>
                    <div class='value'>${email}</div>
                </div>

                <div class='field'>
                    <div class='label'>📞 Telefoonnummer:</div>
                    <div class='value'><strong style='font-size: 18px;'>${phone}</strong></div>
                </div>
                
                <div class='field'>
                    <div class='label'>📍 Gemeente:</div>
                    <div class='value'>${municipality}</div>
                </div>

                <div class='field'>
                    <div class='label'>🗺️ Werkgebied (speedcheck):</div>
                    <div class='value'>${region}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>⏰ Beschikbaarheid:</div>
                    <div class='value'>${hours}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>💼 Ervaring:</div>
                    <div class='value'>${experience}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>🎓 Diploma:</div>
                    <div class='value'>${diploma}</div>
                </div>
                
                <div class='highlight'>
                    <div class='label'>🔥 Wat vindt kandidaat belangrijk:</div>
                    <div class='value'><strong>${priorities}</strong></div>
                </div>
                
                <div class='field'>
                    <div class='label'>🚀 Startmoment:</div>
                    <div class='value'>${startDate}</div>
                </div>

                <div class='field'>
                    <div class='label'>📄 CV:</div>
                    <div class='value'>${cvUrl ? `<a href="${cvUrl}" target="_blank" rel="noopener noreferrer">Download CV</a>` : 'Niet meegestuurd'}</div>
                </div>

                <div class='field'>
                    <div class='label'>🔗 Bronpagina:</div>
                    <div class='value'>${sourcePage}</div>
                </div>
            </div>
            <div class='footer'>
                <p><strong>⚡ Actie vereist: Bel binnen 24 uur</strong></p>
                <p>Dit bericht is verzonden via de wervingsfunnel op secufy.nl</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// Firestore trigger for recruitment submissions
exports.onRecruitmentCreated = functions.firestore
    .document('recruitment/{recruitmentId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();
        
        try {
            const mailOptions = {
                from: `"Secufy Werving" <${smtpConfig.auth.user}>`,
                to: MAIL_TO,
                subject: `🎯 Nieuwe Werving Aanmelding - ${data.municipality || data.region || 'Onbekend'}`,
                html: getRecruitmentEmailTemplate(data)
            };

            await transporter.sendMail(mailOptions);
            console.log('Recruitment email sent successfully');
            return null;
        } catch (error) {
            console.error('Error sending recruitment email:', error);
            return null;
        }
    });
