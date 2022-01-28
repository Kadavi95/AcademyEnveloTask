const pickUpButton = document.querySelector(".pickUpButton");
const stepOneSection = document.querySelector(".stepOneSection");
const stepTwoSection = document.querySelector(".stepTwoSection");
const pickUpButtonSecondary = document.querySelector(".pickUpButtonSecondary");
const numberInput = document.querySelector(".numberInput");
const codeInput = document.querySelector(".codeInput");
const formValidation = document.querySelector(".formValidation");
const warningNumber = document.querySelector(".warningNumber");
const warningCode = document.querySelector(".warningCode");
const modalContainerBackground = document.querySelector(
  ".modalContainerBackground"
);
const modalInfo = document.querySelector(".modalInfo");
const modalButtonContinue = document.querySelector(".modalButtonContinue");
const modalButtonEnd = document.querySelector(".modalButtonEnd");
const warningsTextArray = [
  "Zła wartość numeru telefonu. Podaj poprawnie",
  "Dobra wartość numeru telefonu. Dziękujemy",
  "Zła wartość kodu odbioru. Podaj poprawnie",
  "Dobra wartość kodu odbioru. Dziękujemy",
];

let fakeData;
fetch("./assets/fakeData.json")
  .then((res) => res.json())
  .then((data) => (fakeData = data));

let counter = 0;
let secondsCounter = 0;
let firstCondition = false;
let secondCondition = false;
let resultTime = null;
let timer;
function setTimer() {
  timer = setInterval(() => {
    secondsCounter++;
    console.log(secondsCounter);
  }, 1000);
}
function clearTimer() {
  resultTime = secondsCounter;
  console.log(resultTime);
  clearInterval(timer);
}

function jumpToNext() {
  counter++;
  setTimer();
  console.log(setTimer);
  if (counter % 2 !== 0) {
    stepOneSection.style.display = "none";
    stepTwoSection.style.display = "flex";
  }
}
pickUpButton.addEventListener("click", jumpToNext);

function changeVisibilityModal() {
  modalContainerBackground.style.display = "flex";
}

function checkData(event) {
  event.preventDefault();
  const userTelephoneNumber = fakeData.telephoneNumber.toString();
  const userCode = fakeData.code.toString();

  if (
    numberInput.value.length !== 9 ||
    numberInput.value !== userTelephoneNumber
  ) {
    warningNumber.innerHTML = warningsTextArray[0];
    alert(warningsTextArray[0]);
  }
  if (codeInput.value.length !== 4 || codeInput.value !== userCode) {
    alert(warningsTextArray[2]);
    console.log(codeInput.value);
    warningCode.innerHTML = warningsTextArray[2];
  }
  if (numberInput.value === userTelephoneNumber) {
    warningNumber.innerHTML = warningsTextArray[1];
    warningNumber.style.color = "green";
    alert(warningsTextArray[1]);
    firstCondition = true;
  }
  if (codeInput.value === userCode) {
    warningCode.innerHTML = warningsTextArray[3];
    warningCode.style.color = "green";
    alert(warningsTextArray[3]);
    secondCondition = true;
  }
  if (firstCondition && secondCondition) {
    changeVisibilityModal();
    clearTimer();
    modalInfo.innerHTML = `Zrobłeś to w czasie ${resultTime} sekund. Czy możemy zrobić coś jeszcze dla Ciebie?`;
  }
}

pickUpButtonSecondary.addEventListener("click", checkData);

function clearService(timerFn) {
  secondsCounter = 0;
  const timerFunction = timerFn;
  timerFunction();
  modalContainerBackground.style.display = "none";
  firstCondition = false;
  secondCondition = false;
  warningCode.innerHTML = "";
  warningNumber.innerHTML = "";
  modalInfo.innerHTML = "";
  numberInput.value = "";
  codeInput.value = "";
  resultTime = null;
  counter = 0;
}

modalButtonContinue.addEventListener("click", () => clearService(setTimer));

function resetToInitialState() {
  secondsCounter = 0;
  counter = 0;
  modalContainerBackground.style.display = "none";
  stepTwoSection.style.display = "none";
  stepOneSection.style.display = "flex";
  firstCondition = false;
  secondCondition = false;
  warningCode.innerHTML = "";
  warningNumber.innerHTML = "";
  modalInfo.innerHTML = "";
  numberInput.value = "";
  codeInput.value = "";
  resultTime = null;
}
modalButtonEnd.addEventListener("click", resetToInitialState);
