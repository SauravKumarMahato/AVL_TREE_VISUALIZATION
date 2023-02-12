canvas_height = 1000;
canvas_width = 1000;
var canvas = d3.select("body").append("svg")
.attr("width", canvas_width)
.attr("height", canvas_height)
.append("g")
.attr("transform", "translate(50, 50)")
.attr("id", "diagram")

var tree = d3.layout.tree().size([1000, 200]);

d3.json("mydata.json", function (data) {
var nodes = tree.nodes(data);
var links = tree.links(nodes);

var node = canvas
  .selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

node.append("circle").attr("r", 30).attr("fill", "#489c5e");

node
  .append("text")
  .text(function (d) {
    return d.value;
  })
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  .attr("transform", "scale(1.5)");

var diagonal = d3.svg.diagonal();

canvas
  .selectAll(".link")
  .data(links)
  .enter()
  .append("path")
  .attr("class", "link")
  .attr("fill", "none")
  .attr("stroke", "#489c5e")
  .attr("d", diagonal);
});
