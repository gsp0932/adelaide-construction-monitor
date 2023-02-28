set -x
SEGMENT_NUMBER=$1
SCAN_AGGREGATE="scan-agg-segment${SEGMENT_NUMBER}.json"
SEGMENT_FILE="delete-segment${SEGMENT_NUMBER}.json"
MAX_ITEMS=25      # maximum number of items batch-write-item accepts

#printf "starting segment - ${SEGMENT_NUMBER} \n" > ${SEGMENT_FILE}

until [[ ! -s ${SEGMENT_FILE} ]] ;
do 
  
  awk "NR>${CNT:=0} && NR<=$((CNT+MAX_ITEMS))" ${SCAN_AGGREGATE}\
    | awk '{ print "{\"DeleteRequest\": {\"Key\":" $0 "}}," }'\
    | sed '$s/.$//'\
    | sed '1 i { "construction_data": ['\
    | sed '$ a ] }' > ${SEGMENT_FILE}
  
  aws dynamodb batch-write-item --request-items file://${SEGMENT_FILE}

  CNT=$((CNT+MAX_ITEMS))

done
