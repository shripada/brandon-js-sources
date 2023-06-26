// without any args, will mean current time, in current timezone\.
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
