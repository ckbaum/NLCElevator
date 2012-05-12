$(document).ready(function() {
	var colors = ["#C00000", "#FFD700", "#0276FD", "#1DA237"];
	$(window).scroll(function() {
		$("#done").css({"top": $(window).scrollTop() + 25});
	});
	var current = getUrlVars()["current"];
	if (current == undefined) {
		current = 1;
	}
	if (current > 10) {
		current = 10;
	}
	$("#floorDisp").text(current);
	var click = {};
	var colorUsed = [false, false, false, false];
	var translation = ["R", "Y", "B", "G"];
	for (var i = 1; i < 11; i++) {
		if (parseInt(i) !== parseInt(current)) {
			(function(x) {
				$("#floor" + x).click(function() {
					var colorNum = Math.floor(Math.random()*4);
					$("#floor" + x).css({"background-color": colors[colorNum]});
					$("#floor" + x).unbind("click");
					click[x] = colors[colorNum];
					colorUsed[colorNum] = true;
					var img = "";
					for (var k = 0; k < 4; k++) {
						if (colorUsed[k] == true) {
							img = img + translation[k];
						}
					}
					$("#map").attr({"src": "img/" + img + ".png"});
				});
			})(i);
		}
	}
	var floorData = getUrlVars()["data"];
	if (floorData != undefined) {
		for (var k = 0; k < floorData.length; k++) {
			var f = floorData[k];
			k += 1;
			if (floorData[k] === "0") {
				f = f + "0"
				k += 1;
			}
			var colorNum;
			if (floorData[k] === "R") {
				colorNum = 0;
			} else if (floorData[k] === "Y") {
				colorNum = 1;
			} else if (floorData[k] === "B") {
				colorNum = 2;
			} else if (floorData[k] === "G") {
				colorNum = 3;
			}
			$("#floor" + f).css({"background-color": colors[colorNum]});
			$("#floor" + f).unbind("click");
			click[f] = colors[colorNum];
			colorUsed[colorNum] = true;
			var img = "";
			for (var p = 0; p < 4; p++) {
				if (colorUsed[p] == true) {
					img = img + translation[p];
				}
			}
			if (img.length == 0) {
				img = "Standard";
			}
			$("#map").attr({"src": "img/" + img + ".png"});
		}
	}
	$("#done").click(function() {
		$('body').animate({scrollTop:0}, 'slow');
		$('html').animate({scrollTop:0}, 'slow');
		$("#lobby").animate({opacity: 0.01}, 3000);
		$("#interface").css({"pointer-events": "none"});
		setTimeout('$("#interface").animate({opacity: 0.01}, 1000)', 1000);
		setTimeout('$("#interface").hide(); $("#done").hide();', 2000);
		setTimeout('$("#return").show(); $("#select").show();', 2500)
		$("#return").click(function() {
			$("#return").hide();
			$("#select").hide();
			$("#interface").show();
			$("#interface").css({"opacity": 1})
			$("#done").show();
			for (var i = 1; i < 11; i++) {
				if (parseInt(i) !== parseInt(current)) {
					(function(x) {
						$("#floor" + x).click(function() {
							var colorNum = Math.floor(Math.random()*4);
							$("#floor" + x).css({"background-color": colors[colorNum]});
							$("#floor" + x).unbind("click");
							click[x] = colors[colorNum];
							colorUsed[colorNum] = true;
							var img = "";
							for (var k = 0; k < 4; k++) {
								if (colorUsed[k] == true) {
									img = img + translation[k];
								}
							}
							$("#map").attr({"src": "img/" + img + ".png"});
						});
					})(i);
				}
			}
		});
		$(window).scroll(function() {
			$("#return").css({"top": $(window).scrollTop() + 25});
			$("#select").css({"top": $(window).scrollTop() + 50});
		});
		$("#lobby").click(function(e) {
			var mult = window.innerWidth/1366;
			var x = e.pageX/mult;
			var y = e.pageY/mult;
			var floors = new Array();
			["#C00000", "#FFD700", "#0276FD", "#1DA237"]
			if (1085 <= x && 1260 >= x && 300 <= y && 975 >= y) {
				floors.push("#1DA237");
				for (var i in click) {
					if (click[i] === "#1DA237") {
						floors.push(i);
					}
				}
			} else if (950 <= x && 1075 >= x && 350 <= y && 875 >= y) {
				floors.push("#0276FD");
				for (var i in click) {
					if (click[i] === "#0276FD") {
						floors.push(i);
					}
				}
			} else if (385 <= x && 510 >= x && 350 <= y && 875 >= y) {
				floors.push("#C00000");
				for (var i in click) {
					if (click[i] === "#C00000") {
						floors.push(i);
					}
				}
			} else if (200 <= x && 375 >= x && 300 <= y && 975 >= y) {
				floors.push("#FFD700")
				for (var i in click) {
					if (click[i] === "#FFD700") {
						floors.push(i);
					}
				}
			}
			var data = "";
			for (var j in click) {
				data = data + j;
				if (click[j] === "#C00000") {
					data = data + "R";
				} else if (click[j] === "#FFD700") {
					data = data + "Y";
				} else if (click[j] === "#1DA237") {
					data = data + "G";
				} else if (click[j] === "#0276FD") {
					data = data + "B";
				}
			}
			if (floors.length > 0) {
				var newURL = "./above.html?color=" + floors[0];
				var highlight = "";
				if (floors.length > 1) {
					highlight = highlight + floors[1];
					for (var i = 2; i < floors.length; i++) {
						highlight = highlight + "x";
						highlight = highlight + floors[i];
					}
				}
				newURL = newURL + "&floors=" + highlight + "&current=" + current + "&data=" + data;
				window.location = newURL;
			}
		});
	});
});


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