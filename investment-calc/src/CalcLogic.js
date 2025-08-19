// Helper function to format numbers as Indian currency
export const formatINRCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};

const calculateHandler = (userInput) => {
  // Should be triggered when form is submitted
  // You might not directly want to bind it to the submit event on the form though...

  const yearlyData = []; // per-year results

  let totalInterest = 0; // this will be used to calculate the interest earned each year
  let currentSavings = +userInput.currentSavings; // feel free to change the shape of this input object!
  const yearlyContribution = +userInput.yearlySavings; // as mentioned: feel free to change the shape...
  const expectedReturn = +userInput.expectedReturn / 100;
  const duration = +userInput.duration;

  // The below code calculates yearly results (total savings, interest etc)
  for (let i = 0; i < duration; i++) {
    const yearlyInterest = currentSavings * expectedReturn;
    totalInterest = totalInterest + yearlyInterest;
    currentSavings += yearlyInterest + yearlyContribution;
    yearlyData.push({
      // feel free to change the shape of the data pushed to the array!
      year: i + 1,
      yearlyInterest: yearlyInterest,
      savingsEndOfYear: currentSavings,
      yearlyContribution: yearlyContribution,
      totalInterest: totalInterest,
    });
  }
  return yearlyData;

  // do something with yearlyData ...
};

export default calculateHandler;
