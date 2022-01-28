const pickUpButton = document.querySelector(".pickUpButton");
const stepOneSection = document.querySelector(".stepOneSection");
const stepTwoSection = document.querySelector(".stepTwoSection");
const pickUpButtonSecondary = document.querySelector(".pickUpButtonSecondary");
const numberInput = document.querySelector(".numberInput");
const codeInput = document.querySelector(".codeInput");
const formValidation = document.querySelector(".formValidation");
const warningNumber = document.querySelector(".warningNumber");
const warningCode = document.querySelector(".warningCode");
const modalContainerBackground = document.querySelector(".modalContainerBackground");
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

setTimeout(() => {
  console.log(fakeData);
}, 500);
let counter = 0;

function jumpToNext() {
  counter++;
  console.log(counter);
  if (counter % 2 !== 0) {
    stepOneSection.style.display = "none";
    stepTwoSection.style.display = "flex";
  }
}
pickUpButton.addEventListener("click", jumpToNext);

function changeVisibilityModal(){
  modalContainerBackground.style.display = "flex"
}

function checkData(event) {
  event.preventDefault();
  const userTelephoneNumber = fakeData.telephoneNumber.toString();
  const userCode = fakeData.code.toString();
  let firstCondition = false;
  let secondCondition = false

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
    warningNumber.style.color = "green"
    alert(warningsTextArray[1]);
    firstCondition = true;

  }
  if(codeInput.value === userCode){
    warningCode.innerHTML = warningsTextArray[3];
    warningCode.style.color = "green"
    alert(warningsTextArray[3]);
    secondCondition = true
  }
  if (firstCondition && secondCondition) {
    changeVisibilityModal()
  }
}

pickUpButtonSecondary.addEventListener("click", checkData);
