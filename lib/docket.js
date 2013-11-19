
var postal  = require('postal')();
var fsm     = require('./fsm');
var sleep   = require('sleep');
var content = require('node-static');
var file    = new content.Server('./public');

var Docket = {};

Docket.Pipe = function(socket) { 

    this.socket = socket;
    var pipe = this;

    /**
     *  Clear postal bus to cater for browser refreshes
    **/

    postal.utils.reset();   

    /**
     *  Generic event handler for postal messages
    **/

    this.eventHandler = function (tag) { 
        return function(event, from, to, msg) { 
            console.log(tag);
        };
    };

    this.basketWatch = fsm.StateMachine.create({ 
        initial: 'u',
        events: [ 
            { name: 'sprouts',     from: 'u',  to: 's' },
            { name: 'crackers',    from: 'u',  to: 'c' },
            { name: 'mince pies',  from: 'u',  to: 'm' },

            { name: 'sprouts',     from: 'c',  to: 'sc' },
            { name: 'sprouts',     from: 'm',  to: 'sm' },
            { name: 'sprouts',     from: 's',  to: 's' },

            { name: 'crackers',    from: 's',  to: 'sc' },
            { name: 'crackers',    from: 'm',  to: 'cm' },
            { name: 'crackers',    from: 'sc', to: 'sc' },
            { name: 'crackers',    from: 'cm', to: 'cm' },

            { name: 'mince pies',  from: 'c',  to: 'cm' },
            { name: 'mince pies',  from: 's',  to: 'sm' },
            { name: 'mince pies',  from: 'cm', to: 'cm' },
            { name: 'mince pies',  from: 'sm', to: 'sm' },

            { name: 'sprouts',     from: 'cm',  to: 'x' },
            { name: 'crackers',    from: 'sm',  to: 'x' },
            { name: 'mince pies',  from: 'sc',  to: 'x' }
        ],
        callbacks: { 
            onx:  this.eventHandler("Woot - It's Christmas!"),
            onenterstate: function(event, from, to) { 
                pipe.socket.emit('state-change', { 
                    event : event,
                    from : from,
                    to: to
                });
            }
        }
    });

    this.sold = function(quantity, units, product) { 

        //console.log("PUB: " + quantity + " " + units + " of " + product);

        postal.publish({ 
            channel : "sales",
            topic   : "new",
            data    : {
                product : product,
                quantity : quantity,
                units: units
            }
        });

        this.socket.emit('sale', { 
            product : product,
            quantity : quantity,
            units: units
        });

        sleep.sleep(1);

    };

    this.listen = function(channel, topic) { 
        console.log("listening to " + channel + " / " + topic);
        postal.subscribe({
            channel  : channel,
            topic    : topic,
            callback : function(data, envelope) { 
                console.log("Sold - " + data.quantity + " " + data.units + " of " + data.product);
                if(pipe.basketWatch[data.product] !== undefined)
                    if(pipe.basketWatch.can(data.product))
                        pipe.basketWatch[data.product]();
            }
        });
        this.socket.emit('state-reset', { });
    };

};

exports.handler = function(request, response) { 
    file.serve(request, response, function (err, res) { 
        if (err) { 
            console.error("ERROR: Problem serving " + request.url + " - " + err.message);
            response.writeHead(err.status, err.headers);
            response.end();
        }
        else {
            // console.log("> " + request.url + " - " + res.message);
        }
    });
};

exports.sold = Docket.sold;
exports.listen = Docket.listen;
exports.Pipe = Docket.Pipe;
