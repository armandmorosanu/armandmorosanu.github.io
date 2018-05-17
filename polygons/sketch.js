var shapes = [];

function setup() {
	bgcolor = color(35,35,40);
	createCanvas(window.innerWidth, window.innerHeight);
}

function windowResized(){
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function circlepoints(x,y,n,r) {
	var points = [];
	for(k = 0; k < 360; k += (360/n)) {
		var t = k - 90;
		var l = createVector(x+(r*Math.cos(t*Math.PI/180)),y+(r*Math.sin(t*Math.PI/180)));
		points.push(l);
	}
	return points;
}

function shape(x,y,n,r){
	this.pos = createVector(x,y);
	this.sides = n;
	this.color = {
		r: rand(0,255),
		g: rand(0,255),
		b: rand(0,255)
	};
	this.rotspeed = rand(-0.05,0.05);
	this.radius = r;
	this.vel = createVector(rand(-0.5, 0.5), rand(-0.5, 0.5))
	this.rot = rand(0,360);
	this.points = [];
	for(k = 0; k < 360; k += (360/this.sides)) {
		this.points.push(createVector(Math.cos(k*Math.PI/180), Math.sin(k*Math.PI/180)));
	}
}
shape.prototype.tp = function(x){
	return x.copy().rotate(this.rot).setMag(this.radius).add(this.pos);
};
shape.prototype.update = function(){
	this.pos.add(this.vel)
	this.rot += this.rotspeed;
	this.radius *= 0.99;
};
shape.prototype.d = function(){
	stroke(this.color.r, this.color.g, this.color.b)
	for(var i = 0; i < this.points.length-1; i++) {
		line(this.tp(this.points[i]).x, this.tp(this.points[i]).y, this.tp(this.points[i+1]).x, this.tp(this.points[i+1]).y)
	}
		line(this.tp(this.points[this.points.length-1]).x, this.tp(this.points[this.points.length-1]).y, this.tp(this.points[0]).x, this.tp(this.points[0]).y)
	};


function mousePressed() {
	shapes.push(new shape(mouseX, mouseY, rand(3,10,true), 20));
}
function draw(){
	background(bgcolor);
	if(frameRate() >= 60 && Math.random() > 0.3){
		shapes.push(new shape(
			rand(0,windowWidth),
			rand(0,windowHeight),
			rand(3,10,true),
			rand(10,20)
		));
	}
	for(sh = 1; sh < shapes.length; sh++){
		shapes[sh].update();
		shapes[sh].d();
		if(shapes[sh].radius <= 3){
			shapes.splice(sh,1);
		}
	}
}
