'use strict';

const accountA = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const accountB = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const accountC = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const accountD = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts2 = [accountA, accountB, accountC, accountD];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// /////////////////////////////////////////////////
// // array methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// // slice method to extract parts of an array (like strings)
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));

// // create a shallow copy of any array ( no arguments)
console.log(arr.slice());
// // spread operator also works to make a copy ( use slice for multiple methods)
console.log([...arr]);

// Splice method ( mutates original array) --- use case is to delete values from original array ((first element, how many to delete))
// console.log(arr.splice(-1));
console.log(arr);
arr.splice(1, 2);
console.log(arr);
console.log(arr.splice(2));
console.log(arr);

// Reverse ( mutates original array like splice)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// Concat method (doesn't mutate original array)
const letters = arr.concat(arr2);
console.log(letters);
// could also use the spread operator same result
console.log([...arr, ...arr2]);

// // Join method (joins to create a string seperated by defined operator)
console.log(letters.join(' - '));

// // array methods also include -- push,shift, unshift, pop, indexof , includes

const arr3 = [23, 11, 64];
console.log(arr3[0]);
// AT Method (also works on strings)
console.log(arr3.at(-1));
console.log(arr3.at(1));

// Loop over a array using for each loop
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of Loop
// math method to take away the sign
//  when using the forof method .entries() use index first then current element
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// console.log(`--------FOR EACH---------`);
// // ForEach Method (better to use) = continue and break statements do NOT work in the forEach loop - creates "side effects"

// //must always be in this order - val , index , array
// movements.forEach(function (val, i, a) {
//   if (val > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${val}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(val)}`);
//   }
// });

// forEach method with maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// // must be in this order (value , key , map thats being looped over)

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// // forEach with a set - first 2 parameters are the same (value = key)
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR', 'EUR']);

console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${_}: ${value}`);
});

// convention to use underscore in JavaScript as a throw away character.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// _______________________________________________________________
// coding challenge one
const dogsJulia = [9, 16, 6, 8, 3];
const dogsKate = [10, 5, 6, 1, 4];

// my solution
const checkDogs = function (arr, arr2) {
  const dogs = arr.slice(1, 3).concat(arr2);
  console.log(dogs);
  dogs.forEach(function (val, i) {
    const type = val < 3 ? `puppy` : 'adult';
    if (val < 3) {
      console.log(`Dog number ${i + 1} is still a ${type} 🐶`);
    } else {
      console.log(`Dog number ${i + 1} is an ${type}, and is ${val} years old`);
    }
  });
};
checkDogs(dogsJulia, dogsKate);

// his method (same result)

const checkDogs2 = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs2([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Coding challenge 2 - commented out so challenge 3 works
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   return average;
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// Coding Challenge 3
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// coding challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];


// 1
dogs.forEach((dog => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

console.log(dogs);

// 2.
const dogSarah = dogs.find((dog => dog.owners.includes('Sarah')))
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${ dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`);



// 3
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog =>dog.owners);

console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch[0]}, ${ownersEatTooMuch[1]} and ${ownersEatTooMuch[2]}'s dogs eat too much! ${ownersEatTooLittle[0]}, ${ownersEatTooLittle[1]} and ${ownersEatTooLittle[2]}'s dogs eat to little!`);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat to much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat to little!`)


// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
console.log(dogs.some(dog=> dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.10 ));


const dogCheck = dog=> dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.10

console.log(dogs.some(dogCheck));

// 7.
console.log(dogs.filter(dogCheck));

// 8.
const dogsCopy = dogs.slice().sort((a,b)=> a.recFood - b.recFood);
console.log(dogsCopy);


//_________________________________________________________________

// // Data transformations - map(), filter(), reduce()

// // map - returns a new array containing the results of applying an operation on all original array elements

// // filter - returns a new array containing the array elements that passed a specified test condition

// // reduce - boils ( reduces) all array elements down to one single value

// // Map method

const euroToUsd = 1.1;

// // const movementsUsd = movements.map(function(val){
// //   return val * euroToUsd;
// // });

// easier way - arrow function

const movementsUsd = movements.map(val => val * euroToUsd);

console.log(movementsUsd);

// filter method
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

// forOf method same result
const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

// filter method to extract the withdrawals
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// the Reduce method
// acc = accumulator -> snowball effect through the array
// (accumulator , value, index, array)
const balance = movements.reduce(function (acc, val, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + val;
}, 0);
// 0 at the end is the initial starting value
console.log(balance);

// forOf loop same result
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// arrow function same result
const balance3 = movements.reduce((acc, val) => acc + val, 0);
console.log(balance3);

// maximum value
const max = movements.reduce(function (acc, val) {
  if (acc > val) {
    return acc;
  } else return val;
}, movements[0]);

console.log(max);

// one line arrow notation using reduce method to calculate max val
const max2 = movements.reduce((acc, val) => Math.max(acc, val));
console.log(max2);

// the find Method

const firstWithdrawal = movements.find(val => val < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts2);
const account = accounts2.find(val => val.owner === 'Jessica Davis');
console.log(account);

// forOf method same result (sort of)
const accountJD = [];
for (const val of accounts2)
  if (val.owner === 'Jessica Davis') accountJD.push(val);
console.log(accountJD);

// Some method

console.log(movements);
// used for finding conditions
const anyDeposits = movements.some(value => value > 0);
console.log(anyDeposits);

// includes method - used to find equality
console.log(movements.includes(-130));
// console.log(movements.some(value => value === -130)); - some method to produce the same result.

// Every Method - only if all elements are true it will log true
console.log(movements.every(value => value > 0));
// console.log(account4.movements.every(value => value > 0));

// The Flat / map and flatMap methods

const array = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(array.flat());

const arrayDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrayDeep.flat());

// flat;
// const overallBalance = accounts
//   .map(value => value.movements)
//   .flat()
//   .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
// console.log(overallBalance);

// flatmap;
// const overallBalance2 = accounts
//   .flatMap(value => value.movements)
//   .reduce(((previousValue, currentValue) => previousValue + currentValue, 0));
// console.log(overallBalance2);

// Sorting arrays

// strings
const owners = ['Jonas', 'Zach', ' Adam', 'Martha'];
console.log(owners.sort());
// mutates the original array so be careful
console.log(owners);

// numbers -changes into string so wont work the same
console.log(movements);

// return > 0  - A, B ( keep order)
// return < 0  - B, A (switch order)

// Ascending order
// movements.sort((a,b) => {
//   if(a>b) return 1;
//   if(a<b)return -1
// });
movements.sort((a, b) => a - b);
console.log(movements);

// movements.sort((a,b)=>{
//   if(a>b) return -1;
//   if(a<b) return 1;
// });

movements.sort((a, b) => b - a);
console.log(movements);

// more ways of creating and Filling Arrays

const arr4 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// passing just one argument , creates an empty array the length of the argument eg . (7) creates and empty array thats holds 7 places
const x = new Array(7);
console.log(x);

// fill method lets you mutate the original array and fill its empty spaces with one specific value eg x.fill(1);
// also lets you define a start parameter and end parameter
x.fill(1, 3, 5);
console.log(x);

//  can also be applied to any array
arr4.fill(44, 1, 6);
console.log(arr4);

// from method

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// underscore throw away variable - use callback function like map method
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// 100 random dice rolls

const a = Array.from(
  { length: 100 },
  (val, i) => Math.floor(Math.random() * 6) + 1
);
console.log(a);

// iterables ( strings, maps, sets, arrays, typedArrays) can be turned into arrays with array.from

// converting a node list into an Array to get access to the array methods( map/ reduce/ etc) - check application event handles.
