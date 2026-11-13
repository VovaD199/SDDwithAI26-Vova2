import { generateCollaborationEmail, generateContactEmail } from './emails/emails';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  async sendEmail(_options: EmailOptions): Promise<{ success: boolean }> {
    return { success: true };
  }

  async sendCollaborationEmail(data: {
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
  }): Promise<{ success: boolean }> {
    generateCollaborationEmail(data);
    return { success: true };
  }

  async sendContactEmail(data: {
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
    formType?: string;
  }): Promise<{ success: boolean }> {
    generateContactEmail(data);
    return { success: true };
  }
}

export const emailService = new EmailService();
