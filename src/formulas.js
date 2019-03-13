
let interestRate= 0;
let loanAmount= 0;
let yearsOfMortgage=0;
let principle = ((interestRate / 100) / 12) * loanAmount / (1-Math.pow((1 + ((interestRate / 100)/12)), -yearsOfMortgage*12));
let tax = annualTax / 12;
let insurance = annualInsurance / 12;
let monthlyPayment = principleAndInterests + Tax + Insurance;
