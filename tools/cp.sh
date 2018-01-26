#!/bin/bash

aws s3 cp /usr/src/app/dist/ s3://${BUCKET_NAME}/ --recursive
