FROM node:latest
LABEL author="João Filippe Rossi Rodrigues"
EXPOSE 3006
EXPOSE 3306
WORKDIR /
COPY . .
RUN npm install
ENTRYPOINT npm run dev

