FROM node:current-alpine

RUN apk add --no-cache git

RUN git clone https://github.com/Archiruz/ArchiBot /root/archibot
WORKDIR root/archibot/

RUN npm install

CMD ['npm','start']