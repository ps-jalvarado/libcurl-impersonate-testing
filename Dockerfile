FROM lwthiker/curl-impersonate:0.5.4-chrome

RUN apk update
RUN apk add curl bash

ENV NODE_VERSION=16.13.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

WORKDIR /testing
COPY ./ /testing

RUN ln -s /usr/local/lib/libcurl-impersonate-chrome.so.4.8.0 /usr/local/lib/libcurl.so
RUN npm install node-libcurl --build-from-source --curl_libraries='-Wl,-rpath /usr/local/lib -lcurl'

CMD ["node", "index.js"]