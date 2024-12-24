# Project Setup Guide

## Prerequisites

To run this repository, ensure you have the following installed:

- [Docker](https://www.docker.com/)

## Environment Setup

1. **Copy the `.env.example` file:**

   - Duplicate the `.env.example` file in the root folder and rename it to `.env`.
   - Open the `.env` file and fill in the necessary environment variables.

2. **Firebase Setup:**

   - You need a Firebase account and Firebase Storage configured.
   - Download the `serviceAccountKey.json` file from Firebase and place it in the `backend` folder.

3. **NodeMailer Configuration:**

   - To configure NodeMailer, visit the [NodeMailer documentation](https://www.nodemailer.com/).
   - Add your configuration values to the `.env` file.

   If using Gmail as the provider:

   - You’ll need to generate an app-specific password from [Google’s App Passwords](https://myaccount.google.com/apppasswords).
   - Use the generated password for your settings in NodeMailer.

## Running the Project

Once you’ve configured the environment variables, you can run the project using Docker:

1. Build the Docker images:
   ```bash
   docker-compose build
   ```
2. Start the containers:
   ```bash
   docker-compose up
   ```
