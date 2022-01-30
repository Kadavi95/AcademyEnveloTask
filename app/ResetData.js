export function resetData(warningCode, warningNumber, modalInfo, numberInput, codeInput, resultTime, infoParagraphSecodary) {
  warningCode.innerText = "";
  warningNumber.innerText = "";
  modalInfo.innerText = "";
  numberInput.value = "";
  codeInput.value = "";
  resultTime = null;
  infoParagraphSecodary.style.opacity = "1.0";
}
