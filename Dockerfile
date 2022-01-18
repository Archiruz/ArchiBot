FROM node:latest-alpine

RUN git clone https://github.com/Archiruz/ArchiBot /root/archibot
WORKDIR root/archibot/

RUN npm install

CMD ['npm','start']