// elementsById definition
let yearsOfMortgageElement = document.getElementById("yearsRangeValue");
let interestRateElement = document.getElementById("interestRangeValue");
let loanAmountElement = document.getElementById("loanValue");
let annualTaxElement = document.getElementById("taxValue");
let annualInsuranceElement = document.getElementById("insuranceValue");
let formContainerElement = document.getElementById("formContainer");
let principleAndInterestsLabelElement = document.getElementById("principleAndInterestsLabel");
let taxLabelElement = document.getElementById("taxLabel");
let insuranceLabelElement = document.getElementById("insuranceLabel");
let monthlyPaymentLabelElement = document.getElementById("monthlyPaymentLabel");
let calculateButtonElement = document.getElementById("calculateButton");
let resultsContainerElement = document.getElementById("resultsContainer");

/**
 * Set the range value for the closest input and changes the range input filled background.
 * @param {Object} element - The range input element
 */
function rangeSet(element) {
    // set the range percentage and the changed input
    let percentage = parseInt((element.value * 100) / (element.max));
    let inputElement = element.parentElement.parentElement.querySelector('input[type=number]');
    //sets the value
    inputElement.value = element.value;
    // fills the range background
    element.style.background = 'linear-gradient(to right, #1091cc 0%, #1091cc ' + percentage + '%, #cacaca ' + percentage + '%, #cacaca 100%)'
}

/**
 * Removes the element 'invalidInput' class
 * @param {Object} element - The valid element whose classes and parent classes will be removed
 */
function removeInvalid(element) {
    element.parentElement.classList.remove("invalidInput");
    element.parentElement.nextElementSibling.classList.remove("displayInvalid");
};

/**
 * Adds the element 'invalidInput' class
 * @param {Object} element - The non-valid element whose classes and parent classes will be added
 */
function addInvalid(element) {
    element.parentElement.classList.add("invalidInput");
    element.parentElement.nextElementSibling.classList.add("displayInvalid");
};

/**
 * Checks if the form is a valid one in order to highlight the inputs with empty values
 * @param {Array} requiredElements - The objects Array, containing the elements that will be validated
 * @returns {boolean} - The validation result
 */
function validateForm(requiredElements) {
    let clean = true;
    requiredElements.forEach(function (element) {
        //if at least one element is empty, the form will be invalid, and the element will be highlighted
        if (element.value == "") {
            clean = false;
            addInvalid(element);
        } else {
            removeInvalid(element);
        }
    });
    return clean;
};

/**
 * removes the 'emptyValue' class from every element containing it 
 */
function removeEmptyValueClass() {
    document.querySelectorAll('.emptyValue').forEach(function (element) {
        element.classList.remove('emptyValue');
    })
}

/**
 * Adds a onChange listener to the '.slider' element
 * Also: if the range value changes, then set it into the closest input
 * @param {Object} element - The element whose listener will be set
 */
function listenerChangeSliderClass(element) {
    element.addEventListener("change", function (e) {
        rangeSet(element);
    })
}

/**
 * Adds a onChange listener to the '.required' element
 * Also: If the value is not empty, it removes the invalid class
 * @param {Object} element - The element whose listener will be set
 */
function listenerChangeRequiredClass(element) {
    element.addEventListener("change", function (e) {
        if (element.value != "") {
            removeInvalid(element);
        }
    })
}

/**
 * Adds a onClick listener to the '.currencyContainer' element
 * Also: focus the inner input
 * @param {Object} element - The element whose listener will be set
 */ 
function listenerClickCurrencyContainerClass(element) {
    element.addEventListener("click", function (e) {
        let pastActive = document.querySelector('.active');
        if(pastActive){
            pastActive.classList.remove('active');
        }
        element.lastElementChild.focus();
        element.classList.add('active');
    })
}

/**
 * Inits the default values for the form
 */
function initialValues() {
    yearsOfMortgageElement.value = 30;
    interestRateElement.value = 8.0;
    loanAmountElement.value = 100000;
    annualTaxElement.value = 1000;
    annualInsuranceElement.value = 300;
    rangeSet(yearsOfMortgageElement);
    rangeSet(interestRateElement);
}

(function () {
    // sets the default values
    initialValues();
    // Adds event listener for a form submit
    formContainerElement.addEventListener("submit", function (e) {
        e.preventDefault()
        // checks if the form is valid
        if (validateForm(document.querySelectorAll('.required'))) {
            // Set the values into variables
            let yearsOfMortgage = yearsOfMortgageElement.value;
            let interestRate = interestRateElement.value;
            let loanAmount = loanAmountElement.value;
            let annualTax = annualTaxElement.value;
            let annualInsurance = annualInsuranceElement.value;
            let principleAndInterests = ((interestRate / 100) / 12) * loanAmount / (1 - Math.pow((1 + ((interestRate / 100) / 12)), -yearsOfMortgage * 12));
            let tax = annualTax / 12;
            let insurance = annualInsurance / 12;
            let monthlyPayment = principleAndInterests + tax + insurance;
            // assign the result as text
            principleAndInterestsLabelElement.innerText = principleAndInterests.toFixed(2);
            taxLabelElement.innerText = tax.toFixed(2);
            insuranceLabelElement.innerText = insurance.toFixed(2);
            monthlyPaymentLabelElement.innerText = monthlyPayment.toFixed(2);
            // change the label for the submit button
            calculateButtonElement.innerText = "RECALCULATE";
            // removes the default color for empty results labels
            removeEmptyValueClass();
            // show the results for mobile web
            resultsContainerElement.classList.remove("hidden");
            resultsContainerElement.scrollIntoView();
        }
    });


    // Add events listeners for every slider input
    document.querySelectorAll('.slider').forEach(function (element) {
        listenerChangeSliderClass(element);
    });

    // Add events listeners for every required input
    document.querySelectorAll('.required').forEach(function (element) {
        listenerChangeRequiredClass(element);
    });

    // Add events listeners for every currencyContainer div
    document.querySelectorAll('.currencyContainer').forEach(function (element) {
        listenerClickCurrencyContainerClass(element);
    });
})();