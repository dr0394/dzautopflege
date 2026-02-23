import { telegramService } from './telegram';
import { sendEmail, emailTemplates } from './email';
import { LeadData } from './supabase';

export interface NotificationService {
  sendLeadNotification(lead: LeadData): Promise<void>;
}

class NotificationManager implements NotificationService {
  async sendLeadNotification(lead: LeadData): Promise<void> {
    const notifications = [];

    // 1. Send Telegram notification (instant)
    try {
      const telegramMessage = telegramService.formatLeadNotification(lead);
      const telegramSent = await telegramService.sendMessage(telegramMessage);
      
      if (telegramSent) {
        console.log('✅ Telegram notification sent successfully');
      } else {
        console.warn('⚠️ Telegram notification failed');
      }
    } catch (error) {
      console.error('❌ Telegram notification error:', error);
    }

    // 2. Send email notification (backup)
    try {
      const emailTemplate = emailTemplates.notification(lead);
      await sendEmail('kfz.service.chouman@gmail.com', emailTemplate, lead.id, 'notification');
      console.log('✅ Email notification sent successfully');
    } catch (error) {
      console.error('❌ Email notification error:', error);
    }

    // 3. Log notification attempt
    console.log(`📢 Notifications sent for lead: ${lead.first_name} ${lead.last_name}`);
  }
}

export const notificationManager = new NotificationManager();