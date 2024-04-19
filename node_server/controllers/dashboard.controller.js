const path = require("path");
const axios = require("axios");

function dashboard(req, res, next) {
    console.log(req.method, req.url);
    if (!req.session.user) {
        res.redirect("/login");
    }
    axios.get(`http://localhost:3000/dashboard/${req.session.user.user_id}`).then((response) => {
        // console.log(response.data);
        let total_account = 0;
        for (let i = 0; i < response.data.accounts.length; i++) {
            total_account += parseFloat(response.data.accounts[i].amount);
        }
        total_account = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total_account);
        res.render(path.join(__dirname, "../", "views", "dashboard"), { accounts: response.data.accounts, total_account: total_account });
    });
}

module.exports = { dashboard };
