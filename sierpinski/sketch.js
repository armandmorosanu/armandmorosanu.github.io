var t;
var r;
var tria;
var triangles = [];
var nex;
var n = 0;
var numOfTimes = 6;
var drawtriangles;

function setup(){
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	var center = createVector(window.innerWidth/2, window.innerHeight/2);
	//canvas = createCanvas(1920, 1080);
	//var center = createVector(1920/2, 1080/2);
	r = window.innerHeight/2;
	bgcolor = color(35,35,40);
	strokeWeight(1)

	t = function(ps, c){
		this.points = ps;
		this.center = c;
	}
	t.prototype.d = function(){
		var ts = this.points;
		/*
		for(var i = 0; i < ts.length-1; i++){
			line(ts[i].x, ts[i].y, ts[i+1].x, ts[i+1].y)
		}
		line(ts[ts.length-1].x, ts[ts.length-1].y, ts[0].x, ts[0].y)
		*/
		triangle(ts[0].x, ts[0].y, ts[1].x, ts[1].y, ts[2].x, ts[2].y)
	}
	t.prototype.getMidpoints = function(){
		var mps = [];
		for(var i = 0; i < this.points.length-1; i++){
			mps.push(midpoint([this.points[i+1], this.points[i]]));
		}
		mps.push(midpoint([this.points[this.points.length-1], this.points[0]]));
		return mps;
	}
	t.prototype.next = function(){
		var mps = this.getMidpoints();
		nex.push(new t([this.points[0], mps[0], mps[2]], this.center));
		nex.push(new t([mps[0], this.points[1], mps[1]], this.center));
		nex.push(new t([mps[2], mps[1], this.points[2]], this.center));
	}
	drawtriangles = function(){
		background(bgcolor);
		/*for(var i = 0; i < triangles.length; i++){
			stroke(255-(255*(i/(triangles.length-1))), 255-(255*(i/(triangles.length-1))), 255-(255*(i/(triangles.length-1))));
			triangles[i].d()
		}*/
		triangles.sort(function(a, b){
			//return midpoint(b.points).y-midpoint(a.points).y; //vertical
			return midpoint(a.points).sub(triangles[0].center).mag()-midpoint(b.points).sub(triangles[0].center).mag(); //radial
		})
		var ti=0;

			while(ti < triangles.length){
				var r = (ti/triangles.length);
				stroke(255*r,120-120*r,255-255*r);
				fill(255*r,120-120*r,255-255*r);
				triangles[ti].d()
				ti++
			}
			//saveCanvas();
	}


	var sps = [];
	var nt = 3;
	var pos = center.copy().add(0,-r/4)
	for(var i = 0; i < nt; i++){
		sps.push(pos.copy().add(createVector(r*Math.cos(radians(-90+i*(360/nt))),r*-Math.sin(radians(-90+i*(360/nt))))));
	}
	triangles.push(new t(sps, pos));
	function step(){
		nex = [];
		if(n < numOfTimes){
			n++;
			for(var i = 0; i < triangles.length; i++){
				triangles[i].next();
			}
			triangles = nex;
			step();
		} else {
			drawtriangles();
		}

	}
	step();
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
	r = window.innerHeight/2;
	drawtriangles();
}
