#!/bin/bash

aws cloudformation create-stack \
--stack-name ${STACK_NAME} \
--template-body file:///usr/src/app/tools/cf.yml \
--parameters ParameterKey=S3Bucket,ParameterValue=${BUCKET_NAME}
