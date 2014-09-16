$(document).ready(function(){
    var treeData = {
        name: "Grove",
        value: 1,
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
                        value: 7,
                        contents: [
                            { name: "9" ,
                            value: -10
                        }
                        ]
                    },
                    {
                        name: "",
                        value: -1,
                        contents: [
                            {
                                name: "",
                                value: -18,
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
                                value: 5,
                                contents: [
                                    { name: "ten",
                                    value: -12 }
                                ]
                            },
                            {
                                name: "",
                                value: -12,
                                contents: [
                                    { name: "11",
                                    value: 4},
                                    {
                                        name: "",
                                        value: 4,
                                        contents: [
                                        { name: "4",
                                        value: 4},
                                        { name: "13",
                                        value: 1},
                                        { name: "14",
                                        value: 6}
                                        ]
                                     }
                                ]
                            },
                            {
                                name: "",
                                value: 3,
                                contents: [
                                    { name: "1",
                                    value: -4 }
                                ]
                            }
                        ]
                    },
                    {
                        name: "5",
                        value: -20,
                        contents: []
                    }
                ]
            },
            ]

        },
            {
            name: "Second Tree",
            value: 4,
            contents: [
                {   name: "",
                    value: 4,
                    contents: [
                    {
                        name: "",
                        value: 4,
                        contents: [
                            {
                                name: "2T1",
                                value: 4
                             }
                        ]
                    },
                    {
                        name: "",
                        value: 6,
                        contents: [
                            {
                                name: "2T2",
                                value: 14
                                 },
                            {
                                name: "2T3",
                                value: 4 }
                        ]
                    },
                    {
                        name: "",
                        value: 4,
                        contents: [
                            {
                                name: "",
                                value: 4,
                                contents: [
                                    {
                                        name: "2T4",
                                        value: 2 },
                                    {
                                        name: "2T5",
                                        value: 6 },
                                    {
                                        name: "2T6",
                                        value: -14 },
                                    {
                                        name: "2T7",
                                        value: 6 },
                                    {
                                        name: "2T8",
                                        value: 4 },
                                    {
                                        name: "",
                                        value: 4,
                                        contents: [
                                            {
                                                name: "2T9",
                                                value: -6 },
                                            {
                                                name: "2T10",
                                                value: 2 }
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
        value: 4,
        contents: [
            {
                name: "",
                value: 4,
                contents: [
                {
                    name: "",
                    value: 4,
                    contents: [
                        {
                        name: "",
                        value: 4,
                        contents:[
                            {
                                name: "3T1",
                                value: -4 }
                        ]
                    },
                    ]
                },
                {
                    name: "",
                    value: 4,
                    contents: [
                        {
                            name: "3T2",
                            value: 7 },
                        {
                            name: "3T3",
                            value: -4 },
                        {
                            name: "3T4",
                            value: 4 },
                        {
                            name: "3T5",
                            value: 1,
                            contents: [
                                {
                                    name: "3T12",
                                    value: -9 },
                                {
                                    name: "3T13",
                                    value: 12 },
                                {
                                    name: "3T14",
                                    value: 8 },
                                {
                                    name: "3T15",
                                    value: -6 },
                                {
                                    name: "3T16",
                                    value: 4 }
                                ]
                                },
                        {
                            name: "3T6",
                            value: 2 },
                        {
                            name: "3T7",
                            value: -4 },
                        {
                            name: "3T8",
                            value: 7 },
                        {
                            name: "3T9",
                            value: -3 },
                        {
                            name: "3T10",
                            value: 9 },
                        {
                            name: "3T11",
                            value: 4 }
                    ]
                },
                {
                    name: "",
                    value: 6,
                    contents: [
                        {
                            name: "",
                            value: -2,
                            contents: [
                                {
                                    name: "2T4",
                                    value: -3 },
                                {
                                    name: "2T5",
                                    value: 8 },
                                {
                                    name: "",
                                    value: 12,
                                    contents: [
                                        {
                                            name: "2T9",
                                            value: 11  },
                                        {
                                            name: "2T10",
                                            value: -4 }
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
            .size([size.width - 200,size.height - 20])
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
            .attr("transform", "translate(5," + size.height + ")");

        // Edges between nodes as a <path class="link" />
        var link = d3.svg.diagonal()
            .projection(function(d)
            { if(d.value !=undefined){
                return [(d.x - d.value) , (-d.y + d.value) ];
            }
            else{
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
        // var leaf = document.getElementById("leaf");
        // var svgDoc = leaf.contentDocument;
        // var svgItem = svgDoc.getElementById("leaf1");
        // svgItem.setAttribute("fill", "purple");

        jQuery("img.svg").each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');


            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);
                console.log($svg);
            }, 'xml');

        });
        nodeGroup.append("svg:path")
            .attr("width", 20)
            .attr("height", 20)
            .style("stroke", "black")  // colour the line
            .attr("d","m 31.508736,1032.8152 c 0.114788,-0.7208 -0.509927,-3.54 -0.677201,-4.1167 -0.168553,-0.5771 -1.391953,-2.6968 -1.391953,-2.6968 l 0.009,-0.065 c -0.50566,-2.179 -1.627074,-2.9144 -1.627074,-2.9144 -0.921711,-2.2609 -3.017748,-5.7708 -3.153444,-6.5926 -0.136123,-0.8214 -0.593138,-0.8185 -0.593138,-0.8185 -1.156832,5.5741 -7.352773,9.4127 -7.352773,9.4127 -2.270139,1.5325 -4.366603,3.5925 -4.366603,3.5925 -0.625568,1.0536 -2.235574,2.192 -2.7681177,2.5424 -0.5333972,0.3499 -0.7625446,0.7082 -1.183715,1.1321 -0.4207437,0.4239 -0.8542889,1.1739 -1.0761821,1.7117 -0.2231734,0.5383 -0.8939736,1.543 -0.8939736,1.543 -0.078516,0.1349 -0.1369764,0.2702 -0.1805016,0.413 -0.1600192,0.5241 -0.1280153,1.1476 -0.2026909,2.2 -0.094305,1.3388 0.2573108,2.3757 0.2573108,2.3757 1.162379,7.8516 7.1214921,5.7394 7.1214921,5.7394 1.100505,-0.6552 2.717338,-0.294 2.717338,-0.294 0.159166,1.5698 -3.449159,5.5649 -3.449159,5.5649 0.377219,0.5241 0.832953,0.1566 0.832953,0.1566 1.319838,-1.7113 3.410755,-5.3506 3.800348,-5.5402 0.390447,-0.1892 0.958835,0.1202 0.958835,0.1202 1.758077,2.8422 3.252016,2.8213 4.150257,2.9337 0.898667,0.1131 1.659932,-0.1195 2.187781,-0.2017 0.528277,-0.082 1.792642,-0.6686 2.389193,-1.0403 0.596551,-0.3716 0.853009,-0.9354 1.217852,-1.396 0.364844,-0.461 0.704511,-1.2749 0.704511,-1.2749 1.867744,-2.3273 1.883959,-4.1526 1.883959,-4.1526 -0.184342,-0.9166 0.128442,-2.367 0.128442,-2.367 1.095385,-4.0331 0.442933,-5.2471 0.557293,-5.9674 z")
            .attr("fill", "yellow")
            .attr("transform", "translate(-9,-15)")
            .attr("id", "leaf");


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
            .attr("x", overlayBox.x )
            .attr("y", 0)
            .attr("width", overlayBox.width)
            .attr("height", 50)
            .transition().duration(15000)
            .ease("linear")
            .attr("y", overlayBox.y -640)
            .attr("height", 50);
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