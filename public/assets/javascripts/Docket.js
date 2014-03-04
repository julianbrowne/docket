function Docket() { 

    var docket = this;

    this.ui = {
        stateMachine: '#state-machine',
        eventLog: '#event-log',
        stateLog: '#state-log'
    };

    this.statesData = [ 
        { id: 'u',  label1: 'unknown', x: 100, y: 250   },
        { id: 'm',  label1: 'mince pies',  x: 350, y: 50  },
        { id: 'c',  label1: 'crackers',  x: 350, y: 250 },
        { id: 's',  label1: 'sprouts',  x: 350, y: 450 },
        { id: 'cm', label1: 'crackers', label2: 'mince pies', x: 550, y: 50  },
        { id: 'sm', label1: 'sprouts',  label2: 'mince pies', x: 550, y: 250 },
        { id: 'sc', label1: 'sprouts',  label2: 'crackers', x: 550, y: 450 },
        { id: 'x',  label1: 'christmas',  x: 750, y: 250 }
    ];

    this.transitionsData = [ 
        { from: 0, to: 3, label: 'sprouts' },
        { from: 0, to: 2, label: 'crackers' },
        { from: 0, to: 1, label: 'mince pies' },
        { from: 3, to: 6, label: 'crackers' },
        { from: 3, to: 5, label: 'mince pies' },
        { from: 2, to: 6, label: 'sprouts' },
        { from: 2, to: 4, label: 'mince pies' },
        { from: 1, to: 5, label: 'sprouts' },
        { from: 1, to: 4, label: 'crackers' },
        { from: 6, to: 7, label: 'mince pies' },
        { from: 5, to: 7, label: 'crackers' },
        { from: 4, to: 7, label: 'sprouts' }
    ];

    this.svg = d3.select(this.ui.stateMachine)
        .append("svg")
        .attr("width", "960px")
        .attr("height", "500px");

    this.transitionsData.forEach( 
        function(transition){ 
            var klass = docket.statesData[transition.from].id + "-" + docket.statesData[transition.to].id;
            docket.svg.append("line")
                .attr("x1", docket.statesData[transition.from].x)
                .attr("y1", docket.statesData[transition.from].y)
                .attr("x2", docket.statesData[transition.to].x)
                .attr("y2", docket.statesData[transition.to].y)
                .attr("stroke-width", 2)
                .attr("class", klass)
                .attr("stroke", "#475592");
            docket.svg.append("text")
                .attr("x", docket.statesData[transition.from].x + ((docket.statesData[transition.to].x-docket.statesData[transition.from].x)/4))
                .attr("y", docket.statesData[transition.from].y + ((docket.statesData[transition.to].y-docket.statesData[transition.from].y)/4) - 5)
                .attr('class', 'state-change-label ' + klass)
                .text(transition.label);
        }
    );

    this.statesVis = this.svg
        .selectAll("g.state")
        .data(this.statesData);

    this.state = this.statesVis.enter()
        .append("g")
        .attr({ 
            "transform": function( d) { return "translate("+ [d.x,d.y] + ")"; },
            'class': 'state'
        });

    this.state.append("circle")
        .attr({r: 50})
        .attr({'class': function(d){return d.id} });

    this.state.append("text")
        .attr("text-anchor", "middle")
        .attr('class', 'label')
        .text(function(d) { return d.label1 });

    this.state.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 20)
        .attr('class', 'label')
        .text(function(d) { if(d.label2 !== undefined) return d.label2 });

    this.socket = new io.connect('http://127.0.0.1');

    this.reset = function(data) { 
        svg = d3.selectAll('circle')
            .classed('active', false)
            .classed('was-active', false)
            .attr('class', function(d) { return d.id });
        svg = d3.select('circle.u')
            .attr('class', function(d) { return 'active ' + d.id });
    };

    this.socket.on('disconnect',  this.reset);
    this.socket.on('state-reset', this.reset);

    this.socket.on('sale', function(data) { 
        console.log("sale => " + JSON.stringify(data));
        $(docket.ui.eventLog).html("Event: " + data.quantity + " " + data.units + " " + data.product);
    });

    this.socket.on('state-change', function(data) { 

        $(docket.ui.stateLog).append("<p>Received '" 
            + data.event + "' event so changing state from '" 
            + docket.getLabel(data.from) + "' to '" 
            + docket.getLabel(data.to) + "'</p>");

        docket.svg = d3.select('circle.' + data.to)
            .attr('class', function(d) { return 'active ' + d.id });

        d3.select("line." + data.from + "-" + data.to)
            .attr("stroke-width", 4)
            .attr("stroke", "orange");

        d3.select("text." + data.from + "-" + data.to)
            .attr("stroke", "orange");

        svg = d3.select('circle.' + data.from)
            .classed('active', false)
            .attr('class', function(d) { return 'was-active ' + d.id });
    });

    this.start = function() { 
        this.socket.emit('shop', { });
    };

    this.getLabel = function(id) { 
        var label = "undefined";
        for(var i=0; i<this.statesData.length; i++) { 
            if(this.statesData[i].id === id) { 
                label = this.statesData[i].label1;
                if(this.statesData[i].label2 !== undefined)
                    label += ' + ' + this.statesData[i].label2;
                break;
            }
        }
        return label;
    };

    window.onbeforeunload = function() { 
        socket.onclose = function () {};
        socket.disconnect()
    };

};