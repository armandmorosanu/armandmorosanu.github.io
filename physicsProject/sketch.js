var o;
var s = 700; //1200;
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
var projectiles = [];
var startpos;

function ev(d){
	return (d/Math.cos(theta))*Math.sqrt(g/(2*hL+2*d*Math.tan(theta)))
}

function traj(x, vi){
		return hL + x * Math.tan(theta) - (g * x**2)/(2 * vi**2 * cos(theta)**2);
}


function projectile(pos, vi, color){
	this.pos = pos;
	this.vel = createVector(Math.cos(theta),Math.sin(theta)).mult(vi)
	this.accel = createVector(0,-g);
	this.vi = vi;
	this.color = color;
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
		this.pos.y = 0;
		//console.log(this.pos.x-(startpos.x))
	}
}
projectile.prototype.drawtraj = function(vi){
	var numb = 50;
	for(var i = 0; i < this.pos.x-startpos.x; i += this.pos.x/numb){
		point(toVx(startpos.x+i), toVy(traj(i, vi)));
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
	o = createVector(20, window.innerHeight/2 + h*s/2);
	startpos = createVector(0.496, hL);
	var projsinfo = [Math.sqrt((10/7)*g*(h-hL)), ev(0.333), ev(0.368), ev(0.3555)];
	var projscolor = [color(0,255,0), color(255,0,0), color(0,255,255), color(255,255,0)];
	for(var i = 0; i < projsinfo.length; i++){
		projectiles.push(new projectile(startpos.copy(), projsinfo[i], projscolor[i]));
	}
	console.log(0.108 + traj(0.108, projsinfo[6])*100/2.54);
	console.log(0.188, traj(0.188, projsinfo[6])*100/2.54);
	console.log(0.264, traj(0.264, projsinfo[6])*100/2.54);
	console.log(0.314, traj(0.314, projsinfo[6])*100/2.54);

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	o = createVector(20, window.innerHeight/2 + h*s/2);
}

function mouseWheel(e){
	s -= e.delta/5;
	o.add(mouseX-o.x, mouseY-o.y).mult(e.delta/1000)
}

function draw(){
	var newt = tick()
	var dt = (newt-oldt)/10000;
	background(bgcolor)
	stroke(color(0,255,0))
	drawRamp();
	line(o.x, o.y, toVx(l), o.y);
	line(o.x, o.y, o.x, toVy(h));
	line(o.x, toVy(h+0.1), toVx(0.1), toVy(h+0.1))
	textSize(15)
	text("10 cm", toVx(0.03), toVy(h+0.105))
	rect(toVx(startpos.x+0.08185 + 0.3524), toVy(.3524), o.x-toVx(.3524), o.y-toVy(.3524))
	stroke(color(0,255,0));
	for(var i = 0; i < projectiles.length; i++){
		stroke(projectiles[i].color);
		projectiles[i].update(dt);
		projectiles[i].drawtraj(projectiles[i].vi);
		projectiles[i].d();
	}
	if(mouseIsPressed){
		var dx = mouseX-pmouseX;
		var dy = mouseY-pmouseY;
		o.add(dx, dy);
	}
	if(projectiles[0].vel.mag() == 0){
		for(var i = 0; i < projectiles.length; i++){
			projectiles[i].pos = startpos.copy();
			projectiles[i].vel = createVector(Math.cos(theta), Math.sin(theta)).mult(projectiles[i].vi);
			projectiles[i].accel = createVector(0,-g);
		}
	}
	//line(0, toVy(h), window.innerWidth, toVy(h));
	//line(0, toVy(hL), window.innerWidth, toVy(hL));
	//ellipse(startpos.x, startpos.y, r, r)
	oldt = newt;
}
