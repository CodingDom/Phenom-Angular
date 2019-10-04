const axios = require("axios");
const apiKey = process.env.api_key;

module.exports = function(app) {

    app.get("/api/livestats",function(req,res) {
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

    app.get("/api/servers", function(req,res) {
        const serverTypes = {
            "3323720631": "Mobile",
            "3323729375": "Public"
        }
        axios.get("http://death-row-bot.herokuapp.com/serverInfo", {key: apiKey}).then(function(resp) {
            const data = resp.data;
            const servers = [];
            Object.keys(serverTypes).forEach(placeId => {
                const serverIds = Object.keys(data[placeId]);
                serverIds.forEach(serverId => {
                    servers.push({
                        ...data[placeId][serverId],
                        Type: serverTypes[placeId],
                        Id: serverId
                    });
                });
            });

            res.json(servers);
        });
    });

}