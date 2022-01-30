import { appendLoader } from "./FakeLoader.js";
import { resetData } from "./ResetData.js";
import { warningsInfoArray } from "./WarningsInfoArray.js";
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
const infoParagraphSecodary = document.querySelector(".info-paragraphSecodary");

let fakeData;
fetch("./assets/fakeData.json")
  .then((res) => res.json())
  .then((data) => (fakeData = data));

let secondsCounter = 0;
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
  setTimer();
  stepOneSection.style.display = "none";
  stepTwoSection.style.display = "flex";
}
pickUpButton.addEventListener("click", jumpToNext);

function changeVisibilityModal() {
  modalContainerBackground.style.display = "flex";
}

function checkData(event) {
  event.preventDefault();
  const userTelephoneNumber = fakeData.telephoneNumber.toString();
  const userCode = fakeData.code.toString();

  const isPhoneCorrect = numberInput.value === userTelephoneNumber;

  const isCodeCorrect = codeInput.value === userCode;
  if (!isPhoneCorrect && isCodeCorrect) {
    warningNumber.innerHTML = warningsInfoArray[0];
    warningCode.innerHTML = "";
  }
  if (isPhoneCorrect && !isCodeCorrect) {
    warningNumber.innerHTML = "";
    warningCode.innerHTML = warningsInfoArray[1];
  }
  if (!isPhoneCorrect && !isCodeCorrect) {
    warningNumber.innerHTML = warningsInfoArray[0];
    warningCode.innerHTML = warningsInfoArray[1];
  }

  if (isPhoneCorrect && isCodeCorrect) {
    warningNumber.innerHTML = "";
    warningCode.innerHTML = "";
    infoParagraphSecodary.style.opacity = "0.0";
    clearTimer();
    modalInfo.innerHTML = `Zrobłeś to w czasie ${resultTime} sekund. Czy możemy zrobić coś jeszcze dla Ciebie?`;
    appendLoader(changeVisibilityModal);
  }
}

pickUpButtonSecondary.addEventListener("click", checkData);

function clearService(timerFn) {
  secondsCounter = 0;
  const timerFunction = timerFn;
  timerFunction();
  modalContainerBackground.style.display = "none";
  resetData(
    warningCode,
    warningNumber,
    modalInfo,
    numberInput,
    codeInput,
    resultTime,
    infoParagraphSecodary
  );
}

modalButtonContinue.addEventListener("click", () => clearService(setTimer));

function resetToInitialState() {
  secondsCounter = 0;
  modalContainerBackground.style.display = "none";
  stepTwoSection.style.display = "none";
  stepOneSection.style.display = "flex";
  resetData(
    warningCode,
    warningNumber,
    modalInfo,
    numberInput,
    codeInput,
    resultTime,
    infoParagraphSecodary
  );
}
modalButtonEnd.addEventListener("click", resetToInitialState);

