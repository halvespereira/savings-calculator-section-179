const calculatorTopValue = document.querySelector("#__calculator-top-value");
const slider = document.querySelector(".__calculator-range");
const section179Deduction = document.querySelector("#__calculator-response-179-deduction");
const taxRateDropdown = document.querySelector("#__calculator-tax-rate-dropdown");
const costOfEquipment = document.querySelector("#__calculator-response-cost-of-equipment");
const cashSavings = document.querySelector("#__calculator-response-cash-savings");

function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
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
    console.log(e);
  }
}

function handleRangeInput(e) {
  const value = e.target.value;

  calculatorTopValue.textContent = `$${formatMoney(value)}`;
  section179Deduction.textContent = `$${formatMoney(value)}`;

  const taxSavings = value * taxRateDropdown.value;
  const newCostOfEquipment = value - taxSavings;
  const newCashSavings = value - newCostOfEquipment;

  costOfEquipment.textContent = `$${formatMoney(newCostOfEquipment)}`;
  cashSavings.textContent = `$${formatMoney(newCashSavings)}`;
}

slider.addEventListener("input", handleRangeInput);
