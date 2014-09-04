$(document).ready(function(){
    var treeData = {
        name: "Grove",
        contents: [
            {name: "First Tree",
            value: -6,
            contents: [
                {   name: "",
                    value: -13,
                    contents: [
                    {
                        name: "",
                        value: -17,
                        contents: [
                            { name: "two",
                            value: 16 },
                            { name: "three",
                            value: -16 },
                            { name: "4",
                            value: -5 }
                        ]
                    },
                    {
                        name: "",
                        value: -10,
                        contents: [
                            { name: "9" ,
                            value: -1
                        }
                        ]
                    },
                    {
                        name: "",
                        value: -1,
                        contents: [
                            {
                                name: "",
                                value: 9,
                                contents: [
                                    { name: "6",
                                    value: 19 },
                                    { name: "7",
                                    value: -55 },
                                    { name: "8",
                                    value: -19 }
                                ]
                            },
                            {
                                name: "",
                                value: 20,
                                contents: [
                                    { name: "ten",
                                    value: 12 }
                                ]
                            },
                            {
                                name: "",
                                value: -18,
                                contents: [
                                    { name: "11",
                                    value: 4},
                                    {
                                        name: "",
                                        value: 4,
                                        contents: [
                                        { name: 4,
                                        value: 4},
                                        { name: "13",
                                        value: 4},
                                        { name: "14",
                                        value: 4}
                                        ]
                                     }
                                ]
                            },
                            {
                                name: "",
                                value: -2,
                                contents: [
                                    { name: "1",
                                    value: -4 }
                                ]
                            }
                        ]
                    },
                    {
                        name: "5",
                        value: -32,
                        contents: []
                    }
                ]
            },
            ]

        },
            {
            name: "Second Tree",
            contents: [
                {   name: "",
                    contents: [
                    {
                        name: "",
                        contents: [
                            { name: "2T1" }
                        ]
                    },
                    {
                        name: "",
                        contents: [
                            { name: "2T2" },
                            { name: "2T3" }
                        ]
                    },
                    {
                        name: "",
                        contents: [
                            {
                                name: "",
                                contents: [
                                    { name: "2T4" },
                                    { name: "2T5" },
                                    { name: "2T6" },
                                    { name: "2T7" },
                                    { name: "2T8" },
                                    { name: "",
                                        contents: [
                                            { name: "2T9"  },
                                            { name: "2T10" }
                                            ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
            ]
        },
        {
        name: "Third Tree",
        contents: [
            {   name: "",
                contents: [
                {
                    name: "",
                    contents: [
                        {name: "",
                        contents:[
                            { name: "3T1" }
                        ]
                    },
                    ]
                },
                {
                    name: "",
                    contents: [
                        { name: "3T2" },
                        { name: "3T3" },
                        { name: "3T4" },
                        { name: "3T5",
                            contents: [
                                { name: "3T12" },
                                { name: "3T13" },
                                { name: "3T14" },
                                { name: "3T15" },
                                { name: "3T16" }
                                ]
                                },
                        { name: "3T6" },
                        { name: "3T7" },
                        { name: "3T8" },
                        { name: "3T9" },
                        { name: "3T10" },
                        { name: "3T11" }
                    ]
                },
                {
                    name: "",
                    contents: [
                        {
                            name: "",
                            contents: [
                                { name: "2T4" },
                                { name: "2T5" },
                                { name: "",
                                    contents: [
                                        { name: "2T9"  },
                                        { name: "2T10" }
                                        ]
                                },
                            ]
                        },
                    ]
                },
                ]
            }
            ]
        }
        ]



    };

    function visit(parent, visitFn, childrenFn)
    {
        if (!parent) return;

        visitFn(parent);

        var children = childrenFn(parent);
        if (children) {
            var count = children.length;
            for (var i = 0; i < count; i++) {
                visit(children[i], visitFn, childrenFn);
            }
        };
    }

    var ui;

    function buildTree(containerName, customOptions)
    {
        // build the options object
        var options = $.extend({
            nodeRadius: 4, fontSize: 22
        }, customOptions);


        // Calculate total nodes, max label length
        var totalNodes = 0;
        var maxLabelLength = 0;
        visit(treeData, function(d)
        {
            totalNodes++;
            maxLabelLength = Math.max(d.name.length, maxLabelLength);
        }, function(d)
        {
            return d.contents && d.contents.length > 0 ? d.contents : null;
        });

        // size of the diagram
        var size = { width:$(containerName).outerWidth() , height: (totalNodes * 8) };
        var tree = d3.layout.tree()
            .sort(null)
            .size([size.width - 200,size.height - 10])
            .children(function(d)
            {
                return (!d.contents || d.contents.length === 0) ? null : d.contents;
            });

        var nodes = tree.nodes(treeData);
        var links = tree.links(nodes);
        var svgRoot = d3.select(containerName)
            .append("svg:svg").attr("height", size.height+20).attr("width", size.width);
                 // Add the clipping path
        svgRoot.append("svg:clipPath").attr("id", "clipper")
            .append("svg:rect")
            .attr('id', 'clip-rect');

        var layoutRoot = svgRoot
            .append("svg:g")
            .attr("class", "container")
            .attr("transform", "translate(0," + size.height + ")");

        // Edges between nodes as a <path class="link" />
        var link = d3.svg.diagonal()
            .projection(function(d)
            { if(d.value !=undefined){
                return [(d.x - d.value) , (-d.y + d.value) ];
            }
            else{
                console.log(d.value);
                return [d.x , (-d.y ) ];
            }
            });

        var linkGroup = layoutRoot.append("svg:g");

        linkGroup.selectAll("path.link")
            .data(links)
            .enter()
            .append("svg:path")
            .attr("class", "link")
            .attr("d", link);


        var animGroup = layoutRoot.append("svg:g")
            .attr("clip-path", "url(#clipper)");

        var nodeGroup = layoutRoot.selectAll("g.node")
            .data(nodes)
            .enter()
            .append("svg:g")
            .attr("class", "node")
            .attr("transform", function(d)
            {
                var transpointx = d.x - d.value;
                var transpointy = -d.y + d.value;
                return "translate(" + transpointx + "," + transpointy + ")";
            });

        // Cache the UI elements
        ui = {
            svgRoot: svgRoot,
            nodeGroup: nodeGroup,
            linkGroup: linkGroup,
            animGroup: animGroup
        };

        // Attach the hover and click handlers
        setupMouseEvents();

        nodeGroup.append("svg:image")
            .attr("xlink:href", "svg-leave1.svg")
            .attr("width", 140)
            .attr("height", 140)
            .attr("transform", "translate(-25,-5)");

        nodeGroup.append("svg:text")
            .attr("text-anchor", function(d)
            {
                return d.children ? "end" : "start";
            })
            .attr("dx", function(d)
            {
                var gap = 2 * options.nodeRadius;
                return d.children ? -gap : gap;
            })
            .attr("dy", 3)
            .text(function(d)
            {
                return d.name;
            });
    }// close build tree
    var dur = 0;
    function setupMouseEvents(){
        ui.nodeGroup.on('mouseover', function(d, i)
        {
            d3.select(this).select("circle").classed("hover", true);
        })
            .on('mouseout', function(d, i)
            {
                d3.select(this).select("circle").classed("hover", false);
            })
            .on('click', function(nd, i)
            {
                // Walk parent chain
                var ancestors = [];
                var parent = nd;
                while (!_.isUndefined(parent)) {
                    ancestors.push(parent);
                    parent = parent.parent;
                };

                // Get the matched links
                var matchedLinks = [];
                ui.linkGroup.selectAll('path.link')
                    .filter(function(d, i)
                    {
                        return _.any(ancestors, function(p)
                        {
                            return p === d.target;
                        });
                    })
                    .each(function(d)
                    {
                        matchedLinks.push(d);
                    });
                var last_element = matchedLinks[matchedLinks.length - 1];
                var track = last_element.target.name;
                soundManager.play(track);
                // setTimeout(function(){dur = soundManager.getSoundById(track).duration
                // // var dur = soundManager.getSoundById(track).duration;
                // console.log(dur);
                animateParentChain(matchedLinks,soundManager);
                // },3000);
           });
        }

    function animateParentChain(links){
        var linkRenderer = d3.svg.diagonal()
            .projection(function(d){
                  if(d.value !=undefined){
                return [(d.x - d.value) , (-d.y + d.value) ];
            }
            else{
                console.log(d.value);
                return [d.x , (-d.y ) ];
            }
            });
        // Links
        ui.animGroup.selectAll("path.selected")
            .data([])
            .exit().remove();

        ui.animGroup
            .selectAll("path.selected")
            .data(links)
            .enter().append("svg:path")
            .attr("class", "selected")
            .attr("d", linkRenderer);


        // Animate the clipping path
        var overlayBox = ui.svgRoot.node().getBBox();

        ui.svgRoot.select("#clip-rect")
            .attr("x", overlayBox.x + overlayBox.width)
            .attr("y", overlayBox.y -540)
            .attr("width", 0)
            .attr("height", overlayBox.height)
            .transition().duration(5000)
            .attr("x", overlayBox.x)
            .attr("width", overlayBox.width);
    }
    //Soundmanager

    soundManager.setup({
    // where to find flash audio SWFs, as needed
        url: '/.',
        onready: function() {
         soundManager.createSound({
          id: 'two', // optional: provide your own unique id
          url: 'PIano Improvs6-first tree2.mp3',
          multiShot: false,
          onload: function() {
            if( this.readyState === 3 ) {
            soundDuration = this.duration;
            console.log(soundDuration);
                }
            }
        });
          soundManager.createSound({
          id: 'three', // optional: provide your own unique id
          url: 'PIano Improvs6-first tree3.mp3',
          multiShot: false,
          onload: function() {
            if( this.readyState === 3 ) {
            soundDuration = this.duration;
            console.log(soundDuration);
                }
            }
        });
          soundManager.createSound({
          id: 'ten', // optional: provide your own unique id
          url: 'PIano Improvs6-first tree3.mp3',
          multiShot: false,
          onload: function() {
            if( this.readyState === 3 ) {
            soundDuration = this.duration;
            console.log(soundDuration);
                }
            }
        });
        }
    });

    $(function(){
        buildTree("#tree-container");
    });
});