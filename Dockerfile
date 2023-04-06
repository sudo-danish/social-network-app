#"NODE_VERSION=19.8.1"
FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

#Any parameters in the "Docker run" command will override the 'CMD' Instruction.
CMD [ "npm", "start" ]

