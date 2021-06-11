FROM node:12-alpine

RUN mkdir -p /home/node/puzl-web/node_modules && chown -R node:node /home/node/puzl-web

WORKDIR /home/node/puzl-web

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]