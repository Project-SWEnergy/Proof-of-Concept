# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Nest.js dependencies excluding devDependencies
RUN npm install --only=production

# Install additional dependencies for Nest.js (swagger, drizzle-orm, pg)
RUN npm install @nestjs/swagger swagger-ui-express drizzle-orm pg

# Copy the wait-for-it.sh script into the container and make it executable
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy all the local files to the container
COPY . .

# Expose the port your app runs on (ensure it matches the port in your Nest.js app)
EXPOSE 3000
