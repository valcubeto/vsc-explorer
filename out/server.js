"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openServer = openServer;
const http_1 = require("http");
const SERVER_PORT = 2222;
const STATUS_OK = 200;
function openServer() {
    let server = (0, http_1.createServer)(listener);
    server.listen('localhost', SERVER_PORT);
    return server;
}
function listener(req, res) {
    if (req.url === undefined) {
        return;
    }
    let pathname = new URL(req.url).pathname;
    res.writeHead(STATUS_OK, { 'Content-Type': 'application/json' });
    switch (pathname.split('/')[1] ?? '') {
        case 'read':
            try {
                //
            }
            catch (err) {
                res.write(`{"error":"${err}"}`);
            }
            break;
        case 'write':
            try {
                //
            }
            catch (err) {
                res.write(`{"error":"${err}"}`);
            }
            break;
        default:
            console.error(`Invalid request: ${req.method} ${pathname}`);
            res.write('{"error":"invalid request"}');
            break;
    }
    res.end();
}
//# sourceMappingURL=server.js.map