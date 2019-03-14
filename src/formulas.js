let yearsOfMortgageElement            = document.getElementById("yearsRangeValue");
let interestRateElement               = document.getElementById("interestRangeValue");
let loanAmountElement                 = document.getElementById("loanValue");
let annualTaxElement                  = document.getElementById("taxValue");
let annualInsuranceElement            = document.getElementById("insuranceValue");
let formContainerElement              = document.getElementById("formContainer");
let principleAndInterestsLabelElement = document.getElementById("principleAndInterestsLabel");
let taxLabelElement                   = document.getElementById("taxLabel");
let insuranceLabelElement             = document.getElementById("insuranceLabel");
let monthlyPaymentLabelElement        = document.getElementById("monthlyPaymentLabel");
let calculateButtonElement            = document.getElementById("calculateButton");
let resultsContainerElement           = document.getElementById("resultsContainer");

/**
 * 
 * @param {Object} element 
 */
function rangeSet(element) {
    let percentage = parseInt((element.value * 100) / (element.max));
    let inputElement = element.parentElement.parentElement.querySelector('input[type=number]');
    inputElement.value = element.value;
    element.style.background = 'linear-gradient(to right, #1091cc 0%, #1091cc ' + percentage + '%, #d8d8d8 ' + percentage + '%, #d8d8d8 100%)'

}



/**
 * 
 * @param {Object} element 
 */
function removeInvalid(element) {
    element.parentElement.classList.remove("invalidInput");
    element.parentElement.nextElementSibling.classList.remove("displayInvalid");
};
/**
 * 
 * @param {Object} element 
 */
function addInvalid(element) {
    element.parentElement.classList.add("invalidInput");
    element.parentElement.nextElementSibling.classList.add("displayInvalid");
};
/**
 * 
 * @param {Array} requiredElements 
 * @returns {boolean} clean
 */
function validateForm(requiredElements) {
    let clean = true;
    requiredElements.forEach(function (element) {
        if (element.value == "") {
            clean = false;
            addInvalid(element);
        } else {
            removeInvalid(element);
        }
    });
    return clean;
};

function removeEmptyValueClass(){
    document.querySelectorAll('.emptyValue').forEach(function (element) {
        element.classList.remove('emptyValue');
    })
}

/**
 * 
 */
function initialValues() {
    yearsOfMortgageElement.value = 30;
    interestRateElement.value    = 8;
    loanAmountElement.value      = 100000;
    annualTaxElement.value       = 1000;
    annualInsuranceElement.value = 300;
    rangeSet(yearsOfMortgageElement);
    rangeSet(interestRateElement);
}

(function () {
    // sets the default values
    initialValues();

    // Add events for a form submit
    formContainerElement.addEventListener("submit", function (e) {
        e.preventDefault()
        // checks if the form is valid
        if (validateForm(document.querySelectorAll('.required'))) {
            // Set the values into variables
            let yearsOfMortgage       = yearsOfMortgageElement.value;
            let interestRate          = interestRateElement.value;
            let loanAmount            = loanAmountElement.value;
            let annualTax             = annualTaxElement.value;
            let annualInsurance       = annualInsuranceElement.value;
            let principleAndInterests = ((interestRate / 100) / 12) * loanAmount / (1 - Math.pow((1 + ((interestRate / 100) / 12)), -yearsOfMortgage * 12));
            let tax                   = annualTax / 12;
            let insurance             = annualInsurance / 12;
            let monthlyPayment        = principleAndInterests + tax + insurance;

            // assign the result as text
            principleAndInterestsLabelElement.innerText = principleAndInterests.toFixed(2);
            taxLabelElement.innerText                   = tax.toFixed(2);
            insuranceLabelElement.innerText             = insurance.toFixed(2);
            monthlyPaymentLabelElement.innerText        = monthlyPayment.toFixed(2);
            // change the label for the submit button
            calculateButtonElement.innerText = "RECALCULATE";
            // removes the default color for empty results labels
            removeEmptyValueClass();
            // show the results for mobile web
            resultsContainerElement.classList.add("mobileElement");

        }
    });


    // Add events for every slider input
    document.querySelectorAll('.slider').forEach(function (element) {
        // if the range value changes, then set it into the closest input
        element.addEventListener("change", function (e) {
            rangeSet(element);
        })
    });

    // Add events for every required input
    document.querySelectorAll('.required').forEach(function (element) {
        // if the value is not empty, it removes the invalid class
        element.addEventListener("change", function (e) {
            if (element.value != "") {
                removeInvalid(element);
            }
        })
    });

    // Add events for every currencyContainer div
    document.querySelectorAll('.currencyContainer').forEach(function (element) {
        // on Click, focus the inner input
        element.addEventListener("click", function (e) {
            element.lastElementChild.focus()
        })
    });
})();