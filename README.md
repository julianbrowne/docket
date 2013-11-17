Docket
======

Docket uses [postal](https://github.com/postaljs/postal.js), a node.js event bus and a [javascript finite state machine](https://github.com/jakesgordon/javascript-state-machine) to show how simple event pattern matching can work using state machines.

A series of items are added to an imaginary shopping basket. As the state machine checks each one (coffee, sugar, dog food, etc.) it's looking for clues that it's Christmas (a complex event, implied by other events).

The state changes that trigger the state machine are the appearance of party crackers, sprouts and mince pies (in any order). As each trigger product is seen in the basket the state of the machine changes until the final one appears which triggers the "it's Christmas" event. Any other products have no effect on the state machine and the appearance of the same product more than once (mince pies followed by mince pies) simply causes the state machine to remain in the same state.

The demo can easily be updated to represent other simple and complex events or modified to represent typical christmas purchases in other countries.

To run the demo download the repository:

    git clone https://github.com/julianbrowne/docket.git

(all npm package dependencies are included)

And run it

    node docket

The output should look like this:

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
4 lbs of sprouts
christmas                           << complex event matched
3 packets of kitchen roll
4 cans of dog food
1 lbs of tea
