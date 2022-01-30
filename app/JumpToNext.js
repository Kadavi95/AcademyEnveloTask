export function jumpToNext(setTimer) {
  setTimer();
  const stepOneSection = document.querySelector(".stepOneSection");
  const stepTwoSection = document.querySelector(".stepTwoSection");
  stepOneSection.style.display = "none";
  stepTwoSection.style.display = "flex";
}
