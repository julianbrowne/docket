Docket
======

Docket uses [postal](https://github.com/postaljs/postal.js), a node.js event bus and a [javascript finite state machine](https://github.com/jakesgordon/javascript-state-machine) to show how simple event pattern matching [can work using state machines](http://www.ics.uci.edu/~eppstein/161/960222.html). The state machine changes are animated in the browser using [D3](https://github.com/mbostock/d3).

A series of items are added to an imaginary shopping basket. As the state machine checks each one (coffee, sugar, dog food, etc.) it's looking for clues that it's Christmas (a complex event, implied by other events).

The state changes that trigger the state machine are the appearance of party crackers, sprouts and mince pies (in any order). As each trigger product is seen in the basket the state of the machine changes until the final one appears which triggers the "it's Christmas" event. Any other products have no effect on the state machine and the appearance of the same product more than once (mince pies followed by mince pies) simply causes the state machine to remain in the same state.

![state machine](https://raw.github.com/julianbrowne/docket/master/lib/docket.jpg)

The demo can easily be updated to represent other simple and complex events or modified to represent typical christmas purchases in other countries.

To run the demo download the repository:

    git clone https://github.com/julianbrowne/docket.git

(all npm package dependencies are included)

And run it

    node docket

The console output should look like this:

    Starting HTTP server
    Starting WS server on 9000
    Waiting for browser to connect at http://127.0.0.1:9000
    Browser connected
    listening to sales / new
    Sold - 1 bottles of olive oil
    Sold - 2 loaves of bread
    Sold - 1 packs of butter
    Sold - 1 litres of fabric conditioner
    Sold - 3 grams of cheese
    Sold - 1 boxes of crackers              << state change
    Sold - 1 jars of coffee
    Sold - 2 lbs of rice
    Sold - 2 bottles of port
    Sold - 3 packets of mince pies          << state change
    Sold - 1 whole of chicken
    Sold - 2 bottles of milk
    Sold - 1 cans of air freshener
    Sold - 2 packets of twiglets
    Sold - 5 lbs of potatoes
    Sold - 4 boxes of chocolate orange
    Sold - 1 bottles of washing-up liquid
    Sold - 1 whole of goose
    Sold - 1 bottles of mulled wine
    Sold - 1 lbs of brocolli
    Sold - 2 lbs of sugar
    Sold - 4 lbs of sprouts                 << state change
    Woot - It's Christmas!                  << complex event matched
    Sold - 3 packets of kitchen roll
    Sold - 1 lbs of tea
    Sold - 4 cans of dog food

Each sales event published to the bus is also emitted on a "sale" channel on a websocket. Connecting the browser to  http://127.0.0.1:9000 will load a page to watch these.

Similarly, for each state change, a web socket message is pushed on the "state-change" channel. This is used in the html page to animate a D3 state machine diagram showing the matching progress.

![screen shot](https://raw.github.com/julianbrowne/docket/master/lib/screen-shot.png)

