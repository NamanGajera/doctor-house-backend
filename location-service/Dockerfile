# Use official Node image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /src

# Copy only package files to install dependencies first (cache optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the service port (optional, but good for clarity)
EXPOSE 5003

# Start the app
CMD ["npm", "run", "dev"]
