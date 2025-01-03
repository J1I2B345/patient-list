import dotenv from "dotenv";

dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;

export default {
  host: REDIS_HOST || "localhost",
  port: Number(REDIS_PORT) || 6379,
};
