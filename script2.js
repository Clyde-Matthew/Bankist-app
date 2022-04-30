'use strict';

// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// Functions

const calcDisplayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ' ';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (account, value) => account + value,
    0
  );
  labelBalance.textContent = `${account.balance}€`;
};

const displaySummary = function (account) {
  const income = account.movements
    .filter(value => value > 0)
    .reduce((account, value) => account + value, 0);
  labelSumIn.textContent = `${income}€`;

  const out = account.movements
    .filter(value => value < 0)
    .reduce((account, value) => account + value, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(value => value > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((element, filter, array) => {
      return element >= 1;
    })
    .reduce(
      (previousValue, currentValue, index, array) =>
        previousValue + currentValue,
      0
    );
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// computing usernames

const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    return username;
  });
};

const user = `Steven Thomas Williams`;
const username = user
  .toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('');

// console.log(username);
createUsername(accounts);

const updateUI = function (account) {
  calcDisplayMovements(account.movements);
  calcDisplayBalance(account);
  displaySummary(account);
};

// Event Handlers

let currentAccount;

btnLogin.addEventListener('click', function (event) {
  // prevent form from submitting
  event.preventDefault();
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // // Display movements
    // calcDisplayMovements(currentAccount.movements);
    // // Display balance
    // calcDisplayBalance(currentAccount);
    // // Display Summary
    // displaySummary(currentAccount);
    updateUI(currentAccount);
  }
});

// Transfers
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );

  // clearing fields
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Doing the treanfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // updating the UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(value => value >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  } else {
    labelWelcome.textContent = 'Load Denied';
  }
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    currentAccount?.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
  labelWelcome.textContent = `Log in to get started`;
});

// sort

let sorted = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  calcDisplayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// using from method on a node list from document.querySelector

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});

/////////////////////////////////////////////////

// Array Method Practice

// 1 - calculate total of all the arrays
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, val) => acc + val, 0);
console.log(bankDepositSum);

// 2 - calculate the number of deposits above 1000

const numbDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// or.length
console.log(numbDeposits1000);

// prefix operator
let b = 10;
console.log(b++);
console.log(b);
console.log(++b);

// 3 - create a new object with the reduce method - calculate the total deposits and withdrawals

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
      sum[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);
console.log(accounts);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      (exceptions.includes(word)
        ? word
        : capitalize(word)
      )).join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not to long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
