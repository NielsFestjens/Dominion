﻿'use strict';

import http = require("http");
import url = require("url");
import path = require("path");
import fs = require("fs");

export function run(port: number = 8888) {

    http.createServer((request, response) => {

        var uri = url.parse(request.url).pathname;
        var filename = path.join(process.cwd(), uri);

        var contentTypesByExtension = {
            '.html': "text/html",
            '.css': "text/css",
            '.js': "text/javascript"
        };

        fs.exists(filename, exists => {
            if (!exists) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.write("404 Not Found\n");
                response.end();
                return;
            }

            if (fs.statSync(filename).isDirectory()) filename += '/index.html';

            fs.readFile(filename, "binary", (err, file) => {
                if (err) {
                    response.writeHead(500, { "Content-Type": "text/plain" });
                    response.write(err + "\n");
                    response.end();
                    return;
                }

                var headers = {};
                var contentType = contentTypesByExtension[path.extname(filename)];
                if (contentType) headers["Content-Type"] = contentType;
                response.writeHead(200, headers);
                response.write(file, "binary");
                response.end();
            });
        });
    }).listen(port);

    console.log("WebServer @ http://localhost:" + port + "/");
};