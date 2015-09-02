import webServer = require("./WebServer");
import webSocketServer = require("./WebSocketServer");
import models = require('./models');

webServer.run();
var wsServer = new webSocketServer.WebSocketServer();
wsServer.run(message => {
    var userMessage: models.UserMessage = new models.UserMessage(message);
    wsServer.broadcast(JSON.stringify(userMessage));
});

console.log("Ready to roll, CTRL + C to shutdown");