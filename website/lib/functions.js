function ce(x){
  var e = document.createElement(x);
  return e;
};
Element.prototype.parent = function(x){
  x.appendChild(this);
};
Element.prototype.delete = function(){
  this.parentElement.removeChild(this);
}
Element.prototype.addText = function(t){
  var text = document.createTextNode(t);
  this.appendChild(text);
};





function midpoint(l){
  var mp = l[0];
  for(var i = 1; i < l.length; i++){
    mp = mp.copy().add(l[i]);
  }
  mp = mp.copy().div(l.length);
  return mp;
};

function rand(min, max, whole){
	if(whole == true){
		return Math.round(map(Math.random(), 0, 1, min, max));
	} else {
		return map(Math.random(), 0, 1, min, max);
	}
};
