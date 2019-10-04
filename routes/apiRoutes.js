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

    app.get("/api/gameinfo", function(req,res) {
        axios.get("https://games.roblox.com/v1/games?universeIds=255862868").then(function(resp) {
            const data = resp.data.data[0];
            res.json(data);
        });
    });

}