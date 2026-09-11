<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    $envFile = file_get_contents(__DIR__ . '/.env');
    $lines = explode("\n", $envFile);
    foreach ($lines as $line) {
        if (empty($line) || strpos($line, '#') === 0) continue;
        list($key, $value) = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}

// SMTP Configuration from .env
define('SMTP_HOST', $_ENV['SMTP_HOST'] ?? 'smtp.hostnet.nl');
define('SMTP_PORT', $_ENV['SMTP_PORT'] ?? 587);
define('SMTP_USERNAME', $_ENV['SMTP_USERNAME'] ?? 'vraagje@secufy.nl');
define('SMTP_PASSWORD', $_ENV['SMTP_PASSWORD'] ?? '');
define('SMTP_FROM', $_ENV['SMTP_FROM'] ?? 'vraagje@secufy.nl');
define('SMTP_FROM_NAME', $_ENV['SMTP_FROM_NAME'] ?? 'Secufy Website');
define('SMTP_TO', $_ENV['SMTP_TO'] ?? 'vraagje@secufy.nl');

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    $data = $_POST;
}

$formType = $data['formType'] ?? 'contact';

// Validate required fields
if ($formType === 'contact') {
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Vul alle verplichte velden in.']);
        exit;
    }
} elseif ($formType === 'quote') {
    if (empty($data['company']) || empty($data['name']) || empty($data['email']) || 
        empty($data['phone'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Vul alle verplichte velden in.']);
        exit;
    }
} elseif ($formType === 'klacht') {
    if (empty($data['naam']) || empty($data['email']) || empty($data['bericht'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Vul alle verplichte velden in.']);
        exit;
    }
}

// Validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Voer een geldig e-mailadres in.']);
    exit;
}

try {
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = 'UTF-8';
    
    // Recipients
    $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
    $mail->addAddress(SMTP_TO);
    $mail->addReplyTo($data['email'], $data['name']);
    
    // Content
    $mail->isHTML(true);
    
    if ($formType === 'contact') {
        $mail->Subject = 'Nieuw contactformulier bericht van ' . htmlspecialchars($data['name']);
        $mail->Body = getContactEmailTemplate($data);
    } elseif ($formType === 'klacht') {
        $mail->Subject = 'Nieuwe klacht/feedback - ' . htmlspecialchars($data['type'] ?? 'Melding');
        $mail->Body = getKlachtEmailTemplate($data);
    } else {
        $mail->Subject = 'Nieuwe offerte aanvraag - ' . htmlspecialchars($data['company'] ?? 'Bedrijf');
        $mail->Body = getQuoteEmailTemplate($data);
    }
    
    $mail->AltBody = strip_tags($mail->Body);
    
    $mail->send();
    
    echo json_encode([
        'success' => true, 
        'message' => 'Uw bericht is succesvol verzonden! We nemen binnen 24 uur contact met u op.'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw.',
        'error' => $mail->ErrorInfo
    ]);
}

function getContactEmailTemplate($data) {
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $phone = htmlspecialchars($data['phone'] ?? 'Niet opgegeven');
    $message = nl2br(htmlspecialchars($data['message']));
    
    return "
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
                    <div class='value'>{$name}</div>
                </div>
                <div class='field'>
                    <div class='label'>E-mailadres:</div>
                    <div class='value'>{$email}</div>
                </div>
                <div class='field'>
                    <div class='label'>Telefoonnummer:</div>
                    <div class='value'>{$phone}</div>
                </div>
                <div class='field'>
                    <div class='label'>Bericht:</div>
                    <div class='value'>{$message}</div>
                </div>
            </div>
            <div class='footer'>
                <p>Dit bericht is verzonden via het contactformulier op secufy.nl</p>
            </div>
        </div>
    </body>
    </html>
    ";
}

function getQuoteEmailTemplate($data) {
    $company = htmlspecialchars($data['company']);
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $phone = htmlspecialchars($data['phone']);
    $address = htmlspecialchars($data['address'] ?? 'Niet opgegeven');
    $postcode = htmlspecialchars($data['postcode'] ?? 'Niet opgegeven');
    $city = htmlspecialchars($data['city'] ?? 'Niet opgegeven');
    $serviceType = htmlspecialchars($data['service_type'] ?? 'Niet opgegeven');
    $description = nl2br(htmlspecialchars($data['description'] ?? ''));
    $startDate = htmlspecialchars($data['start_date'] ?? 'Niet opgegeven');
    $duration = htmlspecialchars($data['duration'] ?? 'Niet opgegeven');
    $guardsNeeded = htmlspecialchars($data['guards_needed'] ?? 'Niet opgegeven');
    $budget = htmlspecialchars($data['budget'] ?? 'Niet opgegeven');
    $specialRequirements = nl2br(htmlspecialchars($data['special_requirements'] ?? 'Geen'));
    
    return "
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
            .sector-badge { background: #FFBE00; color: #1f2937; padding: 5px 15px; border-radius: 20px; display: inline-block; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Nieuwe Offerte Aanvraag</h1>
                <p style='margin: 10px 0 0 0;'><span class='sector-badge'>{$sector}</span></p>
            </div>
            <div class='content'>
                <h2 style='color: #009EFE; margin-bottom: 20px;'>Bedrijfsgegevens</h2>
                <div class='field'>
                    <div class='label'>Bedrijfsnaam:</div>
                    <div class='value'>{$company}</div>
                </div>
                <div class='field'>
                    <div class='label'>Contactpersoon:</div>
                    <div class='value'>{$name}</div>
                </div>
                <div class='field'>
                    <div class='label'>E-mailadres:</div>
                    <div class='value'>{$email}</div>
                </div>
                <div class='field'>
                    <div class='label'>Telefoonnummer:</div>
                    <div class='value'>{$phone}</div>
                </div>
                <div class='field'>
                    <div class='label'>Adres:</div>
                    <div class='value'>{$address}</div>
                </div>
                <div class='field'>
                    <div class='label'>Postcode:</div>
                    <div class='value'>{$postcode}</div>
                </div>
                <div class='field'>
                    <div class='label'>Plaats:</div>
                    <div class='value'>{$city}</div>
                </div>
                
                <h2 style='color: #009EFE; margin: 30px 0 20px 0;'>Beveiligingsbehoeften</h2>
                <div class='field'>
                    <div class='label'>Type beveiligingsdienst:</div>
                    <div class='value'>{$serviceType}</div>
                </div>
                <div class='field'>
                    <div class='label'>Beschrijving:</div>
                    <div class='value'>{$description}</div>
                </div>
                <div class='field'>
                    <div class='label'>Gewenste startdatum:</div>
                    <div class='value'>{$startDate}</div>
                </div>
                <div class='field'>
                    <div class='label'>Duur van de opdracht:</div>
                    <div class='value'>{$duration}</div>
                </div>
                <div class='field'>
                    <div class='label'>Aantal beveiligers benodigd:</div>
                    <div class='value'>{$guardsNeeded}</div>
                </div>
                <div class='field'>
                    <div class='label'>Indicatief budget:</div>
                    <div class='value'>{$budget}</div>
                </div>
                <div class='field'>
                    <div class='label'>Bijzondere eisen of opmerkingen:</div>
                    <div class='value'>{$specialRequirements}</div>
                </div>
            </div>
            <div class='footer'>
                <p>Dit bericht is verzonden via het offerte formulier op secufy.nl</p>
            </div>
        </div>
    </body>
    </html>
    ";
}

function getKlachtEmailTemplate($data) {
    $naam = htmlspecialchars($data['naam']);
    $email = htmlspecialchars($data['email']);
    $telefoon = htmlspecialchars($data['telefoon']);
    $klantnummer = htmlspecialchars($data['klantnummer'] ?? 'Niet opgegeven');
    $type = htmlspecialchars($data['type'] ?? 'Melding');
    $onderwerp = htmlspecialchars($data['onderwerp']);
    $bericht = nl2br(htmlspecialchars($data['bericht']));
    $gewensteOplossing = nl2br(htmlspecialchars($data['gewenste_oplossing'] ?? 'Niet opgegeven'));
    
    $typeColors = [
        'klacht' => '#ef4444',
        'feedback' => '#3b82f6',
        'compliment' => '#10b981',
        'vraag' => '#f59e0b'
    ];
    $typeColor = $typeColors[strtolower($type)] ?? '#009EFE';
    
    return "
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
            .type-badge { background: {$typeColor}; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; font-weight: bold; text-transform: uppercase; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Nieuwe Klacht/Feedback</h1>
                <p style='margin: 10px 0 0 0;'><span class='type-badge'>{$type}</span></p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Naam:</div>
                    <div class='value'>{$naam}</div>
                </div>
                <div class='field'>
                    <div class='label'>E-mailadres:</div>
                    <div class='value'>{$email}</div>
                </div>
                <div class='field'>
                    <div class='label'>Telefoonnummer:</div>
                    <div class='value'>{$telefoon}</div>
                </div>
                <div class='field'>
                    <div class='label'>Klantnummer:</div>
                    <div class='value'>{$klantnummer}</div>
                </div>
                <div class='field'>
                    <div class='label'>Onderwerp:</div>
                    <div class='value'><strong>{$onderwerp}</strong></div>
                </div>
                <div class='field'>
                    <div class='label'>Bericht:</div>
                    <div class='value'>{$bericht}</div>
                </div>
                <div class='field'>
                    <div class='label'>Gewenste oplossing:</div>
                    <div class='value'>{$gewensteOplossing}</div>
                </div>
            </div>
            <div class='footer'>
                <p>Dit bericht is verzonden via het klachtenformulier op secufy.nl</p>
                <p><strong>Reactie binnen 24 uur vereist</strong></p>
            </div>
        </div>
    </body>
    </html>
    ";
}
?>

