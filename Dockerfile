FROM node:13
WORKDIR /usr/src/asn34
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","index.js"]