# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the package files first (for cached install)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the app port (match what's used in Express)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
