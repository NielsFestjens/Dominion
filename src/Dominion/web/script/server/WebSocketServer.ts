/// <reference path='../declarations/node.d.ts' />
/// <reference path='../declarations/ws.d.ts' />
'use strict';

import ws = require('ws');

export class WebSocketServer {
    server: ws.Server;

    run(callback: (message: any) => void, port: number = 3000) {
        this.server = new ws.Server({ port: port });
        console.log("WebSocketServer @ http://localhost:" + port + "/");
        this.server.on('connection', client => {
            client.on('message', message => {
                try {
                    console.log("IN : " + message);
                    var t = JSON.parse(message);
                    callback(message);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
    }
    
    broadcast(data: string): void {
        console.log("OUT : " + data);
        this.server.clients.forEach(client => {
            client.send(data);
        });
    }
}