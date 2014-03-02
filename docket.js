
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
    var shop = new docket.Pipe(socket);
    shop.listen("sales", "new");

    socket.on('shop', function(data) { 

        console.log('Starting to shop');

        shop.sold(1, "bottles", "olive oil");
        shop.sold(2, "loaves", "bread");
        shop.sold(1, "packs", "butter");
        shop.sold(1, "litres", "fabric conditioner");
        shop.sold(3, "grams", "cheese");
        shop.sold(1, "boxes", "crackers");
        shop.sold(1, "jars", "coffee");
        shop.sold(2, "lbs", "rice");
        shop.sold(2, "bottles", "port");
        shop.sold(3, "packets", "mince pies");
        shop.sold(1, "whole", "chicken");
        shop.sold(2, "bottles", "milk");
        shop.sold(1, "cans", "air freshener");
        shop.sold(2, "packets", "twiglets");
        shop.sold(5, "lbs", "potatoes");
        shop.sold(4, "boxes", "chocolate orange");
        shop.sold(1, "bottles", "washing-up liquid");
        shop.sold(1, "whole", "goose");
        shop.sold(1, "bottles", "mulled wine");
        shop.sold(1, "lbs", "brocolli");
        shop.sold(2, "lbs", "sugar");
        shop.sold(4, "lbs", "sprouts");
        shop.sold(3, "packets", "kitchen roll");
        shop.sold(1, "lbs", "tea");
        shop.sold(4, "cans", "dog food");

    });

});
