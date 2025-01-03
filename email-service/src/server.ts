import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();

import emailQueue from "./jobs/email-queue";
import "./jobs/worker";

const app = express();
app.use(json());

app.post("/api/send-verification-email", async (req, res) => {
  console.log("Sending verification email");
  console.log(req.body);
  const { patient } = req.body;

  try {
    console.log("Adding email job to the queue");
    await emailQueue.add("email-queue", { patient });
    console.log("Email job added to the queue");
    res.status(200).json({ message: "Email job added to the queue." });
  } catch (error) {
    console.error("Failed to add email job:", error);
    res.status(500).json({ message: "Failed to add email job." });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Email service listening on port ${PORT}`));
