
var sio     = require('socket.io');
var http    = require('http');
var docket  = require('./lib/docket');
var port    = 9000;
var serv    = http.createServer(docket.handler);

console.log('Starting HTTP server');
serv.listen(port);

console.log('Starting WS server on ' + port);
var ws   = serv.listen(port);
var conn = sio.listen(ws, { log: false });

console.log('Waiting for browser to connect at http://127.0.0.1:' + port);
conn.sockets.on('connection', function (socket) { 

    console.log('Browser connected');

    var pipeline = new docket.Pipe(socket);
    pipeline.listen("sales", "new");

    pipeline.sold(1, "bottles", "olive oil");
    pipeline.sold(2, "loaves", "bread");
    pipeline.sold(1, "packs", "butter");
    pipeline.sold(1, "litres", "fabric conditioner");
    pipeline.sold(3, "grams", "cheese");
    pipeline.sold(1, "boxes", "crackers");
    pipeline.sold(1, "jars", "coffee");
    pipeline.sold(2, "lbs", "rice");
    pipeline.sold(2, "bottles", "port");
    pipeline.sold(3, "packets", "mince pies");
    pipeline.sold(1, "whole", "chicken");
    pipeline.sold(2, "bottles", "milk");
    pipeline.sold(1, "cans", "air freshener");
    pipeline.sold(2, "packets", "twiglets");
    pipeline.sold(5, "lbs", "potatoes");
    pipeline.sold(4, "boxes", "chocolate orange");
    pipeline.sold(1, "bottles", "washing-up liquid");
    pipeline.sold(1, "whole", "goose");
    pipeline.sold(1, "bottles", "mulled wine");
    pipeline.sold(1, "lbs", "brocolli");
    pipeline.sold(2, "lbs", "sugar");
    pipeline.sold(4, "lbs", "sprouts");
    pipeline.sold(3, "packets", "kitchen roll");
    pipeline.sold(1, "lbs", "tea");
    pipeline.sold(4, "cans", "dog food");

});
