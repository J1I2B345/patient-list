import dotenv from 'dotenv';
dotenv.config();

const {
  EMAIL_USER_NAME,
  EMAIL_USER_PASSWORD,
  EMAIL_SERVICE_PROVIDER,
  EMAIL_FROM_NAME,
  EMAIL_FROM_ADDRESS,
} = process.env;

export default {
  email: {
    service: EMAIL_SERVICE_PROVIDER,
    user: EMAIL_USER_NAME,
    pass: EMAIL_USER_PASSWORD,
    from: `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`,
  },
};
