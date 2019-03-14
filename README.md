# bairesDev_mortgageCalculator
Coding Challenge for bairesDev

## Introduction for Users

Aren't you tired of using regular calculator to find how much your monthly mortgage payment will be?, now with this app you will be able to find it easily. We will just need the following details:

-  Years of mortgage
-  Rate of interest (%) 
-  Loan amount ($)
-  Annual Tax ($)
-  Annual Insurance ($)

## Introduction for devs

This app implements Sass(css) and ES6(Js) as main development in order to create a simple mortgage responsive calculator

## Node Modules - Usage

This App uses nodeJs Modules such as:

- Sass
- JsDocs
- EsLint

## Sass - Implementation

For the Css generation there is a sass file (`sass/style.scss`) that imports all the `.scss` documents containing a specific block element style definition, this is the element style distribution:

    ├── style                   # main document
    ├──── title                 # styles for the main title
    ├──── form                  # styles for the main form
    ├────── formContainer       # styles for the form container
    ├──────── slider            # styles for the sliders
    ├──── form                  # styles for the main form
    ├──── results               # styles for the results div
## Formulas 

- Principle & Interest:

> ((interestRate / 100) / 12)* loanAmount / (1-Math.pow((1 + ((interestRate / 100)/12)),-yearsOfMortgage*12))

- Tax:

> annualTax / 12

- Insurance

> annualInsurance / 12

- Monthly payment
> principleAndInterests + Tax + Insurance


## Documentation - JsDocs

Via `JsDocs` the JavaScript documentation can be generated. The output will be at `./docs/` .

It also contains guides for general ckeditor development.

## Supported Browsers

The calculator has multi browser support and development should always be tested on all of them. This are the browsers compatibility and its status:

- Chrome **(current Version)**
- Firefox ESR (In Review)
- Edge (Working on compatibility)
- IE 10/11 (Working on compatibility)
