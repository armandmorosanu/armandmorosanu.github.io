var pgs = [
	"polygons",
	"mesh networks",
	"draw",
	"gravity",
	"sierpinski"

];
for(var i = 0; i < pgs.length; i++){
	var div = ce("div");
	div.setAttribute("class", "square")
	var iframe = ce("iframe");
	iframe.setAttribute("src", pgs[i]);
	iframe.setAttribute("class", "content")
	iframe.parent(div);
	var t = ce("table");
	t.parent(div);
	var a = ce("a")
	a.setAttribute("href", "/".concat(pgs[i]))
	a.addText(pgs[i])
	a.parent(t)
	div.parent(document.body)
}
