import dotenv from "dotenv";
dotenv.config();

const {
  EMAIL_USER_NAME,
  EMAIL_USER_PASSWORD,
  EMAIL_SERVICE_PROVIDER,
  EMAIL_FROM_NAME,
  EMAIL_FROM_ADDRESS,
  EMAIL_SERVICE_BASE_URL,
} = process.env;

export default {
  email: {
    service: EMAIL_SERVICE_PROVIDER,
    user: EMAIL_USER_NAME,
    pass: EMAIL_USER_PASSWORD,
    from: `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`,
    baseUrl: EMAIL_SERVICE_BASE_URL,
  },
};
