'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2022-01-17T14:11:59.604Z',
    '2022-01-20T17:01:17.194Z',
    '2022-01-22T23:36:17.929Z',
    '2022-01-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
// LEC 16)
// 1.
const startLogOutTimer = function () {
  // 3.
  // There is always this 1s delay after the app loads and the start of the timer. And also between logins. So let's export the timer callback into its own function, and run it right away
  const tick = function () {
    let minutes = String(parseInt(time / 60, 10)).padStart(2, '0');
    let seconds = String(parseInt(time % 60, 10)).padStart(2, '0');
    // console.log(minutes, seconds);

    // Displaying time in element and clock
    labelTimer.textContent = `${minutes}:${seconds}`;

    // Finish timer
    if (time === 0) {
      // We need to finish the timer, otherwise it will run forever
      clearInterval(timer);

      // We log out the user, which means to fade out the app
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }

    // Subtract 1 second from time for the next iteration
    time--;
  };

  // Setting time to 5 minutes in seconds
  let time = 5 * 60;
  // let time = 10;

  tick();
  const timer = setInterval(tick, 1000);

  // LATER
  return timer;
};

const printWelcome = function (name) {
  const now = new Date();
  const greetings = new Map([
    [[6, 7, 8, 9, 10], 'Good Morning'],
    [[11, 12, 13, 14], 'Good Day'],
    [[15, 16, 17, 18], 'Good Afternoon'],
    [[19, 20, 21, 22], 'Good Evening'],
    [[23, 0, 1, 2, 3, 4, 5], 'Good Night'],
  ]);

  const arr = [...greetings.keys()].find(key => key.includes(now.getHours()));
  const greet = greetings.get(arr);
  labelWelcome.textContent = `${greet}, ${name}!`;
};

// LEC 9)
// 2.
const formatMovementDate = function (date, locale) {
  // LEC 12) add locale
  const calcDaysPassed = (date1, date2) =>
    Math.round((date1 - date2) / (60 * 60 * 24 * 1000));
  const now = new Date();
  const daysPassed = calcDaysPassed(now, date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// LEC 8)
// const printMovements = function(movements) {
const printMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const mov = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  mov.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // LEC 8)
    let printDate = '';
    if (account.movementsDates) {
      const date = new Date(account.movementsDates[i]);

      // LEC 9)
      printDate = formatMovementDate(date, account.locale);
      // const day = `${date.getDate()}`.padStart(2, '0');
      // // Remember that MONTHS are 0-based!
      // const month = `${date.getMonth() + 1}`.padStart(2, '0');
      // const year = date.getFullYear();
      // printDate = `${day}/${month}/${year}`;
    }

    // LEC 14)
    // Now we can finally use the user's locale and account currency!
    // const formattedMov = new Intl.NumberFormat(account.locale, {
    //   style: 'currency',
    //   currency: account.currency,
    //   // currency: 'USD',
    // }).format(mov);
    const formattedMov = formatCur(mov, account.locale, account.currency);

    // LEC 4) + 14)
    // <div class="movements__value">${mov.toFixed(2)}€</div>
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${printDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// printMovements(account1.movements);
printMovements(account1);

const createUsernames = function (accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// LEC 14)
// const calcPrintBalance = function(movements) {
const calcPrintBalance = function (account) {
  const balance = account.movements.reduce((accum, cur) => accum + cur, 0);
  currentAccount.balance = balance;

  // LEC 4)
  // labelBalance.textContent = `${balance}€`;
  // labelBalance.textContent = `${balance.toFixed(2)}€`;

  // LEC 14)
  labelBalance.textContent = formatCur(
    balance,
    account.locale,
    account.currency,
  );
};

const calcPrintSummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  // LEC 4) The .20 looks a lot nicer that the .2 we had before
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  // LEC 14)
  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  // LEC 4)
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  // LEC 14)
  labelSumOut.textContent = formatCur(
    Math.abs(out),
    account.locale,
    account.currency,
  );

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (currentAccount.interestRate / 100))
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0);
  // LEC 4)
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;

  // LEC 14)
  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency,
  );
};

//////////////////////////////////////////////////////////////////
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );

  if (currentAccount && currentAccount.pin === +inputLoginPin.value) {
    console.log(currentAccount);

    // Reset input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Log in!
    containerApp.style.opacity = 100;

    // LEC 16)
    // 2.
    // If there is already a timer, then cancel it!
    if (timer) clearInterval(timer);

    // 1.
    // Start 5 minutes timer to log out user automatically)
    timer = startLogOutTimer();

    // 2.

    // Print welcome message
    // LEC 10)
    // labelWelcome.textContent = `Welcome back, ${
    //   currentAccount.owner.split(' ')[0]
    // }!`;
    printWelcome(`${currentAccount.owner.split(' ')[0]}`);

    // LEC 12)
    // 1.
    // Set current date and time!
    const now = new Date();
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options,
    ).format(now);

    // Test with JD first, then with JS

    // Print movements
    // LEC 8)
    printMovements(currentAccount);

    // LEC 14)
    // Print balance
    calcPrintBalance(currentAccount);

    // Print summary
    calcPrintSummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = +inputTransferAmount.value;

  if (
    receiver &&
    amount &&
    currentAccount.balance >= amount &&
    receiver.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);

    // LEC 8)
    // 3.
    currentAccount.movementsDates.push(new Date());
    receiver.movementsDates.push(new Date());

    // LEC 8)
    printMovements(currentAccount);

    // LEC 14)
    calcPrintBalance(currentAccount);
    calcPrintSummary(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (currentAccount.movements.some(mov => mov >= amount / 10) && amount > 0) {
    currentAccount.movements.push(amount);

    // LEC 8)
    // 3.
    currentAccount.movementsDates.push(new Date());

    // LEC 15)
    // 5.
    setTimeout(() => {
      // LEC 8)
      printMovements(currentAccount);

      // LEC 14)
      calcPrintBalance(currentAccount);
      calcPrintSummary(currentAccount);
    }, 2500);

    // LEC 16)
    // 4.
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function () {
  printMovements(currentAccount, !sorted);

  // if (!sorted) {
  //   printMovements(currentAccount.movements.slice().sort((a, b) => a - b));
  // } else {
  //   printMovements(currentAccount);
  // }
  sorted = !sorted;
});

// let sorted = false;
// btnSort.addEventListener('click', function () {
//   if (!sorted) {
//     // We need to create a copy, otherwise the original array will be mutated, and we don't want that
//     printMovements(currentAccount.movements.slice().sort((a, b) => a - b));
//     // Here, for example, I'm using slice and not ... because I'm in the middle of a chain here, and so it's more useful to just keep chaining
//   } else {
//     printMovements(currentAccount.movements);
//   }
//   // We need to flip sorted, so that in the next click, the opposite happens
//   sorted = !sorted;
// });
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(23 === 23.0);

// // Base 10 - 0 to 9 - 1/10 = 0.1 3/10 = 3.333333333333
// // Binary = base 2 - 0 and 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Conversion
// console.log(Number('23'));
// console.log(+'23');

// // Parsing - (accepts second argument called the radix - eg base 10)
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseFloat('e23', 10));

// console.log(Number.parseInt(' 2.5rem '));
// console.log(Number.parseFloat(' 2.5rem '));

// // check to see if a value not a number
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20'));
// console.log(Number.isNaN(20 / 0));

// // check to see if a value IS a number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20'));
// console.log(Number.isFinite(20 / 0));

// // check if a value is an integer
// console.log(Number.isInteger(20));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger('20'));
// console.log(Number.isInteger(+'20'));
// console.log(Number.isInteger(20 / 0));

// // Math method on Numbers
// console.log(Math.sqrt(25));
// // how to work out square root without math.sqrt
// console.log(25 ** (1 / 2));
// // how to work out the cubed root
// console.log(8 ** (1 / 3));

// // work out the max number
// console.log(Math.max(5, 18, 23, 11, 2));
// // type coercion occurs with strings
// console.log(Math.max(5, 18, '23', 11, 2));
// // doesn't work with  numbers and strings as one value
// console.log(Math.max(5, 18, '23px', 11, 2));

// // work out the min number
// console.log(Math.min(5, 18, 23, 11, 2));

// // calculate the radius of a circle with 10 pixels
// // Pi * the radius squared
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// // create random dice roll between 1 and 6
// console.log(Math.floor(Math.random() * 6) + 1);

// // use above formula to generate two random integers between 2 values
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// // 0...1 -> 0...(max-min) -> min...max

// // calculate a random number between 10 and 20
// console.log(randomInt(10, 20));
// console.log(randomInt(0, 6));

// // Rounding Integers
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor(23.9));

// console.log(Math.trunc(23.3));

// // floor better to use rounds both ways - and +
// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));

// // Rounding decimals
// // toFixed converts to string , need to convert back to number with + at front
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2));

// // Remainder operator
// // 5/2 = 2 remainder 1
// console.log(5 % 2);
// console.log(5 / 2); //5 = 2 * 2 + 1

// console.log(8 % 3);
// console.log(8 / 3); // 8 = 2 * 3 + 2

// // used to check if numbers are even or odd
// console.log(6 % 2);
// console.log(6 / 2);

// console.log(7 % 2);
// console.log(7 / 2);

// const isEven = num => num % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0,2,4,6
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0,3,6,9
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

// // numeric separator ( underscore _) used to separate big numbers to and make it easier for other developers to read

// const diameter = 287460000000;
// console.log(diameter);

// const diameter2 = 287_460_000_000;
// console.log(diameter2);

// // doesn't work with strings
// console.log(Number('230_000'));

// // bigInt - used to store larger numbers then Max_Safe_integer

// console.log(Number.MAX_SAFE_INTEGER);

// // use n after big number to use begInt
// console.log(4838430248342043823408394839483204n);
// console.log(BigInt(4838430248342043));

// // operations - still work the same except Math. - cant mix bigInt numbers with regular numbers

// console.log(1000n + 1000n);

// const huge = 20289830237283728378237n;
// const num = 23;
// // console.log(huge * num);// doesn't work
// console.log(huge * BigInt(num)); // now it works - doesn't work with comparison operator(===) and strings(concat)

// console.log(20n > 15);
// console.log(20n === 20);
// console.log(20n == '20');

// // division - cuts of the decimal part
// console.log(10n / 3n);
// console.log(10 / 3);

// // Creating Dates

// // create a date - 4 ways
// const now = new Date();
// console.log(now);

// // can pass a string
// console.log(new Date('Tue Jan 25 2022 16:46:29'));
// console.log(new Date('December 24, 2021,'));
// console.log(new Date(account1.movementsDates[0]));

// // can log (year, month ( 0 based), day, hour, minute,seconds)
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// // uses auto correct - changes to next day
// console.log(new Date(2037, 10, 31));
// // also takes in milliseconds from the starting date - jan 1 1970
// console.log(new Date(0));
// // how to break down into milliseconds - eg 3 milliseconds
// // 3 milliseconds times hours in day times minute in hour times seconds in minutes times 1000 milliseconds in a second
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// // working with dates - methods
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()); //always use getFullYear not getYear
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay()); //day of the week
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString()); // follows int standard
// console.log(future.getTime()); //milliseconds since jan 1 1970 -use result to get date and time
// console.log(new Date(2142249780000));

// // get current timestamp
// console.log(Date.now());
// // manipulate Date data
// future.setFullYear(2040); //all the above method available to set date
// console.log(future);

// // OPerations with dates
// // calculate how many days apart

// const CalcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); //divide by ( 1000 * 60 *60 *24) to get days - use Math.abs so that it doesn' t matter give us a minus

// console.log(CalcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4)));

// // if you need really precise calculations - eg time changes due to day light saving changes use date library like moments.js

// // Intl numbers
// const num2 = 3884764.23;

// const options = {
//   style: 'currency', //percent/currency
//   // unit: 'kilometer-per-hour',
//   unit: 'mile-per-hour',
//   currency: 'ZAR',
//   // useGrouping:true,
// };

// console.log(`US:    `, new Intl.NumberFormat('en-za', options).format(num2));
// console.log(
//   `German:    `,
//   new Intl.NumberFormat('de-DE', options).format(num2)
// );
// console.log(
//   `South Africa:    `,
//   new Intl.NumberFormat('en-za', options).format(num2)
// );
// console.log(
//   `Navigator:    `,
//   new Intl.NumberFormat(navigator.language, options).format(num2)
// );

// // timers

// // using timer to make message appear 5 seconds later
// // setTimeout(() => console.log('Here is your pizza 🍕'), 5000);

// // creating a timer that takes in arguments in the callback function - use spread operator to access array - setTimeout(arguments),time delay , arg1, arg2,etc.
// const ingredients = ['olives', 'spinach'];

// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   ...ingredients
// );

// console.log('waiting...');

// if (ingredients.includes('olives')) clearInterval(pizzaTimer);

// // how to make a clock
// // setInterval(() => {
// //   const date = new Date();
// //   const options = {
// //     hour:'numeric',
// //     minute: 'numeric',
// //     second:'numeric',

// //   };
// //   console.log(new Intl.DateTimeFormat('en-za',options).format(date));

// // },1000);
