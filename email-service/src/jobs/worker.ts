import { Worker } from "bullmq";
import redisConfig from "../config/redis";
import { notificationService } from "../services/notifications/notifications";

const worker = new Worker(
  "email-queue",
  async (job) => {
    const { patient } = job.data;
    try {
      await notificationService.sendVerificationNotification(patient);
    } catch (error: any) {
      console.error(`Failed to send email to ${patient.email}:`, error);
      throw error;
    }
  },
  { connection: redisConfig }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});

export default worker;
