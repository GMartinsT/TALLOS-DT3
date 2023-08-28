FROM node:16

WORKDIR /home/api

COPY . .

RUN npm install

EXPOSE 3010

CMD ["npm", "start"]