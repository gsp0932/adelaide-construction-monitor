set -x

TOTAL_SEGMENT=$1
SEGMENT_NUMBER=$2
SCAN_OUTPUT="scan-output-segment${SEGMENT_NUMBER}.json"
SCAN_AGGREGATE="scan-agg-segment${SEGMENT_NUMBER}.json"

aws dynamodb scan\
  --table-name construction_data\
  --filter-expression "sample_time > :base"\
  --expression-attribute-values '{":base":{"N":"0"}}'\
  --projection-expression "sample_time"\
  --max-items 1000\
  --total-segments "${TOTAL_SEGMENT}"\
  --segment "${SEGMENT_NUMBER}" > ${SCAN_OUTPUT}

NEXT_TOKEN="$(cat ${SCAN_OUTPUT} | jq '.NextToken')"
cat ${SCAN_OUTPUT} | jq -r ".Items[] | tojson" > ${SCAN_AGGREGATE}

while [ ! -z "$NEXT_TOKEN "] && [ ! "$NEXT_TOKEN" == null ]
do

  aws dynamodb scan\
    --table-name construction_data\
    --expression-attribute-values '{":base":{"N":"0"}}'\
    --projection-expression "sample_time"\
    --max-items 1000\
    --total-segments "${TOTAL_SEGMENT}"\
    --segment "${SEGMENT_NUMBER}"\
    --starting-token "${NEXT_TOKEN}" > ${SCAN_OUTPUT}

NEXT_TOKEN="$(cat ${SCAN_OUTPUT} | jq '.NextToken')"
cat ${SCAN_OUTPUT} | jq -r ".Items[] | tojson" > ${SCAN_AGGREGATE}

done
