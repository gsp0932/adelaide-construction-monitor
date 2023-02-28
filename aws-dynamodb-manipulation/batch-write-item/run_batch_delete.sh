set -x
TOTAL_SEGMENTS=50

for SEGMENT in `seq 0 $((${TOTAL_SEGMENTS}-1))`
do
  nohup sh batch_write_item_delete.sh ${SEGMENT} &
done
