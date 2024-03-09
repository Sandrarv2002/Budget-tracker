// Global variables to store total available income, total expenses, daily savings, and daily expenditure
var totalIncome = 0;
var totalExpenses = 0;
var dailySavings = [];
var dailyExpenditure = [];

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var totalIncomeInput = parseFloat(document.getElementById('total-income').value);
    var categoryInput = document.getElementById('category').value;
    var amountInput = parseFloat(document.getElementById('amount').value);
    var dateInput = new Date(document.getElementById('date').value);

    // Add the total income if it's not already added
    if (totalIncome === 0) {
        totalIncome = totalIncomeInput;
    }

    // Calculate the daily budget based on the total available income and number of days in the month
    var daysInMonth = new Date(dateInput.getFullYear(), dateInput.getMonth() + 1, 0).getDate();
    var dailyBudget = totalIncome / daysInMonth;

    // Calculate the day of the month (1-indexed)
    var dayOfMonth = dateInput.getDate();

    // Subtract the amountInput from the daily budget to get the daily expenditure
    var dailyExpense = amountInput;
    totalExpenses += dailyExpense;

    // Calculate the daily savings
    var dailySaving = dailyBudget - dailyExpense;

    // Update the daily savings and expenditure arrays
    dailySavings[dayOfMonth] = dailySaving;
    dailyExpenditure[dayOfMonth] = dailyExpense;

    // Add the new data to the chart
    myChart.data.labels.push(categoryInput);
    myChart.data.datasets[0].data.push(amountInput);
    myChart.data.datasets[0].backgroundColor.push(getRandomColor()); // Generate a random color
    myChart.update();

    // Clear the form inputs
    document.getElementById('total-income').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
});

// Function to show total savings and expenditure at the end of the month
function showTotalSavingsAndExpenditure() {
    var totalSavings = totalIncome - totalExpenses;
    console.log("Total savings: " + totalSavings);
    console.log("Total expenditure: " + totalExpenses);
}
