FROM node:8

WORKDIR . /app

COPY package*.json ./

RUN npm install

RUN npm install -g @adonisjs/cli

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]