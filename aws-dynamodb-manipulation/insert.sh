aws dynamodb put-item \
    --table-name user_data  \
    --item \
        '{
					"username": {"S": "testusername"}, 
					"email": {"S": "testusername@gmail.com"},
					"phone": {"S": "0401617079"},
					"password": {"S": "123456"}
				}'