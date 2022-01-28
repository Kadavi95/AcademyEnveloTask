const pickUpButton = document.querySelector(".pickUpButton");
const stepOneSection = document.querySelector(".stepOneSection");
const stepTwoSection = document.querySelector(".stepTwoSection");
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
