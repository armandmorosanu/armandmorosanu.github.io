var o;
var s = 350; //1200;
var g = 9.80665;

//ball properties
var m = 13.753;
var r = 0.0075;
//ramp properties
function f(x){
	return (74.68127586*(x-0.248)**4 - 11.70262202*(x-0.248)**3 + 0.019);
}
function drawRamp(){
	var length = 0.496;
	var step = 1000;
	for(var i = 0; i < length; i = i+length/step){
		point(toVx(i), toVy(f(i)));
	}
}
var l = 1.19;
var rr = 0.1524;
var theta = 44*Math.PI/180;
var h = 0.48; //0.45085 0.1524
var hL = 0.123;
var vi;
var startpos;

function ev(d){
	return (d/Math.cos(theta))*Math.sqrt(g/(2*hL+2*d*Math.tan(theta)))
}


function projectile(pos,vel){
	this.pos = pos;
	this.vel = vel;
	this.accel = createVector(0,-g);
}
var projpass = false;
projectile.prototype.update = function(dt){
	this.vpos = toV(this.pos);
	//console.log(this.pos)
	this.vel.add(this.accel.copy().mult(dt));
	this.pos.add(this.vel.copy().mult(dt));

	if(this.pos.y <= 0){
		this.accel.mult(0);
		this.vel.mult(0)
		this.pos.y = r/2;
		//console.log(this.pos.x-(startpos.x))
	}
}
projectile.prototype.d = function(){
	ellipse(this.vpos.x, this.vpos.y, 2*r*s, 2*r*s)
	text("(" + Math.round(1000*(this.pos.x-startpos.x))/1000 + ", " + Math.round(1000*this.pos.y)/1000 + ")", this.vpos.x, this.vpos.y-2*r*s)
}
function tick(){
	var date = new Date();
	var t = date.getTime();
	return t;
}
function toW(v){
	return createVector((v.x-o.x)/s, (Math.abs(v.y-o.y))/s);
}
function toV(v){
	return createVector(o.x+v.x*s, o.y-v.y*s);
}
function toVx(x){
	return o.x+x*s;
}
function toVy(y){
	return o.y-y*s;
}

var oldt = tick();
var b;
function setup(){

	noFill();
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	bgcolor = color(35,35,40);

	hL;
	console.log(hL)
	console.log(h-hL)
	vi = Math.sqrt((10/7)*g*(h-hL));
	o = createVector(20, window.innerHeight/2 + h*s/2);
	console.log(vi)
	startpos = createVector(0.496, hL);
	b = new projectile(startpos.copy(), createVector(Math.cos(theta),Math.sin(theta)).mult(vi));
	eb = new projectile(startpos.copy(), createVector(Math.cos(theta),Math.sin(theta)).mult(ev(0.34)));

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

setInterval(function(){
	var newt = tick()
	var dt = (newt-oldt)/10000;
	background(bgcolor)
	drawRamp();
	line(o.x, o.y, toVx(l), o.y);
	line(o.x, o.y, o.x, toVy(h));
	line(o.x, toVy(h+0.1), toVx(0.1), toVy(h+0.1))
	text("10 cm", toVx(0.03), toVy(h+0.105))
	rect(toVx(startpos.x +0.068), toVy(.22), toVx(.22), o.y-toVy(.22))
	stroke(color(0,255,0));
	b.update(dt);
	b.d();
	stroke(color(255,0,0));
	eb.update(dt);
	eb.d();
	stroke(color(0,255,0));
	//line(0, toVy(h), window.innerWidth, toVy(h));
	//line(0, toVy(hL), window.innerWidth, toVy(hL));
	//ellipse(startpos.x, startpos.y, r, r)
	oldt = newt;
}, 0)
