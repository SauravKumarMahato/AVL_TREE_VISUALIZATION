class AVLTree {
    constructor() {
       // Initialize a root element to null.
       this.root = null;
    }
 
    getBalanceFactor(root) {
       return this.getHeight(root.left) - this.getHeight(root.right);
    }
 
    getHeight(root) {
       let height = 0;
       if (root === null || typeof root == "undefined") {
          height = -1;
       } else {
          height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
       }
       return height;
    }
 
    insert(data) {
       let node = new this.Node(data);
       // Check if the tree is empty
       if (this.root === null) {
          // Insert as the first element this.root = node;
       } else {
          insertHelper(this, this.root, node);
       }
    }
    inOrder() {
       inOrderHelper(this.root);
    }
 }
 
 AVLTree.prototype.Node = class {
    constructor(data, left = null, right = null) {
       this.data = data;
       this.left = left;
       this.right = right;
    }
 };
 
 function insertHelper(self, root, node) {
    if (root === null) {
       root = node;
    } else if (node.data < root.data) {
       // Go left!
       root.left = insertHelper(self, root.left, node);
       // Check for balance factor and perform appropriate rotation
       if (root.left !== null && self.getBalanceFactor(root) > 1) {
       if (node.data > root.left.data) {
          root = rotationLL(root);
       } else {
          root = rotationLR(root);
       }
    }
 } else if (node.data > root.data) {
    // Go Right! root.
    right = insertHelper(self, root.right, node);
    // Check for balance factor and perform appropriate rotation
    if (root.right !== null && self.getBalanceFactor(root) < -1) {
       if (node.data > root.right.data) {
          root = rotationRR(root);
       } else {
          root = rotationRL(root);
       }
    }
 }
 return root;
 }
 
 function inOrderHelper(root) {
    if (root !== null) {
       inOrderHelper(root.left);
       console.log(root.data);
       inOrderHelper(root.right);
    }
 }
 
 function rotationLL(node) {
    let tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
 }
 
 function rotationRR(node) {
    let tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
 }
 
 function rotationLR(node) {
    node.left = rotationRR(node.left);
    return rotationLL(node);
 }
 
 function rotationRL(node) {
    node.right = rotationLL(node.right);
    return rotationRR(node);
 }

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
