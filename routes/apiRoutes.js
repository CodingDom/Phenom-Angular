const axios = require("axios");
const apiKey = process.env.api_key;

module.exports = function(app) {

    app.get("/api/test",function(req,res) {
        axios.get("https://death-row-bot.herokuapp.com/livestats/623694595", {key: apiKey}).then(function(resp) {
            const response = resp.data;
            const data = response.data;
            console.log("Route hit",data);
            res.json(data);
        });
    });

}