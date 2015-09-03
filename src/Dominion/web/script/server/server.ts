import webServer = require("./WebServer");
import webSocketServer = require("./WebSocketServer");
import models = require('./models');
import settings = require("../shared/settings");

webServer.run(settings.HttpPort);
var wsServer = new webSocketServer.WebSocketServer();
wsServer.run(message => {
    var userMessage: models.UserMessage = new models.UserMessage(message);
    wsServer.broadcast(JSON.stringify(userMessage));
}, settings.WsPort);

console.log("Ready to roll, CTRL + C to shutdown");