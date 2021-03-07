FROM node:14-alpine

RUN mkdir -p /home/node/puzl-server/node_modules && chown -R node:node /home/node/puzl-server

WORKDIR /home/node/puzl-server

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "start" ]