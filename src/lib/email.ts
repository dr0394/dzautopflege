import { supabase } from './supabase';
import { LeadData } from './supabase';

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const emailTemplates = {
  confirmation: (lead: LeadData): EmailTemplate => ({
    subject: 'Danke für Ihre Anfrage bei AutoPflege Profi',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2E7D32, #388E3C); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #FFB74D; color: #333; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .details { background: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚗 AutoPflege Profi</div>
            <p>Ihr Auto in Profihänden</p>
          </div>
          
          <div class="content">
            <h2>Vielen Dank für Ihre Anfrage!</h2>
            
            <p>Liebe/r ${lead.first_name} ${lead.last_name},</p>
            
            <p>vielen Dank für Ihr Interesse an unseren Autoreinigungsleistungen. Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.</p>
            
            <div class="details">
              <h3>Ihre Autoreinigungsanfrage im Überblick:</h3>
              <ul>
                <li><strong>Postleitzahl:</strong> ${lead.postal_code}</li>
                <li><strong>Gewünschte Leistungen:</strong> ${lead.services?.join(', ')}</li>
                <li><strong>Fahrzeugtyp:</strong> ${lead.vehicle_type}</li>
                <li><strong>Gewünschter Zeitpunkt:</strong> ${lead.urgency}</li>
              </ul>
            </div>
            
            <p><strong>Was passiert als nächstes?</strong></p>
            <ol>
              <li>Wir prüfen Ihre Anfrage und finden den passenden Autoreiniger in Ihrer Region</li>
              <li>Unser Experte meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen</li>
              <li>Sie erhalten ein kostenloses, unverbindliches Angebot</li>
            </ol>
            
            <p>Bei Rückfragen erreichen Sie uns jederzeit unter:</p>
            <p>📞 <strong>+49 (0) 123 456 789</strong><br>
            📧 <strong>info@autopflege-profi.de</strong></p>
          </div>
          
          <div class="footer">
            <p>AutoPflege Profi | Musterstraße 123 | 12345 Musterstadt</p>
            <p>© 2024 AutoPflege Profi. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Vielen Dank für Ihre Anfrage bei AutoPflege Profi!

Liebe/r ${lead.first_name} ${lead.last_name},

vielen Dank für Ihr Interesse an unseren Autoreinigungsleistungen. Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.

Ihre Autoreinigungsanfrage im Überblick:
- Postleitzahl: ${lead.postal_code}
- Gewünschte Leistungen: ${lead.services?.join(', ')}
- Fahrzeugtyp: ${lead.vehicle_type}
- Gewünschter Zeitpunkt: ${lead.urgency}

Was passiert als nächstes?
1. Wir prüfen Ihre Anfrage und finden den passenden Autoreiniger in Ihrer Region
2. Unser Experte meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen
3. Sie erhalten ein kostenloses, unverbindliches Angebot

Bei Rückfragen erreichen Sie uns jederzeit unter:
Telefon: +49 (0) 123 456 789
E-Mail: info@autopflege-profi.de

Mit freundlichen Grüßen
Ihr AutoPflege Profi Team
    `
  }),

  notification: (lead: LeadData): EmailTemplate => ({
    subject: `Neue Autoreinigungsanfrage von ${lead.first_name} ${lead.last_name} - ${lead.postal_code}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2E7D32; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
          .details { background: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 15px 0; }
          .contact-info { background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚗 Neue Autoreinigungsanfrage</h2>
          </div>
          
          <div class="content">
            <h3>Kundeninformationen</h3>
            <div class="contact-info">
              <p><strong>Name:</strong> ${lead.first_name} ${lead.last_name}</p>
              <p><strong>Telefon:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
              ${lead.email ? `<p><strong>E-Mail:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>` : ''}
              <p><strong>Postleitzahl:</strong> ${lead.postal_code}</p>
            </div>
            
            <h3>Fahrzeug- und Servicedetails</h3>
            <div class="details">
              <p><strong>Gewünschte Leistungen:</strong></p>
              <ul>
                ${lead.services?.map(service => `<li>${service}</li>`).join('')}
              </ul>
              <p><strong>Fahrzeugtyp:</strong> ${lead.vehicle_type}</p>
              <p><strong>Gewünschter Zeitpunkt:</strong> ${lead.urgency}</p>
              ${lead.photo_url ? `<p><strong>Foto:</strong> <a href="${lead.photo_url}">Foto ansehen</a></p>` : ''}
            </div>
            
            ${lead.urgency === 'asap' ? '<div class="urgent"><strong>⚡ EILIG:</strong> Kunde möchte so schnell wie möglich kontaktiert werden!</div>' : ''}
            
            <p><strong>Nächste Schritte:</strong></p>
            <ol>
              <li>Kunden innerhalb von 24 Stunden kontaktieren</li>
              <li>Termin für Fahrzeugbesichtigung vereinbaren</li>
              <li>Kostenloses Angebot erstellen</li>
            </ol>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Neue Autoreinigungsanfrage

Kundeninformationen:
- Name: ${lead.first_name} ${lead.last_name}
- Telefon: ${lead.phone}
${lead.email ? `- E-Mail: ${lead.email}` : ''}
- Postleitzahl: ${lead.postal_code}

Fahrzeug- und Servicedetails:
- Gewünschte Leistungen: ${lead.services?.join(', ')}
- Fahrzeugtyp: ${lead.vehicle_type}
- Gewünschter Zeitpunkt: ${lead.urgency}
${lead.photo_url ? `- Foto: ${lead.photo_url}` : ''}

${lead.urgency === 'asap' ? 'EILIG: Kunde möchte so schnell wie möglich kontaktiert werden!' : ''}

Nächste Schritte:
1. Kunden innerhalb von 24 Stunden kontaktieren
2. Termin für Fahrzeugbesichtigung vereinbaren
3. Kostenloses Angebot erstellen
    `
  }),

  quote: (lead: LeadData, quoteTotal: number): EmailTemplate => ({
    subject: `Ihr Kostenvoranschlag von AutoPflege Profi - ${lead.first_name} ${lead.last_name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2E7D32, #388E3C); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
          .highlight { background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 15px 0; }
          .total { font-size: 18px; font-weight: bold; color: #2E7D32; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚗 AutoPflege Profi</div>
            <p>Ihr Kostenvoranschlag ist da!</p>
          </div>
          
          <div class="content">
            <h2>Liebe/r ${lead.first_name} ${lead.last_name},</h2>
            
            <p>vielen Dank für Ihr Interesse an unseren Autoreinigungsleistungen. Gerne übersenden wir Ihnen hiermit Ihren persönlichen Kostenvoranschlag.</p>
            
            <div class="highlight">
              <p class="total">Individuelle Preisgestaltung nach Besichtigung</p>
            </div>
            
            <p>Den detaillierten Kostenvoranschlag finden Sie im Anhang als PDF-Datei.</p>
            
            <p><strong>Nächste Schritte:</strong></p>
            <ol>
              <li>Prüfen Sie unser Angebot in Ruhe</li>
              <li>Bei Fragen stehen wir Ihnen gerne zur Verfügung</li>
              <li>Bei Interesse können Sie den Auftrag direkt erteilen</li>
            </ol>
            
            <p>Wir freuen uns auf Ihre Rückmeldung und darauf, Ihren Garten in eine grüne Oase zu verwandeln!</p>
            
            <p>Bei Fragen erreichen Sie uns jederzeit unter:</p>
            <p>📞 <strong>+49 (0) 123 456 789</strong><br>
            📧 <strong>info@autopflege-profi.de</strong></p>
            
            <p>Mit freundlichen Grüßen<br>
            Ihr AutoPflege Profi Team</p>
          </div>
          
          <div class="footer">
            <p>AutoPflege Profi | Musterstraße 123 | 12345 Musterstadt</p>
            <p>© 2024 AutoPflege Profi. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Liebe/r ${lead.first_name} ${lead.last_name},

vielen Dank für Ihr Interesse an unseren Autoreinigungsleistungen. Gerne übersenden wir Ihnen hiermit Ihren persönlichen Kostenvoranschlag.

Individuelle Preisgestaltung nach Besichtigung

Den detaillierten Kostenvoranschlag finden Sie im Anhang als PDF-Datei.

Nächste Schritte:
1. Prüfen Sie unser Angebot in Ruhe
2. Bei Fragen stehen wir Ihnen gerne zur Verfügung
3. Bei Interesse können Sie den Auftrag direkt erteilen

Bei Fragen erreichen Sie uns jederzeit unter:
Telefon: +49 (0) 123 456 789
E-Mail: info@autopflege-profi.de

Mit freundlichen Grüßen
Ihr AutoPflege Profi Team
    `
  })
};

export async function sendEmail(to: string, template: EmailTemplate, leadId?: string, emailType?: string) {
  try {
    // In a real implementation, you would use a service like Brevo, SendGrid, or SMTP
    // For now, we'll simulate sending and log to the email_logs table
    
    console.log('Sending email:', {
      to,
      subject: template.subject,
      html: template.html
    });

    // Log the email
    if (leadId && emailType) {
      await supabase
        .from('email_logs')
        .insert([{
          lead_id: leadId,
          email_type: emailType,
          recipient_email: to,
          subject: template.subject,
          status: 'sent'
        }]);
    }

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Log the error
    if (leadId && emailType) {
      await supabase
        .from('email_logs')
        .insert([{
          lead_id: leadId,
          email_type: emailType,
          recipient_email: to,
          subject: template.subject,
          status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }]);
    }

    return { success: false, error };
  }
}