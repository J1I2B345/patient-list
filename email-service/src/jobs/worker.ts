import { Worker } from "bullmq";
import redisConfig from "../config/redis";
import { notificationService } from "../services/notifications/notifications";
import { logError, logInfo } from "../utils/logger";

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
  logInfo("Job completed successfully", { job: job });
});

worker.on("failed", (job, err) => {
  logError("Job failed", { job: job, error: err });
});

export default worker;
