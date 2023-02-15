set -x

# npm run build

# sudo ntpdate pool.ntp.org

aws s3 rm s3://mybucket2510952/ --recursive
aws s3 sync ./build s3://mybucket2510952