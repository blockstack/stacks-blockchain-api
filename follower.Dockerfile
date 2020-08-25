FROM node:13.14.0-buster as build
WORKDIR /app
COPY . .
RUN echo "GIT_TAG=$(git tag --points-at HEAD)" >> .env
RUN npm install
RUN npm run build
RUN npm prune --production

### Fetch stacks-node binary
FROM everpeace/curl-jq as stacks-node-build
ENV ARTIFACTS "http://blockstack-stacks-blockchain_artifacts.storage.googleapis.com/index.json"
RUN curl -s "$ARTIFACTS" --output ./artifacts-resp.json \
  && cat ./artifacts-resp.json | jq -r '."stacks-node"."linux-x64-test".latest.url' > ./url \
  && mkdir -p /app \
  && echo "Fetching $(cat ./url)" \
  && curl --compressed $(cat ./url) --output /stacks-node \
  && chmod +x /stacks-node

FROM ubuntu:focal

SHELL ["/bin/bash", "-c"]

RUN apt-get update

### Install utils
RUN apt-get install -y sudo curl

### Set noninteractive apt-get
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

## apt-get clear cache
# RUN apt-get clean && rm -rf /var/cache/apt/* /var/lib/apt/lists/* /tmp/*

### stacky user ###
# '-l': see https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
RUN useradd -l -u 33333 -G sudo -md /home/stacky -s /bin/bash -p stacky stacky \
    # passwordless sudo for users in the 'sudo' group
    && sed -i.bkp -e 's/%sudo\s\+ALL=(ALL\(:ALL\)\?)\s\+ALL/%sudo ALL=NOPASSWD:ALL/g' /etc/sudoers
ENV HOME=/home/stacky
WORKDIR $HOME

### stacky user (2) ###
USER stacky
RUN sudo chown -R stacky:stacky $HOME
# use sudo so that user does not get sudo usage info on (the first) login
RUN sudo echo "Running 'sudo' for stacky: success" && \
  # create .bashrc.d folder and source it in the bashrc
  mkdir /home/stacky/.bashrc.d
  # && \
  # (echo; echo "for i in \$(ls \$HOME/.bashrc.d/*); do source \$i; done"; echo) >> /home/stacky/.bashrc

### Node.js
ENV NODE_VERSION=13.14.0
RUN curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash \
    && bash -c ". .nvm/nvm.sh \
        && nvm install $NODE_VERSION \
        && nvm alias default $NODE_VERSION"
ENV PATH=$PATH:/home/stacky/.nvm/versions/node/v${NODE_VERSION}/bin
RUN node -e 'console.log("Node.js runs")'

### Setup stacks-node
COPY --from=stacks-node-build /stacks-node stacks-node/
ENV PATH="$PATH:$HOME/stacks-node"

### Setup stacks-blockchain-api
COPY --from=build /app stacks-blockchain-api
RUN sudo chown -Rh stacky:stacky stacks-blockchain-api
RUN printf '#!/bin/bash\ncd $(dirname $0)\nnpm run start\n' > stacks-blockchain-api/stacks_api \
  && chmod +x stacks-blockchain-api/stacks_api
ENV PATH="$PATH:$HOME/stacks-blockchain-api"
EXPOSE 3999

### Install Postgres
RUN sudo apt-get install -y postgresql-12 postgresql-contrib-12

### Setup Postgres
# Borrowed from https://github.com/gitpod-io/workspace-images/blob/master/postgres/Dockerfile
ENV PATH="$PATH:/usr/lib/postgresql/12/bin"
ENV PGDATA="/home/stacky/.pgsql/data"
RUN mkdir -p ~/.pg_ctl/bin ~/.pg_ctl/sockets \
  && printf '#!/bin/bash\n[ ! -d $PGDATA ] && mkdir -p $PGDATA && initdb -D $PGDATA\npg_ctl -D $PGDATA -l ~/.pg_ctl/log -o "-k ~/.pg_ctl/sockets" start\n' > ~/.pg_ctl/bin/pg_start \
  && printf '#!/bin/bash\npg_ctl -D $PGDATA -l ~/.pg_ctl/log -o "-k ~/.pg_ctl/sockets" stop\n' > ~/.pg_ctl/bin/pg_stop \
  && chmod +x ~/.pg_ctl/bin/*
ENV PATH="$PATH:$HOME/.pg_ctl/bin"
ENV DATABASE_URL="postgresql://stacky@localhost"
ENV PGHOSTADDR="127.0.0.1"
ENV PGDATABASE="postgres"


### Setup service env vars
ENV PG_HOST=127.0.0.1
ENV PG_PORT=5432
ENV PG_USER=stacky
ENV PG_PASSWORD=postgres
ENV PG_DATABASE=postgres

ENV STACKS_CORE_EVENT_PORT=3700
ENV STACKS_CORE_EVENT_HOST=127.0.0.1

ENV STACKS_BLOCKCHAIN_API_PORT=3999
ENV STACKS_BLOCKCHAIN_API_HOST=127.0.0.1

ENV STACKS_CORE_RPC_HOST=127.0.0.1
ENV STACKS_CORE_RPC_PORT=20443


RUN printf '#!/bin/bash\n\
tail --retry -F stacks-api.log stacks-node.log 2>&1 &\n\
while true\n\
do\n\
  pg_start\n\
  stacks_api &> stacks-api.log &\n\
  stacks_api_pid=$!\n\
  stacks-node argon &> stacks-node.log &\n\
  stacks_node_pid=$!\n\
  wait $stacks_node_pid\n\
  echo "node exit, restarting..."\n\
  kill -9 $stacks_api_pid\n\
  pg_stop\n\
  rm -rf $PGDATA\n\
  sleep 5\n\
done\n\
' >> run.sh && chmod +x run.sh

CMD ["/home/stacky/run.sh"]
