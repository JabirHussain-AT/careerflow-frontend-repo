# Use a lightweight Node.js image
FROM node:alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve the built React app
FROM nginx:alpine

# Copy the build files from the previous stage to the nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
