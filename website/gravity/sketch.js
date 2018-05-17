var p;
var ps = [];
var g = 6.674*(10**-11);
var scl = 1;
var nc = 0;

function setup(){
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	bgcolor = color(35,35,40);

	p = function(m, v, p, vel){
		if(vel == undefined){
			vel = createVector(0,0);
		}
		this.mass = m;
		//this.volume = this.mass/10**7.5;
		this.volume = v;
		this.radius = Math.sqrt(this.volume/PI);
		this.pos = p.mult(scl);
		this.forces = [];
		this.net = createVector(0,0);
		this.vel = vel;
		this.accel = createVector(0,0);
		this.t = false;
		ps.push(this);
	}
	p.prototype.d = function(){
		var x = (this.mass/this.volume**2)
		var col = color(0,255-x**0.35,255)
		stroke(col)
		fill(col)
		ellipse(this.pos.x/scl, this.pos.y/scl, this.radius*2/scl, this.radius*2/scl);
		stroke(255,0,0)
		fill(255,0,0)
		/*for(var i = 0; i < this.forces.length; i++){
			var fpos = this.pos.copy().add(this.forces[i].copy().div(10**7));
			line(fpos.x/scl, fpos.y/scl, this.pos.x/scl, this.pos.y/scl)
		}*/
		//var acpos = this.pos.copy().add(this.accel.mult(10**4));
		//line(acpos.x/scl, acpos.y/scl, this.pos.x/scl, this.pos.y/scl);
	}
	p.prototype.update = function(){
		this.forces = [];
		this.net = createVector(0,0);
		for(var i = 0; i < ps.length; i++){
			if(ps[i] !== this){
				var dist = ps[i].pos.copy().sub(this.pos);
				var d = dist.mag();

				if(d <= this.radius+ps[i].radius){

					var mass = ps[i].mass+this.mass;
					var volume = ps[i].volume+this.volume;
					var pos;
					if(ps[i].volume > this.volume){
						for(var v = 0; v < ps.length; v++){
							if(ps[v] == this){
								ps.splice(v, 1)
							}
						}
					} else {
						this.vel = ps[i].vel.copy().mult(ps[i].mass).copy().add(this.vel.copy().mult(this.mass)).div(ps[i].mass+this.mass);
						this.mass += ps[i].mass;
						this.volume += ps[i].volume;
						this.radius = Math.sqrt(this.volume/PI);
						ps.splice(i, 1)
					}


			}else{
				//console.log("v = " + Math.sqrt(((5.972*10**24)*g)/d))
				var f = dist.copy().normalize().mult(g*((ps[i].mass*this.mass)/(d**2)))
				this.forces.push(f);
			}
		}
	}
		for(var i = 0; i < this.forces.length; i++){
			this.net.add(this.forces[i]);
		}
		this.accel = this.net.copy().div(this.mass);
		this.vel.add(this.accel);
		this.pos.add(this.vel);
		}
		/*
		var dis = 20;
		var tot = 15;
		for(var x = 0; x < tot; x++){
			for(var y = 0; y < tot; y++){
				new p(10**9, 10, center.copy().sub(dis*tot/2,dis*tot/2).add(x*dis, y*dis));
			}
		}
		*/
		var x = new p(10**11, 300, createVector(window.innerWidth/2, window.innerHeight/2).add(0,0), createVector(0, 0));
		//new p(10**11, 100*PI, center.copy().add(100,0), createVector(0, 0));
		for(var i = 0; i < 10; i++){
			var y = new p(10**0, 10, x.pos.copy().add(0,x.radius).add(0,5*(i+1)));
			y.vel = createVector(1*Math.sqrt((g*x.mass)/x.pos.copy().sub(y.pos).mag()),0)
		}
		//new p(10**9, 10, center.copy().add(0,200), createVector(0.18,0));
		//new p(10**9, 10, center.copy().add(0,250), createVector(0.17,0));
		//new p(10**9, 10, center.copy().add(0,300), createVector(0.16,0));
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
	//new p(1000000, 10000, center);
	var mass = 10**11;
	var volume = 300;
function mouseReleased(){
	new p(mass, volume, createVector(mouseX, mouseY), createVector((mouseX-pmouseX)/2, (mouseY-pmouseY)/2));
}

function draw(){
	background(bgcolor)
	if(mouseIsPressed){
		ellipse(mouseX,mouseY, 10, 10)
	}
	var num = 1;
	for(var v = 0; v < num; v++){
		for(var i = 0; i < ps.length; i++){
			ps[i].update();
		}
	}
	for(var i = 0; i < ps.length; i++){
		ps[i].d();
	}
}

/*
setTimeout(function(){
	setInterval(drawx, 100)
}, 0)
*/
