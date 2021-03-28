FROM node:14

WORKDIR /usr/photo-grid

COPY . .

COPY package*.json ./
RUN npm install

COPY front-end/package*.json ./front-end
RUN cd front-end && npm install

RUN cd front-end && npm run build

EXPOSE 8888

CMD [ "node", "server.js" ]
