const path = require("path");
const axios = require("axios");

let categories = ["Food", "Transportation", "Rent & Utilities", "Entertainment", "Salary", "Investments", "Healthcare", "Education", "Others"];

function accounts(req, res, next) {
    console.log(req.method, req.url);

    if (!req.session.user) {
        res.redirect("/login");
    }

    // url to get data
    let url = `http://localhost:3000/accounts/${req.session.user.user_id}`;

    // if user specified the account to get the transactions
    if (req.query.account_id) {
        url += `/${req.query.account_id}`;
    } else if (req.query.category) {
        url += `/nil`;
    }

    if (req.query.category) {
        url += `/${req.query.category}`;
    }

    axios.get(url).then((response) => {
        console.log(response.data);

        // get accounts
        let total_account = 0;
        if (response.data.accounts) {
            for (let i = 0; i < response.data.accounts.length; i++) {
                total_account += parseFloat(response.data.accounts[i].amount);
            }
        }
        total_account = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total_account);

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
                        category_expenses[parseInt(response.data.transactions[i][j].category) - 1] -= parseFloat(response.data.transactions[i][j].amount);
                    }
                }
            }
        }
        view_data = { accounts: response.data.accounts, total_account: total_account, account_expenses: account_expenses, total_expenses: total_expenses, category_expenses: category_expenses, categories: categories, transactions: response.data.transactions, current_account: response.data.current_account, errors: req.flash("errors") };
        res.render(path.join(__dirname, "../", "views", "accounts"), view_data);
    });
}

function createTransaction(req, res, next) {
    console.log(req.method, req.url, req.body);
    req.body.id = req.session.user.user_id;

    axios.post("http://localhost:3000/create_transaction", req.body).then((response) => {
        console.log(response.data);

        if (response.data.errors) {
            req.flash("errors", response.data.errors);
        } else {
            req.flash("success", response.data.message);
        }
        res.redirect("/accounts");
    });
}

function createAccount(req, res, next) {
    console.log(req.method, req.url, req.body);
    req.body.id = req.session.user.user_id;

    axios.post("http://localhost:3000/create_account", req.body).then((response) => {
        console.log(response.data);

        if (response.data.errors) {
            req.flash("errors", response.data.errors);
        } else {
            req.flash("success", response.data.message);
        }
        res.redirect("/accounts");
    });
}

module.exports = { accounts, createAccount, createTransaction };
