FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y ffmpeg
RUN npm install
COPY . .
EXPOSE 8554
CMD ["node", "publisher.js"]