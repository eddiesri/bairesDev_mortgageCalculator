"use strict";

var interestRate = 0;
var loanAmount = 0;
var yearsOfMortgage = 0;
var principle = interestRate / 100 / 12 * loanAmount / (1 - Math.pow(1 + interestRate / 100 / 12, -yearsOfMortgage * 12));
var tax = annualTax / 12;
var insurance = annualInsurance / 12;
var monthlyPayment = principleAndInterests + Tax + Insurance;