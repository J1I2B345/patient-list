# Use Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 5000

# Command to start the backend
CMD ["npm", "run", "dev"]
