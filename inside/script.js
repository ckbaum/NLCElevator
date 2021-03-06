var floors=[];
var target=8;
var seconds=Math.round(Math.random()*5)+14;
var curfloor=undefined;
var curnum;
var curind=0;
var down;

$(function() {

    $("#dialog").css("visibility", "hidden");
    down=getUrlVars()["direction"]==="down";
	var floors2 = getUrlVars()['floors'].split('x');
	
	// the following three lines to display floors in other direction - jskao
	var remaining = getUrlVars()['remain'].split('x');
	if(remaining.length != 0){
	    if(down == false){
		for(var i=remaining.length-1; i >= 0; i--){
		    floors2.push(remaining[i]);
		}
	    }else{
		for(var i=0; i<=remaining.length-1; i++){
		    floors2.unshift(remaining[i]);
		}
	    }
	}
	
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
    
    /*var remaining = getUrlVars()['remain'].split('x');
    for(var i=0; i < remaining.length; i++){
        var remains=$("<div></div>");
        remains.addClass("floor");
        var num = remaining[i];
        floor.html(num.toString());
        floors.push(floor);
        $("#floorlist").prepend(floor);
    }*/
    
    if(down){
        curind=floors.length-1;
    }
    curfloor=floors[curind];
    curnum=floors[curind].html();
    setInterval("countdown()", 1000);
    countdown();
    $("#getoff").click(function(){
        location.href=("../index.html?current="+curnum.toString());
    });
    $("#stay").click(function(){
        resume_elevator();
    });
    $("#exitbutton").click(function(){
        alert("You exit on floor "+curnum.toString()+", as an alarm sounds");
        location.href=("../index.html?current="+curnum.toString());
    });
});

countdown=function(){
    if(seconds>0){
        seconds-=1;
    }
    if(seconds>9){
        curfloor.html(curnum+": arriving in 00:"+seconds.toString());
    }
    else{
        curfloor.html(curnum+": arriving in 00:0"+seconds.toString());
    }
    if(seconds==0){
        show_confirm(parseInt(curnum));
    }
}

function resume_elevator(){
    $("#dialog").css("visibility", "hidden");
    curfloor.html("");
    seconds=Math.round(Math.random()*5)+4;
    if(down){
        curfloor.remove();
    }
    curind+=!down*2-1;
    curfloor=floors[curind];
    curnum=curfloor.html();
}

function show_confirm(n){
   /* var r=confirm("The doors open to floor "+n.toString());
    if (r==true){
        location.href="complete";
    }
    else{
        alert("You pressed Cancel!");
    }*/
    $("#dialog p").html("The elevator opens on floor "+n.toString());
    $("#dialog").css("visibility", "visible");
    if((down&&curind==0) || (!down && curind==floors.length-1)){
        $("#stay").attr("disabled", "disabled");
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
