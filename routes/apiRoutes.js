const axios = require("axios");
const apiKey = process.env.api_key;

module.exports = function(app) {

    app.get("/test",function(req,res) {
        axios.get("https://death-row-bot.herokuapp.com/livestats/623694595", {key: apiKey}).then(function(resp) {
            const response = resp.data;
            const data = response.data;
            res.json(data);
        });
    });

}