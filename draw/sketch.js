var drawcolor;
var bgcolor;
var changeColor;
var canvas;
var c;
var prev = [];
var index = 0;
function setup(){
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	savec();
  bgcolor = color(35,35,40);
  drawcolor = color(255,255,255);
	stroke(drawcolor);
	fill(drawcolor);
	changecolor = function(color){
		stroke(color);
		fill(color);
	}
	textSize(15);
}
function windowResized(){
	resizeCanvas(window.innerWidth, window.innerHeight);
}

function savec(){
	prev.push(canvas.canvas.toDataURL());
	index++;
};
function drawc(c){
	background(bgcolor);
	var img = new Image();
	img.src = c;
	ctx = canvas.canvas.getContext("2d");
	ctx.drawImage(img,0,0);
};


var pos;
var d = 0;
var w = 1;
function keyPressed(){
	if(keyCode == SHIFT){
		pos = createVector(mouseX, mouseY)
	}
	if(((keyCode >= 65 && keyCode  <= 90) || (keyCode >= 48 && keyCode <= 57))){
		if(keyIsDown(32)){
			strokeWeight(1)
			text(String.fromCharCode(keyCode),mouseX+d,mouseY, keyCode);
			d+=10
			savec(); 1
		} else {
			if(keyCode  == 49){
				drawcolor = color(255,255,255)
			}
			if(keyCode  == 50){
				drawcolor = color(255,0,0)
			}
			if(keyCode  == 51){4
				drawcolor = color(0,255,0)
			}
			if(keyCode  == 52){
				drawcolor = color(0,120,255)
			}

			if(keyCode == 83){
				console.log(canvas);
				c = canvas.canvas.toDataURL()
				console.log(c);
			}
			if(keyCode == 90){
				index--;
				if(index < 0){
					index = 0;
				}
				drawc(prev[index])
			}
			if(keyCode == 89){
				index++;
				if(index > prev.length-1){
					index = prev.length-1;
				}
				drawc(prev[index])
			}



		}
	}
}
function keyReleased(){
	if(keyCode == SHIFT){
		line(pos.x, pos.y, mouseX, mouseY);
		savec();
	}
	if(keyCode == 32){
		d = 0;
	}
}
function mouseReleased(){
	savec();
}
function mouseWheel(e){
	w -= e.delta / 100;
	if(w<=0){
		w=1;
	}
	strokeWeight(w);
}

function draw(){
  if(mouseIsPressed){
    if(mouseButton == LEFT){
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
	if(keyIsDown(17)){
		changecolor(bgcolor);
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
	changecolor(drawcolor);
}
