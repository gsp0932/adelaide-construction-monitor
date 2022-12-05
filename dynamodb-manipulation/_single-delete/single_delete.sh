set -x
# until [[ ! -s SCAN_OUTPUT.json ]] ;
# do
  aws dynamodb scan\
    --table-name construction_data\
    --filter-expression "device_id = :base"\
    --expression-attribute-values '{":base":{"S":"demo-01"}}'\
    --projection-expression "device_id, sample_time"\
    --max-items 1\
    | jq -r '.Items[0]' > SCAN_OUTPUT.json
    
  aws dynamodb delete-item\
    --table-name construction_data\
    --key file://SCAN_OUTPUT.json
    
# done