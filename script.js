document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expensesList = document.getElementById('expenses-list');

    // Array to store expenses
    let expenses = [];

    // Function to add expense
    function addExpense(category, amount, date) {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
            <p><strong>Date:</strong> ${date}</p>
        `;
        expensesList.appendChild(expenseItem);
        expenses.push({ category, amount, date }); // Add expense to array
        updateChart(); // Update the chart
    }

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        if (category && amount && date) {
            addExpense(category, amount, date);
            expenseForm.reset();
        } else {
            // alert('Please fill in all fields.');
        }
    });

    // Function to update and display the chart
    function updateChart() {
        const ctx = document.getElementById('expense-chart').getContext('2d');

        // Extract data for the chart
        const categories = expenses.map(expense => expense.category);
        const amounts = expenses.map(expense => expense.amount);

        // Create the chart
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