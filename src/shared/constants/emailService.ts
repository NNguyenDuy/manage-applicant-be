import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Thay bằng dịch vụ email bạn đang sử dụng
  auth: {
    user: 'minvietpro1914@gmail.com', // Thay bằng email của bạn
    pass: 'nulbkgxmazsvquva', // Thay bằng mật khẩu email của bạn (nên sử dụng biến môi trường cho mật khẩu)
  },
});

export const sendApprovalEmail = async (recipientEmail: string, candidateName: string) => {
  const mailOptions = {
    from: 'minvietpro1914@gmail.com', // Thay bằng email của bạn
    to: recipientEmail,
    subject: 'Thông báo duyệt CV',
    text: `Chào ${candidateName},\n\nCV của bạn đã được duyệt thành công! Chúc mừng bạn!\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(mailOptions)
    console.log('Email đã được gửi thành công');
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
  }
};
