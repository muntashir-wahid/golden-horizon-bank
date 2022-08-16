"use strict";

const DUMMY_DATA = [
  {
    id: "ac1",
    userName: "Muntashir",
    email: "waid.muntasir420@gmail.com",
    password: "iloveyouasma",
    diposit: 0,
    withdraw: 0,
    totalBalance: 1200,
  },
  {
    id: "ac2",
    userName: "Asma",
    email: "aulhusna001@gmail.com",
    password: "iloveyouasif",
    diposit: 0,
    withdraw: 0,
    totalBalance: 5000,
  },
];
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// HTML elements

const loginFormEl = document.querySelector(".login-form");
const [emailInputEl, passwordInputEl] = loginFormEl.children;
const loginSection = document.getElementById("section-login");
const primaryHeading = document.getElementById("primary-heading");
const bankSection = document.getElementById("section-bank");
const dipositAmountEl = document.getElementById("diposite-amount");
const totalBalanceEl = document.getElementById("total-balance");
const withdrawAmountEl = document.getElementById("withdraw-amount");
const modal = document.getElementById("modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const modalBackdrop = document.getElementById("backdrop");
const modalText = document.getElementById("modalText");
const logoutBtn = document.getElementById("btn-logout");
// console.log(emailInputEl, passwordInputEl, loginSection, primaryHeading);

///////////////////////////////////////////////////////////////
// Application states
let isAuthenticated = false;

// Login logic
loginFormEl.addEventListener("submit", function (e) {
  e.preventDefault();

  // Provided email and password
  const email = emailInputEl.value;
  const password = passwordInputEl.value;
  // console.log(email, typeof password);

  // Account validation checking
  const currentAccount = DUMMY_DATA.find((user) => user.email === email);

  calcDiposit(currentAccount);
  calcWithdraw(currentAccount);

  if (currentAccount?.password === password) {
    console.log("Logged in");
    isAuthenticated = !isAuthenticated;
    loginSection.classList.add("hidden");
    bankSection.classList.remove("hidden");
    primaryHeading.textContent = "Let's get some money!";
    bankStatement(currentAccount);
  } else {
    toggleModal(
      isAuthenticated,
      "Invalid user!Please provide a valid email and password"
    );
    console.log("invalid user!");
  }

  emailInputEl.value = "";
  passwordInputEl.value = "";
});

// Bank statement logic

const bankStatement = function (currentUser) {
  console.log(currentUser);
  // DOM elements
  // const dipositAmountEl = document.getElementById("diposite-amount");
  // const withdrawAmountEl = document.getElementById("withdraw-amount");
  // const totalBalanceEl = document.getElementById("total-balance");

  ////////////////////////////////////
  dipositAmountEl.textContent = currentUser.diposit;
  withdrawAmountEl.textContent = currentUser.withdraw;
  totalBalanceEl.textContent = currentUser.totalBalance;
};

const calcDiposit = function (currAccount) {
  const dipositeFormEl = document.getElementById("form-diposit");
  const [dipositInputEl] = dipositeFormEl.children;
  dipositeFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
    currAccount.diposit += +dipositInputEl.value;
    currAccount.totalBalance += +dipositInputEl.value;
    dipositAmountEl.textContent = currAccount.diposit;
    totalBalanceEl.textContent = currAccount.totalBalance;
    console.log(currAccount);
    dipositInputEl.value = "";
  });
};

const calcWithdraw = function (currAccount) {
  const withdrawFromEl = document.getElementById("form-withdraw");
  const [withdrawInputEl] = withdrawFromEl.children;
  withdrawFromEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const withdrawAmount = +withdrawInputEl.value;
    withdrawInputEl.value = "";
    if (withdrawAmount > currAccount.totalBalance) {
      toggleModal(
        false,
        "You can not withdraw more then your account balance!"
      );
      return;
    }
    currAccount.withdraw += withdrawAmount;
    currAccount.totalBalance -= withdrawAmount;
    withdrawAmountEl.textContent = currAccount.withdraw;
    totalBalanceEl.textContent = currAccount.totalBalance;
    console.log(currAccount);
  });
};

const toggleModal = function (isVisible, message) {
  if (!isVisible) {
    modal.classList.remove("hidden");
    modalText.textContent = message;
  }
  btnCloseModal.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
  modalBackdrop.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
};

const getLogout = function () {
  logoutBtn.addEventListener("click", function () {});
};

const renderUserAccount = function () {};
