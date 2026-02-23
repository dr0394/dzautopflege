// Telegram Bot Service for Lead Notifications
export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export interface TelegramMessage {
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

class TelegramService {
  private botToken: string;
  private chatId: string;

  constructor() {
    // These will be set via environment variables
    this.botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
    this.chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';
  }

  async sendMessage(message: TelegramMessage): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.warn('Telegram bot token or chat ID not configured');
      return false;
    }

    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message.text,
          parse_mode: message.parse_mode || 'HTML',
        }),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Telegram message sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      return false;
    }
  }

  formatLeadNotification(lead: any): TelegramMessage {
    const urgencyEmoji = lead.urgency === 'asap' ? '🚨' : 
                        lead.urgency === '1-2-weeks' ? '⏰' : '📅';
    
    const servicesText = Array.isArray(lead.services) 
      ? lead.services.join(', ') 
      : 'Nicht angegeben';

    const text = `
🚗 <b>NEUE AUTOREINIGUNG ANFRAGE!</b> ${urgencyEmoji}

👤 <b>Kunde:</b> ${lead.first_name} ${lead.last_name}
📞 <b>Telefon:</b> ${lead.phone}
${lead.email ? `📧 <b>E-Mail:</b> ${lead.email}` : ''}
📍 <b>PLZ:</b> ${lead.postal_code}

🚙 <b>Fahrzeugtyp:</b> ${lead.vehicle_type || 'Nicht angegeben'}
🧽 <b>Gewünschte Leistungen:</b> ${servicesText}
⏱️ <b>Zeitpunkt:</b> ${lead.urgency === 'asap' ? 'So schnell wie möglich' : 
                      lead.urgency === '1-2-weeks' ? 'In 1-2 Wochen' : 
                      'Später'}

${lead.notes ? `💬 <b>Nachricht:</b> ${lead.notes}` : ''}

${lead.answers?.qualification_score ? `📊 <b>Qualifikation:</b> ${lead.answers.qualification_score}%` : ''}

🕐 <b>Eingegangen:</b> ${new Date().toLocaleString('de-DE')}

<b>Jetzt schnell anrufen:</b> ${lead.phone}
    `.trim();

    return {
      text,
      parse_mode: 'HTML'
    };
  }
}

export const telegramService = new TelegramService();