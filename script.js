document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expenseList');
    const totalExpenses = document.getElementById('totalExpenses');
    const incomeInput = document.getElementById('income');
    const monthlySavings = document.getElementById('monthlySavings');

    let expenses = [];
    let totalExpenseAmount = 0;
    let income = 0;

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('expense').value);

        if (category && amount) {
            addExpense(category, amount);
            expenseForm.reset();
        }
        // Remove or comment out the alert message
        // else {
        //     alert('Please fill in both category and amount.');
        // }
    });

    function addExpense(category, amount) {
        // Append the new expense item to the list
        const newExpenseItem = document.createElement('li');
        newExpenseItem.innerHTML = `<strong>${category}:</strong> $${amount.toFixed(2)}`;
        expenseList.appendChild(newExpenseItem);

        // Update the total expenses
        totalExpenseAmount += amount;
        totalExpenses.textContent = `Total Expenses: $${totalExpenseAmount.toFixed(2)}`;

        // Clear the expense input field
        document.getElementById('expense').value = '';

        // Calculate and update the monthly savings
        calculateSavings();

        // Update the chart
        updateChart();
    }

    function calculateSavings() {
        income = parseFloat(incomeInput.value);
        if (!isNaN(income)) {
            const savings = income - totalExpenseAmount;
            monthlySavings.textContent = `Monthly Savings: $${savings.toFixed(2)}`;
        }
    }

    function updateChart() {
        const ctx = document.getElementById('expense-chart').getContext('2d');

        const categories = expenses.map(expense => expense.category);
        const amounts = expenses.map(expense => expense.amount);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Expense Amount',
                    data: amounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});
