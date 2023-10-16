FROM node:16-alpine
ENV NODE_ENV=dev
WORKDIR /backend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --dev --save-dev
COPY . .
CMD ["npm", "run","dev"]
