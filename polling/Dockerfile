FROM node:12

ARG TELEGRAM_BOT_TOKEN_ARG
ENV TELEGRAM_BOT_TOKEN $TELEGRAM_BOT_TOKEN_ARG
# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]