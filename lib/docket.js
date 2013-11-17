
var postal = require('postal')();
var fsm = require('./fsm');

var Docket = {};

Docket.sold = function(quantity, units, product) { 
    postal.publish({ 
        channel : "sales",
        topic   : "new",
        data    : {
            product : product,
            quantity : quantity,
            units: units
        }
    });
};

Docket.listen = function(channel, topic) { 
    console.log("listening to " + channel + " / " + topic);
    postal.subscribe({
        channel  : channel,
        topic    : topic,
        callback : function(data, envelope) { 
            console.log(data.quantity + " " + data.units + " of " + data.product);
            if(Docket.basketWatch[data.product] !== undefined)
                Docket.basketWatch[data.product]();
        }
    });
};

Docket.eventHandler = function (tag) { 
    return function(event, from, to, msg) { 
        console.log(tag);
    };
};

Docket.basketWatch = fsm.StateMachine.create({ 
    initial: 'unknown',
    events: [ 
        { name: 'sprouts',     from: 'unknown',  to: 's' },
        { name: 'crackers',    from: 'unknown',  to: 'c' },
        { name: 'mince pies',  from: 'unknown',  to: 'm' },

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
        onx:  Docket.eventHandler("christmas")
    }
});

exports.sold = Docket.sold;
exports.listen = Docket.listen;
