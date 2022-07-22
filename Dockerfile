FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY index.js .

CMD [ "node", "index.js" ]