import * as dayjs from "dayjs";

export function getUnixTimestamp() {
  let end = dayjs().startOf('day').unix()
  let start = dayjs().subtract(1, 'day').startOf('day').unix()
  return {start, end}
}

export function getCurrentHour(){
  return dayjs().hour()
}
