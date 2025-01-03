import { createTransport } from "nodemailer";

const { EMAIL_SERVICE_PROVIDER, EMAIL_USER_PASSWORD, EMAIL_USER_NAME } =
  process.env;

const transporter = createTransport({
  service: EMAIL_SERVICE_PROVIDER,
  auth: {
    user: EMAIL_USER_NAME,
    pass: EMAIL_USER_PASSWORD,
  },
});

export default transporter;
