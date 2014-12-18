$(document).ready(function(){

    var ui;

    var treeData;
    
    d3.json("treeData.json", function(json) {
    treeData = json[0];
    
        var screenHeight = window.innerHeight;
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

        function buildTree(containerName, customOptions)
        {
            // Calculate total nodes, max label length
            var totalNodes = 0;
            var maxLabelLength = 0;

            // size of the diagram
            var size = { width:$(containerName).outerWidth() , height: screenHeight-30 };
            var tree = d3.layout.tree()
                .sort(null)
                .size([size.width -25, size.height])
                .children(function(d)
                {
                    return (!d.contents || d.contents.length === 0) ? null : d.contents;
                });
            
            var nodes = tree.nodes(treeData);
            var links = tree.links(nodes);
            var svgRoot = d3.select(containerName)
                .append("svg:svg").attr("height", size.height+10).attr("width", size.width);
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
                .data(nodes
                .filter(function(d){
                    if(d.token != undefined){
                    return d;}
                    })
                )
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
            smSetup();

            nodeGroup.append("svg:image")
                        .attr("id", "leaf")
                        .attr("xlink:href", "svg-leave3.svg")
                        .attr("width", 20)
                        .attr("height", 20)
                        .attr("transform", "translate(-10,-10)");
                        console.log(nodeGroup);

            var jsonStars=[
            {"name":"star3", "x":"5%","y":"79%", "w":18 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star12", "x":"13%","y":"75%", "w":30 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star2", "x":"16%","y":"94%", "w":20 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star1", "x":"19%","y":"30%", "w":15 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star10", "x":"22%","y":"80%", "w":22 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star4", "x":"33%","y":"40%", "w":12 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star5", "x":"38%","y":"78%", "w":20 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star16", "x":"42%","y":"24%", "w":14 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},  
            {"name":"star6", "x":"45%","y":"59%", "w":28 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star7", "x":"51%","y":"39%", "w":20 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star8", "x":"60%","y":"34%", "w":16 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star8", "x":"62%","y":"78%", "w":30 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star9", "x":"67%","y":"59%", "w":17 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star11", "x":"72%","y":"72%", "w":20 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star13", "x":"77%","y":"43%", "w":14 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star14", "x":"83%","y":"90%", "w":30 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star15", "x":"85%","y":"30%", "w":20 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},
            {"name":"star17", "x":"91%","y":"57%", "w":17 ,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"},              
            {"name":"star18", "x":"94%","y":"74%", "w":23,"url":"http://api.soundcloud.com/tracks/172116956",
                            "token":"&secret_token=s-9HnGy"}]
            var sky = d3.select(".box")
                    .selectAll("star")
                    .data(jsonStars)
                    .enter()
                    .append("svg")
                    .attr("class","star")
                    .style("position", "absolute")
                    .style("bottom", function(d){return d.y})
                    .style("left", function(d){return d.x})
                    .attr("width",30)
                    .attr("height",50);

            var stars = sky
                    .append("svg:image")
                    .attr("xlink:href", "star1.png")
                    .attr("width",function(d){return d.w})
                    .attr("height",50);
;
        
        }// close build tree

        var dur = 0;
        var matchedLinks = [];
        var track ="";

        function setupMouseEvents(){
            ui.nodeGroup.on('mouseover', function(d, i)
                {
                        d3.select(this).select("image")
                        .attr('href','svg-leave4.svg')
                        .attr("height", "24px")
                        .attr("width", "24px")
                        .classed("hovers", true);
                        
                })
                .on('mouseout', function(d, i)
                {if(d.name != ""){
                        d3.select(this).select("image")
                        .attr('href','svg-leave3.svg')
                        .attr("height", "20px")
                        .attr("width", "20px")
                        .classed("hovers", false);
                        }
                })
                .on('click', function(nd, i)
                {if(nd.name != ""){
                    d3.select(this).select("image")
                        .attr('href','svg-leave4.svg')
                        .attr("height", "24px")
                        .attr("width", "24px");
                    //animate leaf falling
                    var i, lDur, lDel, lY , lZ;
                    for (i=0, lDel=800, lY=35, lZ= 65; i<=17; i++, lDel+=2400, lY+=50, lZ+=50){
                        d3.select(this).select("image")
                        .transition()
                        .attr("transform", "translate(-45," + lY + ") rotate(75)")
                        .duration(1200)
                        .delay(lDel)
                        .transition()
                        .attr("transform", "translate(45," + lZ + ") rotate(25)")
                        .duration(1600)
                        .delay(lDel + 1200);
                    };
                   
                    soundManager.stop(track);
                    // Walk parent chain
                    var ancestors = [];
                    var parent = nd;
                    while (!_.isUndefined(parent)) {
                        ancestors.push(parent);
                        parent = parent.parent;
                    };

                    // Get the matched links
                    ui.linkGroup.selectAll('path.link')
                        .filter(function(d, i)
                        {   matchedLinks = [];
                            return _.any(ancestors, function(p)
                            {
                                return p === d.target;
                            });
                        })
                        .each(function(d)
                        {
                            matchedLinks.push(d);
                        });

                    //Find the end leaf
                    var last_element = matchedLinks[matchedLinks.length - 1];
                    track = last_element.target.name;
                    //play track
                    soundManager.play(track);
                    //set node to empty name so mouseout does not happen
                    nd.name ="";
                    //show controls
                    $(".buttons").fadeIn(2000);
                    $('#pause').click(function(){
                        $(this).find('img').toggle();
                        soundManager.togglePause(track);
                    });
                    $('#stop').click(function(){
                        soundManager.stop(track);
                    });
                }
           });
        }

        $('#reset').click(function(){location.reload();
        });

        //creats var for knowing length of caterpillar animation
        var nodeVPosition=0;

        function animateParentChain(links){
            var linkRenderer = d3.svg.diagonal()
                .projection(function(d){
                    if(d.value !=undefined){
                        nodeVPosition = d.y;
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
                .transition().duration(soundDuration)
                .ease("linear")
                .attr("y", overlayBox.y -(115 + nodeVPosition))
                .attr("height", 50);
        }
        //Soundmanager
        //set client id for soundcloud
        var sid = "/stream?client_id=d99a29c1a7bd281b1ef4a833d3ab6dad";
        //setup soundManager
        function smSetup(){
            var allNodes = ui.nodeGroup.data();
            $(allNodes).each(function(){
                if(this.name != ""){
                    var trackId = this.name;
                    var url = this.url;
                    var token = this.token;
                    soundManager.setup({
                // where to find flash audio SWFs, as needed
                    url: '/.',
                    onready: function() {
                      soundManager.createSound({
                        id: trackId, // optional: provide your own unique id
                        url: url + sid + token, multiShot: false,
                        onload: function() {
                          if( this.readyState ===3 ) {
                              soundDuration = this.duration;
                              animateParentChain(matchedLinks);
                              //animateParentChain(matchedLinks,soundManager);
                            }
                        }
                      })
                    }//close onready
                })//close soundmanager setup
            }
        });
        }
 

        $(function(){
            buildTree("#tree-container");
        });
    });
    
});
