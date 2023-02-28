set -x
TOTAL_SEGMENTS=50			# N , total number of segments

for SEGMENT in `seq 0 $((${TOTAL_SEGMENTS}-1))`
do
  nohup sh scan_dynamo_table.sh ${TOTAL_SEGMENTS} ${SEGMENT} &
done
