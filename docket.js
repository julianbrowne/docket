
var sio     = require('socket.io');
var http    = require('http');
var content = require('node-static');
var docket  = require('./lib/docket');

var file = new content.Server('./public');

var handler = function(request, response) { 
    file.serve(request, response, function (err, res) { 
        if (err) {
            console.error("*** Error serving " + request.url + " - " + err.message);
            response.writeHead(err.status, err.headers);
            response.end();
        } else {
            console.log("> " + request.url + " - " + res.message);
        }
    });
}

var srv = http.createServer(handler);

srv.listen(9000);

console.log('Open browser to http://127.0.0.1:9000');
console.log('Starting WS server on 9000');

var ws = srv.listen(9000);
var conn = sio.listen(ws, { log: false });

conn.sockets.on('connection', function (socket) { 

    var p = new docket.Pipe(socket);

    console.log('Got connection');

    p.listen("sales", "new");

    p.sold(3, "grams", "cheese");
    p.sold(1, "boxes", "crackers");
    p.sold(1, "jars", "coffee");
    p.sold(2, "lbs", "rice");
    p.sold(2, "bottles", "port");
    p.sold(3, "packets", "mince pies");
    p.sold(1, "whole", "chicken");
    p.sold(2, "bottles", "milk");
    p.sold(1, "cans", "air freshener");
    p.sold(2, "packets", "twiglets");
    p.sold(5, "lbs", "potatoes");
    p.sold(4, "boxes", "chocolate orange");
    p.sold(1, "bottles", "washing-up liquid");
    p.sold(1, "whole", "goose");
    p.sold(1, "bottles", "mulled wine");
    p.sold(1, "lbs", "brocolli");
    p.sold(2, "lbs", "sugar");
    p.sold(4, "lbs", "sprouts");
    p.sold(3, "packets", "kitchen roll");
    p.sold(1, "lbs", "tea");
    p.sold(4, "cans", "dog food");

});
