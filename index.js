import { createId } from '@paralleldrive/cuid2';

let direction = "north";

if(direction === 'north'){
    console.log("Heading north towards himalaya")
}


// We want to print the day of week provided the day index is given
let dayIndex = 5; // "monday"
if(dayIndex === 0){ // strict equality, == 
    console.log("Monday");
}
else if(dayIndex === 2){
   console.log("Tuesday")
}
else if(dayIndex === 3){
   console.log("Wednesday")
}
else if(dayIndex === 4){ 
   console.log("Thursday")
}
else if(dayIndex === 5){
   console.log("Friday")
}
else if(dayIndex === 6){
   console.log("Saturday")
} 
else if(dayIndex === 7){
   console.log("Sunday")
}  else {
    console.log("On earth this day is not found!")
}


// Requirement to generate unique ids so that they are unique in universe!

console.log("UniqueID:", createId());