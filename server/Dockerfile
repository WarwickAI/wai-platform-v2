FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .

# Rename
COPY .env.production .env

RUN yarn build

ENV NODE_ENV production

# Don't think this matters with dokku
EXPOSE 8080

CMD [ "node", "dist/index.js" ]

# Don't run as root
USER node