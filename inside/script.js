var floors=[];
var target=8;
var seconds=Math.round(Math.random()*5)+4;
var curfloor=undefined;
var curnum;
var curind=0;

$(function() {
	var floors2 = getUrlVars()['floors'].split('x');
    for(var i=0; i < floors2.length; i++){
        var floor=$("<div></div>");
        floor.addClass("floor");
        /* var num=Math.round(Math.random()*3)+i*3;
        if(target-i*3<3 && target>i*3){
            num=target;
        } */
        var num = floors2[i];
        floor.html(num.toString());
        floors.push(floor);
        $("#floorlist").prepend(floor);
    }
    curfloor=floors[0];
    curnum=floors[0].html();
    setInterval("countdown()", 1000);
    countdown();
});

countdown=function(){
    curfloor.html(curnum+": arriving in 00:0"+seconds.toString());
    seconds-=1;
    if(seconds<=-1){
        curfloor.html("");
        seconds=Math.round(Math.random()*5)+4;
        curind+=1;
        curfloor=floors[curind];
        curnum=curfloor.html();
    }
}

/* gets the variables in the url */
function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
