set -x

file="authentication.zip"
if [ -f "$file" ] ; then
	sudo rm  "$file"
fi

zip -r authentication.zip node_modules src app.js package-lock.json package.json

aws lambda update-function-code\
	--function-name authentication\
	--zip-file fileb://authentication.zip

# aws dynamodb query \
#     --table-name user_credentials \
# 		--index-name username-index \
#     --key-condition-expression "username = :v1" \
#     --expression-attribute-values '{":v1": {"S": "Sarah"}}'