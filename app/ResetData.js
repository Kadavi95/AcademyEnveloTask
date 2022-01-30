export function resetData(warningCode, warningNumber, modalInfo, numberInput, codeInput, resultTime, infoParagraphSecodary) {
  warningCode.innerHTML = "";
  warningNumber.innerHTML = "";
  modalInfo.innerHTML = "";
  numberInput.value = "";
  codeInput.value = "";
  resultTime = null;
  infoParagraphSecodary.style.opacity = "1.0";
}
