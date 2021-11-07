# alpine mirror
# (option) slim mirror
# node-sass mirror
# npm mirror https://developer.aliyun.com/mirror/NPM?from=tnpm
# npm config get registry
# npm config delete registry

# SASS_BINARY_SITE sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

# registry=https://registry.npm.taobao.org

# http://zqlu.github.io/2016/05/10/taobao-nodejs-mirror/
# https://herringtondarkholme.github.io/2016/06/07/how-to-config-node-cdn/

# yarn config set registry "http://registry.npm.personal/"

# node:lts-alpine node:12.18.0-alpine

# docker pull --insecure-registry f1361db2.m.daocloud.io/node:12.18.0-alpine

# docker run --rm -it -e PORT=3000 -p 3000:3000 -v $HOME/Tools/docker_node/node_modules:/app/node_modules -v $(PWD):/app node:12.18.0-alpine sh

# .yarnrc PATH

# USER GID

# id 

# id -u 501

# docker run --rm -it -e PORT=3000 -p 3000:3000 -v $(PWD):/app -v $HOME/Tools/docker_node/yarnrc:/home/app/.yarnrc -v $HOME/Tools/docker_node/node_modules:/app/node_modules node-local-dev:latest sh

# docker build . -t node-local-dev 
# RUN addgroup -g ${GROUPID} -S ${USERNAME} 

# RUN adduser -S -G ${USERNAME} -u ${USERID} -s /bin/bash -h ${USER_HOME} ${USERNAME}
# yarn add gatsby --cwd /app --registry=https://registry.npm.taobao.org

# yarn install --registry=https://registry.npm.taobao.org && yarn run dev

# RUN addgroup --gid "$GID" "$USER" \
#     && 
# RUN adduser \
#     --disabled-password \
#     --gecos "" \
#     --home "$(pwd)" \
#     --ingroup "$USER" \
#     --no-create-home \
#     --uid "$UID" \
#     "$USER"

# adduser -S -G app -u 501 -h /home/app app

FROM node:12.18.0-alpine
MAINTAINER Peter Lau <superpeterlau@outlook.com>
ENV SASS_BINARY_SITE https://npm.taobao.org/mirrors/node-sass/
ENV APP /app
ENV USER app
ENV USER_HOME /home/app
ENV UID 501
ENV GID 1001
WORKDIR $APP
RUN addgroup -g ${GID} ${USER} && adduser -S -G ${USER} -u ${UID} -h ${USER_HOME} ${USER}
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
    apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*
USER ${USER}