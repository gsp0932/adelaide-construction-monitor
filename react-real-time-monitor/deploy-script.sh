set -x
aws s3 rm s3://mybucket2510952/ --recursive
aws s3 sync ./build s3://mybucket2510952