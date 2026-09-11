# Secufy Website

Professional security company website for Secufy, featuring comprehensive security services and sector-specific solutions.

## Features

- **Modern Design**: Clean, professional design with Secufy brand colors (Blue #009EFE, Yellow #FFBE00)
- **9 Security Services**: Complete range of security solutions
- **10 Industry Sectors**: Clickable sector cards with detailed information pages
- **Quote Request Forms**: Sector-specific quote forms with email integration
- **Contact Form**: General contact form for inquiries
- **Responsive Design**: Fully responsive for all devices
- **Email Integration**: SMTP email delivery via Hostnet.nl

## Technologies

- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript
- PHP (for email handling)
- PHPMailer (SMTP email library)

## Setup Instructions

### 1. Install Dependencies

The website uses PHPMailer for sending emails. Install it using Composer:

```bash
composer install
```

If you don't have Composer installed, download it from [getcomposer.org](https://getcomposer.org/)

### 2. Configure SMTP Settings

Edit `send-email.php` and update the SMTP credentials:

```php
define('SMTP_USERNAME', 'your-email@secufy.nl');
define('SMTP_PASSWORD', 'your-smtp-password');
```

**SMTP Configuration:**
- Host: smtp.hostnet.nl
- Port: 587
- Encryption: STARTTLS
- From: vraagje@secufy.nl
- To: vraagje@secufy.nl

### 3. Server Requirements

- PHP 7.4 or higher
- PHP extensions: openssl, mbstring
- Web server (Apache/Nginx)

### 4. Deployment

1. Upload all files to your web server
2. Ensure `send-email.php` has proper permissions
3. Run `composer install` on the server
4. Test the contact and quote forms

## File Structure

```
windsurf-project-8/
├── index.html              # Main website file
├── styles.css              # All styling
├── script.js               # JavaScript functionality
├── send-email.php          # Email handler with SMTP
├── composer.json           # PHP dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Contact Information

- **Email**: vraagje@secufy.nl
- **Phone**: 085 212 7504
- **Address**: Seinhuiswachter 2, 3034KH Rotterdam

## Forms

### Contact Form
- Name (required)
- Email (required)
- Phone (optional)
- Message (required)

### Quote Request Form
- Company name (required)
- Contact person (required)
- Email (required)
- Phone (required)
- Number of employees (required)
- Security needs (required)
- Privacy agreement (required)

Both forms send emails to `vraagje@secufy.nl` using the configured SMTP settings.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Development

To run locally:

1. Use a local PHP server:
   ```bash
   php -S localhost:8000
   ```

2. Or use Python's HTTP server for static files:
   ```bash
   python -m http.server 8000
   ```

Note: Email functionality requires PHP server.

## Security

- Form validation on both client and server side
- CSRF protection recommended for production
- HTTPS recommended for production deployment
- Store SMTP credentials securely (use environment variables)

## License

© 2024 Secufy. All rights reserved.
