FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# Step 4: Install any needed packages
# Using --production flag to skip installing devDependencies
RUN npm ci --verbose

# Step 5: Bundle app source
COPY . .

# Step 6: Build your app
# Note: Including TailwindCSS build step based on your package.json scripts.
RUN npm run build-css && npm run build

# After building, remove devDependencies to keep the image size smaller
RUN npm prune --production

# Step 7: Install a simple HTTP server to serve your app
# serve is installed globally to make it available to run your built app
RUN npm install -g serve


# Step 8: The port your app will run on
EXPOSE 3000

# Start the application
CMD sed -i "s|__REACT_APP_SERVER_URL__|${REACT_APP_SERVER_URL}|g" /usr/src/app/build/index.html && serve -s build -l 3000