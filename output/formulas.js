"use strict";

function validateForm(requiredElements) {
  var clean = true;
  requiredElements.forEach(function (element) {
    if (element.value == "") {
      clean = false;
      element.classList.add("invalidInput");
      element.previousElementSibling.classList.add("invalidLabel");
      element.nextElementSibling.classList.add("displayInvalid");
    } else {
      element.classList.remove("invalidInput");
      element.previousElementSibling.classList.remove("invalidLabel");
      element.nextElementSibling.classList.remove("displayInvalid");
    }
  });
  return clean;
}

(function () {
  document.getElementById("formContainer").addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm(document.querySelectorAll('.required'))) {
      var yearsOfMortgage = parseFloat(document.getElementById("yearsRangeValue").value).toFixed(1);
      var interestRate = parseFloat(document.getElementById("interestRangeValue").value).toFixed(1);
      var loanAmount = parseFloat(document.getElementById("loanValue").value).toFixed(1);
      var annualTax = parseFloat(document.getElementById("taxValue").value).toFixed(1);
      var annualInsurance = parseFloat(document.getElementById("insuranceValue").value).toFixed(1);
      var principleAndInterests = parseFloat(interestRate / 100 / 12 * loanAmount / (1 - Math.pow(1 + interestRate / 100 / 12, -yearsOfMortgage * 12))).toFixed(2);
      var tax = parseFloat(annualTax / 12).toFixed(2);
      var insurance = parseFloat(annualInsurance / 12).toFixed(2);
      var monthlyPayment = parseFloat(principleAndInterests + tax + insurance).toFixed(2);
      document.querySelectorAll('.emptyValue').forEach(function (element) {
        element.classList.remove('emptyValue');
      });
      document.getElementById("principleAndInterestsLabel").innerText = principleAndInterests;
      document.getElementById("taxLabel").innerText = tax;
      document.getElementById("insuranceLabel").innerText = insurance;
      document.getElementById("monthlyPaymentLabel").innerText = monthlyPayment;
      document.getElementById("calculateButton").innerText = "RECALCULATE";
    }
  });
  document.getElementById("yearsRangeValue").addEventListener("change", function (e) {
    document.getElementById("yearsValue").value = document.getElementById("yearsRangeValue").value;
  });
  document.getElementById("interestRangeValue").addEventListener("change", function (e) {
    document.getElementById("interestValue").value = document.getElementById("interestRangeValue").value;
  });
  document.querySelectorAll('.required').forEach(function (element) {
    element.addEventListener("change", function (e) {
      if (element.value != "") {
        element.classList.remove("invalidInput");
        element.previousElementSibling.classList.remove("invalidLabel");
        element.nextElementSibling.classList.remove("displayInvalid");
      }
    });
  });
})();