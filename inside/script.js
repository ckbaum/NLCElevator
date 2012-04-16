var floors=[];
var target=8;
var seconds=Math.round(Math.random()*5)+4;
var curfloor=undefined;
var curnum;
var curind=0;

$(function() {
    for(var i=1; i<6; i++){
        var floor=$("<div></div>");
        floor.addClass("floor");
        var num=Math.round(Math.random()*3)+i*3;
        if(target-i*3<3 && target>i*3){
            num=target;
        }
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
