FROM node:14

EXPOSE 3333

ADD . /api_ewally_boleto

RUN cd /api_ewally_boleto && npm install

WORKDIR /api_ewally_boleto