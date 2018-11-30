#!/bin/bash

if [[ "$1" != "" ]]; then
    S3BUCKETNAME="$1"
else
    echo ERROR: Failed to supply S3 bucket name
    exit 1
fi

for old in dist/*.gz; do mv $old ${old%%.gz*}; done
aws s3 sync dist/ s3://${S3BUCKETNAME} --metadata-directive REPLACE --cache-control max-age=31536000,public --acl public-read --exclude "index.html" --exclude "*.css" --exclude "*.js" || { echo 'ERROR: s3 sync failed' ; exit 1; }
aws s3 sync dist/ s3://${S3BUCKETNAME} --metadata-directive REPLACE --cache-control max-age=31536000,public --acl public-read --exclude "*" --include "*.css" --include "*.js" --content-encoding gzip || { echo 'ERROR: s3 js/css sync failed' ; exit 1; }
aws s3 cp dist/index.html s3://${S3BUCKETNAME}/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read --content-encoding gzip || { echo 'ERROR: s3 cp index failed' ; exit 1; }
