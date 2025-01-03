import dotenv from 'dotenv';
dotenv.config();

const {
  EMAIL_SERVICE_BASE_URL,
} = process.env;

export default {
  email: {
    baseUrl: EMAIL_SERVICE_BASE_URL,
  },
};
