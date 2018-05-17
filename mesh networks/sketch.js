var width = window.innerWidth;
var height = window.innerHeight;
var p;
var x;

function setup() {
	width = window.innerWidth;
  height = window.innerHeight;
	createCanvas(width,height);
	bgcolor = color(35,35,40);
	x = new shape(width/2, height/2, 5, height/2-10);
}
function windowResized(){
	width = window.innerWidth;
  height = window.innerHeight;
	resizeCanvas(width,height);
}

function shape(x,y,n,r){
	this.pos = createVector(x,y);
	this.sides = n;
	this.color = {
		r: 255,
		g: 0,
		b: 0
	};
	this.radius = r;
	this.rot = 0;
	this.points = [];
  this.lines = [];
	for(k = 0; k < 360; k += (360/this.sides)) {
		this.points.push(createVector(Math.cos(k*Math.PI/180), Math.sin(k*Math.PI/180)));
	}
}
shape.prototype.tp = function(x){
	return x.copy().rotate(this.rot).setMag(this.radius).add(this.pos);
};
shape.prototype.d = function(){
	stroke(this.color.r, this.color.g, this.color.b)
	for(var i = 0; i < this.points.length-1; i++) {
		for(var z = 1; z < this.points.length; z++) {
			line(this.tp(this.points[i]).x, this.tp(this.points[i]).y, this.tp(this.points[z]).x, this.tp(this.points[z]).y)
		}
	}
	 line(this.tp(this.points[this.points.length-1]).x, this.tp(this.points[this.points.length-1]).y, this.tp(this.points[0]).x, this.tp(this.points[0]).y)
	};
shape.prototype.update = function(){
	this.rot += -Math.PI/1000;
	if(this.color.r == 255 && this.color.g < 255){
		this.color.g++
	}
	if(this.color.g == 255 && this.color.r > 0){
		this.color.r--
	}
	if(this.color.g == 255 && this.color.b < 255){
		this.color.b++
	}
	if(this.color.b == 255 && this.color.g > 0){
		this.color.g--
	}
	if(this.color.b == 255 && this.color.r < 255){
		this.color.r++
	}
	if(this.color.r == 255 && this.color.b > 0){
		this.color.b--
	}
};
shape.prototype.updateSides = function(){
	this.pos = createVector(window.innerHeight/2, window.innerWidth/2);
	this.points = [];
	for(k = 0; k < 360; k += (360/this.sides)) {
		this.points.push(createVector(Math.cos(k*Math.PI/180), Math.sin(k*Math.PI/180)));
	}
	this.sides = 2.9 + mouseX/windowWidth*7;
}
function mouseMoved() {
  x.updateSides();
}
function draw(){
	background(bgcolor);
  if(x !== undefined){
    x.d();
		x.update();
  }
}
