// Getting unique numbers in an array of numbers
const numbers = [1, 2, 3, 3, 2, 45, 3, 32, 23, 34, 33, 32];

function getUniqueNumbers(nums) {
  //   return nums.reduce((accumulated, currentNum) => {
  //     if (accumulated.includes(currentNum)) {
  //       // ===
  //       return accumulated;
  //     } else {
  //       return [...accumulated, currentNum];
  //     }
  //   }, []);
  const set = new Set(nums);
  return Array.from(set);
}

console.log(getUniqueNumbers(numbers));

const numbers2 = [2, 4, 45, 2, 5, 6, 32];

// return exhaustive unique items in both arrays such that we dont have duplicates
function union(nums1, nums2) {
  //   const unionNums = [...nums1, ...nums2];
  //   return getUniqueNumbers(unionNums);
  const unionSet = new Set(nums1);
  for (let item of nums2) {
    unionSet.add(item);
  }

  return Array.from(unionSet);
}

//should return common items in both the arrays.
function intersection(array1, array2) {
  // Use sets for computing result.
}

// should return only items that only exist in first array but not in second
function difference(firstArr, secondArr) {
  // use set arithmatic to figure out the difference set
}

console.log(union(numbers, numbers2));

// Set is a data structure which is a collection of unique items(no duplicates in it).
// if we try to insert same item again, it is going to be a no op.
const uniqueNumbers = new Set(numbers);
console.log(uniqueNumbers);

console.log(uniqueNumbers.has(2));
console.log(uniqueNumbers.has(200));
console.log(uniqueNumbers.add(100).add(300).add(400));
console.log(uniqueNumbers.delete(100));
console.log(uniqueNumbers.delete(100));
console.log(uniqueNumbers);

uniqueNumbers.clear();
console.log(uniqueNumbers);
