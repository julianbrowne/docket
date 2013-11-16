
var docket = require('./lib/docket');

docket.listen("sales", "new");

docket.sold(3, "grams", "cheese");
docket.sold(1, "box", "crackers");
docket.sold(5, "bottles", "port");
docket.sold(12, "packets", "mince pies");
docket.sold(1, "whole", "goose");
docket.sold(1, "box", "crackers");
docket.sold(4, "lbs", "sprouts");
