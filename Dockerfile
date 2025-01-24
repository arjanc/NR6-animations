# Use an Alpine image as the base
FROM alpine:3.14

# Install Python 2, Node.js (latest available version), Yarn, and build tools
RUN apk add --no-cache \
    python2 \
    py-pip \
    nodejs npm yarn build-base

# Ensure Python 2 is in the PATH
RUN ln -sf /usr/bin/python2 /usr/bin/python

# Install sass
RUN npm install -g sass

# Set the working directory
WORKDIR /app

COPY package.json yarn.lock ./

# Install all packages
RUN yarn install

COPY ./src ./src/

RUN yarn run build

# Run NR6
EXPOSE 1234
ENTRYPOINT ["yarn", "run", "dev"]