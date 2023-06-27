// without any args, will mean current time, in current timezone\.
const assert = require('assert');

const today = new Date();
console.log(today); //2023-06-26T05:28:30.276Z

let aDay = new Date('2023-06-26T11:06:00.000+05:30');
console.log(aDay);

// use year, month, and day - month is zero based indexing
// 2023-06-26
aDay = new Date(2023, 05, 26); // 2023-06-26T00:00:00.000+5:30
console.log(aDay); // toString() return date in UTC

//with  all possible values to the constructor
aDay = new Date(2023, 05, 26, 11, 28, 30, 100); // Time zone is always the local timezone where code is running.
console.log(aDay.toString());
console.log(aDay.toISOString()); // Observation is console.log uses aDay.toISOString's output.

aDay = new Date(628021800000); // epoch time stamp is in millisecs from the midnight of 1970 Jan, in local zone
console.log(aDay); //ISO
console.log(aDay.toString());
// Lets get the day of month, year, day of week in local timezone
console.log(aDay.getFullYear());
console.log(aDay.getDate());
console.log(aDay.getDay());

console.log(aDay.getTime()); // epoch timestamp in local timezone

// There is another version of above APIs. that return you day, month, in UTC.
console.log(aDay.getUTCDate()); // 25
console.log(aDay.getUTCDay()); // 6
console.log(aDay.toISOString());

// now always returns millisecs in local timezone.
const start = Date.now();
console.log(start);
const now = new Date(start);
console.log(now.toString());
console.log(now);

function getToday() {
  return new Date();
}

const milliSecsInDay = 24 * 60 * 60 * 1000;

function yesterday() {
  const td = getToday();
  const todayMilliSecs = td.getTime();

  const yesterday = new Date(todayMilliSecs - milliSecsInDay);
  return yesterday;
}

// Comparing dates
const td = getToday();
const yd = yesterday();

if (td > yd) {
  console.log('today is bigger than yesterday');
}

const firstDay = new Date(2023, 05, 26);
const secondDay = new Date(2023, 05, 26);

if (firstDay == secondDay) {
  console.log('both are equal');
}
console.log(firstDay.getTime());
console.log(secondDay.getTime());
console.log(secondDay.valueOf());
console.log(firstDay.valueOf());

function yearMonthDay(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
}
/**
 * This function will format the given date such that
 * if it represents today, then it will return 'today'
 * if it represents yday, then it will say yesterday
 * if it is n days ago, it will print like so '3 days ago'.
 * if it is tomorrow, it will say 'tomorrow'
 * or 'n days from now'
 * @param {Date} date
 * @returns the formatted string representation of the date.
 */
function formatDate(date) {
  // First get today, and extract year, month, day from it as well as the date passed
  const today = new Date();
  const { year, month, day } = yearMonthDay(today);
  const {
    year: yearOther,
    month: monthOther,
    day: dayOther,
  } = yearMonthDay(date);

  // if year, month, day match, then it is today
  if (year === yearOther && month === monthOther && day === dayOther) {
    return 'today';
  }

  // we should ensure both dates are in either local timezone or in UTC
  const otherDate = new Date(date);
  const today1 = new Date(today);

  otherDate.setHours(0, 0, 0, 0);
  today1.setHours(0, 0, 0, 0);
  const differenceInDays =
    (today1.getTime() - otherDate.getTime()) / milliSecsInDay;
  if (differenceInDays === 1) {
    return 'yesterday';
  } else {
    return `${differenceInDays} days ago`;
  }
}
assert.equal(formatDate(getToday()), 'today');
const now1 = new Date();
const yesterday1 = new Date(
  now1.getFullYear(),
  now1.getMonth(),
  now1.getDate() - 1
);
assert.equal(formatDate(yesterday1), 'yesterday');

const dayBeforeYesterday = new Date(
  now1.getFullYear(),
  now1.getMonth(),
  now1.getDate() - 2
);

assert.equal(formatDate(dayBeforeYesterday), '2 days ago');
