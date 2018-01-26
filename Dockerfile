FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

# To configure AWS CLI setup environment variables:
# AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION
RUN apt-get update
RUN apt-get -y install python-setuptools python-dev build-essential python-pip
RUN pip install --upgrade pip
RUN pip install awscli --upgrade --user

ENV PATH=~/.local/bin:$PATH

RUN npm install -g yarn

EXPOSE 3000
