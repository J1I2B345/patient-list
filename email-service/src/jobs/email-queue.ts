import { Queue } from "bullmq";
import redisConfig from "../config/redis";

const emailQueue = new Queue("email-queue", { connection: redisConfig });

export default emailQueue;
