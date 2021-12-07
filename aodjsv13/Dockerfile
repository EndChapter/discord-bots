FROM node:current-alpine
RUN apk add --no-cache \
python3 \
make \
g++ \
cairo-dev \
pango-dev \
jpeg-dev \
giflib-dev \
librsvg-dev \
ttf-opensans

WORKDIR "/opt/aoshima"
COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .

ENTRYPOINT [ "/bin/sh" ]
# CMD ["node", "index.js"]