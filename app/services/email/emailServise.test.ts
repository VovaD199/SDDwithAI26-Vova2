import { emailService } from './emailService';

describe('EmailService demo no-op', () => {
  it('should accept generic email payloads without sending email', async () => {
    const res = await emailService.sendEmail({
      to: 'test@example.com',
      subject: 'Subject',
      html: '<b>Body</b>'
    });

    expect(res).toEqual({ success: true });
  });

  it('should accept collaboration emails without sending email', async () => {
    const res = await emailService.sendCollaborationEmail({
      name: 'Ivan',
      email: 'ivan@test.com',
      message: 'Hello!',
      phoneNumber: '123456'
    });

    expect(res).toEqual({ success: true });
  });

  it('should accept contact emails without sending email', async () => {
    const res = await emailService.sendContactEmail({
      name: 'Ivan',
      email: 'ivan@test.com',
      message: 'Hello!',
      formType: 'Support'
    });

    expect(res).toEqual({ success: true });
  });
});
