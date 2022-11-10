aws dynamodb query \
	--table-name construction_data\
	--key-condition-expression "device_id = :id AND sample_time BETWEEN :f AND :t" \
	--expression-attribute-values '{":id":{"S":"demo-01"},":f":{"N":"1668060174"},":t":{"N":"1668060365"}}'