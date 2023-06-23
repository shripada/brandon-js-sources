// Get the frequency of letters in a supplied string
function getFrequency(string) {
  /*
        {
            'a': 1,
            'w': 2,
        }
    */
  const frequency = new Map(); //{};

  for (let c of string) {
    if (/[a-z]/i.test(c)) {
      // we count only alphabets
      const smallC = c.toLowerCase();
      if (frequency.has(smallC)) {
        //frequency[smallC]++;
        const value = frequency.get(smallC);
        frequency.set(smallC, value + 1);
      } else {
        //frequency[smallC] = 1;  //Symbol instances can also be keys of an object other string in js.
        frequency.set(smallC, 1);
      }
    }
  }

  // We have used object to store our key value pairs.
  // but objects have much more additional behaviors and properties too and thus
  // are a overhead when we just want to use them as simple key value pairs.
  // We also have a limitation where keys must be either strings or Symbol type.
  // There is a better alternative and that is Map.
  return frequency;
}

console.log(getFrequency('Hello world, that is interesting problem'));

const student1 = { name: 'Ram', score: 10 };
const student2 = { name: 'Jan', score: 10 };

const gradeMap = new Map();

gradeMap.set(student1, 100);
gradeMap.set(student2, 200);

console.log(gradeMap);
