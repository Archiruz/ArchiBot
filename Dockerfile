FROM node:latest-alpine

RUN git clone https://github.com/Archiruz/ArchiBot /root/archibot
WORKDIR root/archibot/

CMD ["node","."]