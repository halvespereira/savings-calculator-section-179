// grabbing all the DOM elements
const calculatorTopValue = document.querySelector("#__calculator-top-value");
const slider = document.querySelector(".__calculator-range");
const section179Deduction = document.querySelector("#__calculator-response-179-deduction");
const taxRateDropdown = document.querySelector("#__calculator-tax-rate-dropdown");
const costOfEquipment = document.querySelector("#__calculator-response-cost-of-equipment");
const cashSavings = document.querySelector("#__calculator-response-cash-savings");
const taxBracket = document.querySelector("#__calculator-response-tax-bracket");

// converts numbers to currency
function formatNumberToCurrency(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.error("Section 179 Calculator::formatNumberToCurrency::Error", e);
  }
}

// handles when range input is moved
function handleRangeInput(e) {
  const value = e.target.value;

  calculatorTopValue.textContent = `$${formatNumberToCurrency(value)}`;
  calculatorTopValue.setAttribute("data-value", value);
  section179Deduction.textContent = `$${formatNumberToCurrency(value)}`;
  section179Deduction.setAttribute("data-value", value);

  const taxSavings = value * taxRateDropdown.value;
  const newCostOfEquipment = value - taxSavings;
  const newCashSavings = value - newCostOfEquipment;

  costOfEquipment.textContent = `$${formatNumberToCurrency(newCostOfEquipment)}`;
  costOfEquipment.setAttribute("data-value", newCostOfEquipment);
  cashSavings.textContent = `$${formatNumberToCurrency(newCashSavings)}`;
  cashSavings.setAttribute("data-value", newCashSavings);
}

// handles when tax rated is changed
function handleTaxRateChange(e) {
  taxBracket.textContent = `At ${e.target.value * 100}% tax bracket`;

  const calculatorTopValueData = calculatorTopValue.getAttribute("data-value");

  const taxSavings = calculatorTopValueData * e.target.value;
  const newCostOfEquipment = calculatorTopValueData - taxSavings;
  const newCashSavings = calculatorTopValueData - newCostOfEquipment;

  costOfEquipment.textContent = `$${formatNumberToCurrency(newCostOfEquipment)}`;
  cashSavings.textContent = `$${formatNumberToCurrency(newCashSavings)}`;
}

// Defining the event listeners for user interaction
slider.addEventListener("input", handleRangeInput);
taxRateDropdown.addEventListener("change", handleTaxRateChange);
