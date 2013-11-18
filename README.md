Docket
======

Docket uses [postal](https://github.com/postaljs/postal.js), a node.js event bus and a [javascript finite state machine](https://github.com/jakesgordon/javascript-state-machine) to show how simple event pattern matching can work using state machines. The state machine changes are animated in the browser using [D3](https://github.com/mbostock/d3).

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

    listening to sales / new
    3 grams of cheese
    1 boxes of crackers                 << state change 1
    1 jars of coffee
    2 lbs of rice
    2 bottles of port
    3 packets of mince pies             << state change 2
    1 whole of chicken
    2 bottles of milk
    1 cans of air freshener
    2 packets of twiglets
    5 lbs of potatoes
    4 boxes of chocolate orange
    1 bottles of washing-up liquid
    1 whole of goose
    1 bottles of mulled wine
    1 lbs of brocolli
    2 lbs of sugar
    4 lbs of sprouts                    << state change 3
    christmas                           << complex event matched
    3 packets of kitchen roll
    4 cans of dog food
    1 lbs of tea

Each sales event published to the bus is also emitted on a "sale" channel on a websocket. Connecting the browser to  http://127.0.0.1:9000 will load a page to watch these.

Similarly, for each state change, a web socket message is pushed on the "state-change" channel. This is used in the html page to animate a D3 state machine diagram showing the matching progress.

![screen shot](https://raw.github.com/julianbrowne/docket/master/lib/screen-shot.png)

