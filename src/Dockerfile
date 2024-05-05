FROM node:latest

WORKDIR /app

COPY . /app         

RUN rm -rf node_modules
RUN npm install -g nodemon

EXPOSE 3003

CMD ["npm","start"]

