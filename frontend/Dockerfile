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

# Expose the development server port
EXPOSE 3000

# Command to start the frontend
CMD ["npm", "run", "dev"]
