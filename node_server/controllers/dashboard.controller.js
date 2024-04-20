const path = require("path");
const axios = require("axios");

let categories = ["Food", "Transportation", "Rent & Utilities", "Entertainment", "Salary", "Investments", "Healthcare", "Education", "Others"];

function dashboard(req, res, next) {
    console.log(req.method, req.url);
    if (!req.session.user) {
        res.redirect("/login");
    }
    axios.get(`http://localhost:3000/dashboard/${req.session.user.user_id}`).then((response) => {
        // get all accounts and their total amount
        let total_account = 0;
        if (response.data.accounts) {
            for (let i = 0; i < response.data.accounts.length; i++) {
                total_account += parseFloat(response.data.accounts[i].amount);
            }
        }
        total_account = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total_account);

        // get all budget and their total amount
        let total_budget = 0;
        if (response.data.budget) {
            for (let i = 1; i <= 9; i++) {
                if (i != 5) {
                    total_budget += parseFloat(response.data.budget[`category_${i}`]);
                }
            }
        } else {
            response.data.budget = {};
            for (let i = 0; i < categories.length; i++) {
                response.data.budget[`category_${i + 1}`] = 0;
            }
        }

        // get all transactions and their total amount
        let total_expenses = 0;
        let account_expenses = [];
        let category_expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (response.data.transactions) {
            for (let i = 0; i < response.data.transactions.length; i++) {
                account_expenses[i] = 0;

                for (let j = 0; j < response.data.transactions[i].length; j++) {
                    if (response.data.transactions[i][j].is_expense) {
                        account_expenses[i] += parseFloat(response.data.transactions[i][j].amount);
                        total_expenses += parseFloat(response.data.transactions[i][j].amount);
                        category_expenses[parseInt(response.data.transactions[i][j].category) - 1] += parseFloat(response.data.transactions[i][j].amount);

                    } else {
                        account_expenses[i] -= response.data.transactions[i][j].amount;
                        category_expenses[parseInt(response.data.transactions[i][j].category) - 1] -=  parseFloat(response.data.transactions[i][j].amount);
                    }
                }
            }
        }
        view_data = { accounts: response.data.accounts, total_account: total_account, budget: response.data.budget, total_budget: total_budget, account_expenses: account_expenses, total_expenses: total_expenses, category_expenses: category_expenses, categories: categories };
        res.render(path.join(__dirname, "../", "views", "dashboard"), view_data);
    });
}

module.exports = { dashboard };
