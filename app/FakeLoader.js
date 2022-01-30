export function appendLoader(changeVisibilityModal) {
  const loaderContainer = document.querySelector(".loaderContainer");
  const fakeLoader = document.querySelector(".fakeLoader");
  loaderContainer.style.display = "flex";
  fakeLoader.classList.add("spinOn");
  const Timer = Math.floor(Math.random() * (3000 - 1000)) + 1000;
  performFakeCall();

  function performFakeCall() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, Timer);
    });
  }
  performFakeCall().then(function (result) {
    fakeLoader.classList.remove("spinOn");
    loaderContainer.style.display = "none";
    changeVisibilityModal();
  });
}
