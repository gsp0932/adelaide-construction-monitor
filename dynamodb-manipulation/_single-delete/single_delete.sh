until [[ ! -s SCAN_OUTPUT.json ]] ;
do
  aws dynamodb scan\
    --table-name construction_data\
    --filter-expression "sample_time > :base"\
    --expression-attribute-values '{":base":{"N":"0"}}'\
    --projection-expression "sample_time"\
    --max-items 1\
    | jq -r '.Items[0]' > SCAN_OUTPUT.json
    
  aws dynamodb delete-item\
    --table-name construction_data\
    --key file://SCAN_OUTPUT.json
    
done