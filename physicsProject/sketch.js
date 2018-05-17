var o;
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
var l = 0.496+0.614;
var rr = 0.1524;
var theta = 44*Math.PI/180;
var h = 0.48; //0.45085 0.1524
var hL = 0.123;
var projectiles = [];
var startpos;

var s = window.innerWidth/l*0.75;
var db = false;

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
	stroke(this.color);
	var numb = 100;
	for(var i = 0; i < this.pos.x-startpos.x; i += this.pos.x/numb){
		point(toVx(startpos.x+i), toVy(traj(i, vi)));
	}
}
projectile.prototype.d = function(i){
	stroke(this.color);
	ellipse(this.vpos.x, this.vpos.y, 2*r*s, 2*r*s)
	fill(this.color);
	text("(" + Math.round(1000*(this.pos.x-startpos.x))/1000 + ", " + Math.round(1000*this.pos.y)/1000 + ")", toVx(0.248), toVy(0.36+0.03*-i));
	noFill();
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
	textSize(s/35);
	noFill();
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	bgcolor = color(35,35,40);
	o = createVector(window.innerWidth/2-l/2*s, window.innerHeight/2 + h*s/2);
	startpos = createVector(0.496, hL);
	var projsinfo = [Math.sqrt((10/7)*g*(h-hL)), ev(0.368), ev(0.3555), ev(0.333)];
	var projscolor = [color(0,255,0), color(255,0,0), color(255,0,255), color(0,255,255)];
	for(var i = 0; i < projsinfo.length; i++){
		projectiles.push(new projectile(startpos.copy(), projsinfo[i], projscolor[i]));
	}
	console.log(0.108 + traj(0.108, projsinfo[3]));
	console.log(0.188, traj(0.188, projsinfo[3]));
	console.log(0.264, traj(0.264, projsinfo[3]));
	console.log(0.314, traj(0.314, projsinfo[3]));

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	s = window.innerWidth/l*0.75;
	o = createVector(window.innerWidth/2-l/2*s, window.innerHeight/2 + h*s/2);
	textSize(s/35);
}

function mouseWheel(e){
	s -= e.delta/5;
	textSize(s/35);
}

function draw(){
	textSize(s/35);
	var newt = tick()
	var dt = (newt-oldt)/10000;
	background(bgcolor)
	stroke(color(0,255,0))
	drawRamp();
	line(o.x, o.y, toVx(l), o.y);
	line(o.x, o.y, o.x, toVy(h));
	line(o.x, toVy(h+0.1), toVx(0.1), toVy(h+0.1))
	line(o.x, toVy(h+0.1-0.01), o.x, toVy(h+0.1+0.01))
	line(toVx(0.1), toVy(h+0.1-0.01), toVx(0.1), toVy(h+0.1+0.01))
	fill(0,255,0);
	text("0.1 m", toVx(0.03), toVy(h+0.15))
	line(toVx(0.03), toVy(h+0.15), toVx(0.05), toVy(h+0.11))
	noFill();
	rect(toVx(startpos.x+0.08185 + 0.3524), toVy(.3524), o.x-toVx(.3524), o.y-toVy(.3524))
	stroke(color(0,255,0));
	for(var i = 0; i < projectiles.length; i++){
		projectiles[i].update(dt);
		projectiles[i].drawtraj(projectiles[i].vi);
		projectiles[i].d(i);
	}
	if(mouseIsPressed){
		var dx = mouseX-pmouseX;
		var dy = mouseY-pmouseY;
		o.add(dx, dy);
	}
	if(projectiles[0].vel.mag() == 0 && !db){
		setTimeout(function(){
			for(var i = 0; i < projectiles.length; i++){
				projectiles[i].pos = startpos.copy();
				projectiles[i].vel = createVector(Math.cos(theta), Math.sin(theta)).mult(projectiles[i].vi);
				projectiles[i].accel = createVector(0,-g);
			}
			db = false;
		}, 3000)
		db = true;
	}
	//line(0, toVy(h), window.innerWidth, toVy(h));
	//line(0, toVy(hL), window.innerWidth, toVy(hL));
	//ellipse(startpos.x, startpos.y, r, r)
	oldt = newt;
}
