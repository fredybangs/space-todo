const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');

const generateOtp = () => {
  return speakeasy.totp({
    secret: process.env.SPEAKEASY_SECRET, 
    encoding: 'base32',
    step: 1800
  });
};

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'thespaceman2023@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'thespaceman2023@gmail.com',
    to: email,
    subject: 'Space Todo Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}. It expires in 30 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email', error);
  }
};

module.exports = {
  generateOtp,
  sendOtpEmail
};
