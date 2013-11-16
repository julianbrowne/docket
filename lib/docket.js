
var postal = require('postal')();

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
        }
    });
};

exports.sold = Docket.sold;
exports.listen = Docket.listen;
