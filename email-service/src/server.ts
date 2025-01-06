import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();

import emailQueue from "./jobs/email-queue";
import "./jobs/worker";
import { logError, logInfo } from "./utils/logger";

const app = express();
app.use(json());

app.post("/api/send-verification-email", async (req, res) => {
  logInfo("Sending verification email", { body: req.body });
  const { patient } = req.body;

  try {
    logInfo("Adding email job to the queue", { patient: patient });
    await emailQueue.add("email-queue", { patient });
    logInfo("Email job added to the queue", { patient: patient });
    res.status(200).json({ message: "Email job added to the queue." });
  } catch (error) {
    logError("Failed to add email job", { error: error });
    res.status(500).json({ message: "Failed to add email job." });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  logInfo("Email service listening on port", { port: PORT })
);
