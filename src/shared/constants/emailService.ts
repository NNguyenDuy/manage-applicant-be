import nodemailer from 'nodemailer';
import { E_ApplicationStatus } from '../../models/application';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'minvietpro1914@gmail.com',
    pass: 'nulbkgxmazsvquva',
  },
});

export const sendNotificationEmail = async (
  recipientEmail: string,
  candidateName: string,
  status: E_ApplicationStatus
) => {
  let subject = '';
  let text = '';

  switch (status) {
    case E_ApplicationStatus.ACCEPTED:
      subject = 'Chúc mừng! CV của bạn đã được chấp nhận';
      text = `Chào ${candidateName},\n\nChúc mừng! CV của bạn đã được chấp nhận. Chúng tôi sẽ liên lạc với bạn để sắp xếp bước tiếp theo.\n\nTrân trọng,\nĐội ngũ tuyển dụng`;
      break;
    case E_ApplicationStatus.UNDER_REVIEW:
      subject = 'Thông báo: CV của bạn đang được xem xét';
      text = `Chào ${candidateName},\n\nCV của bạn đang được xem xét. Chúng tôi sẽ thông báo kết quả trong thời gian sớm nhất.\n\nTrân trọng,\nĐội ngũ tuyển dụng`;
      break;
    case E_ApplicationStatus.REJECTED:
      subject = 'Thông báo: CV của bạn không được chấp nhận';
      text = `Chào ${candidateName},\n\nRất tiếc, CV của bạn không phù hợp với yêu cầu hiện tại của chúng tôi. Chúc bạn may mắn trong những cơ hội khác.\n\nTrân trọng,\nĐội ngũ tuyển dụng`;
      break;
    default:
      throw new Error('Trạng thái không hợp lệ để gửi email');
  }

  const mailOptions = {
    from: 'minvietpro1914@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email đã được gửi thành công:', mailOptions);
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
  }
};

