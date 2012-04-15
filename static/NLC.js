$(document).ready(function() {
	var colors = ["#C00000", "#FFD700", "#0276FD", "#1DA237"];
	$(window).scroll(function() {
		//console.log(e);
		//console.log($(window).scrollTop());
		//$("#lobby").css({"top": $(window).scrollTop()});
		$("#done").css({"top": $(window).scrollTop() + 25});
	});
	//console.log($(window).scrollTop());
	var click = {};
	var colorUsed = [false, false, false, false];
	var translation = ["R", "Y", "B", "G"];
	for (var i = 1; i < 11; i++) {
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
				//console.log(click);
				//console.log(colorUsed);
			});
		})(i);
	}
	$("#done").click(function() {
		//$(window).animate({ scrollTop: 0 }, "slow");
		$('body').animate({scrollTop:0}, 'slow');
		$('html').animate({scrollTop:0}, 'slow');
		$("#lobby").animate({opacity: 0.01}, 5000);
		console.log(window.innerWidth);
		console.log(window.innerHeight);
		$("#interface").css({"pointer-events": "none"});
		$("#interface").hide();
		$("#lobby").click(function(e) {
			//console.log(e);
			var mult = window.innerWidth/1366;
			var x = e.pageX/mult;
			var y = e.pageY/mult;
			var floors = new Array();
			["#C00000", "#FFD700", "#0276FD", "#1DA237"]
			if (1085 <= x && 1260 >= x && 300 <= y && 975 >= y) {
				console.log("Green");
				floors.push("#1DA237");
				for (var i in click) {
					if (click[i] === "#1DA237") {
						floors.push(i);
					}
					//console.log(i);
					//console.log(click[i]);
				}
			} else if (950 <= x && 1075 >= x && 350 <= y && 875 >= y) {
				console.log("Blue");
				floors.push("#0276FD");
				for (var i in click) {
					if (click[i] === "#0276FD") {
						floors.push(i);
					}
				}
			} else if (385 <= x && 510 >= x && 350 <= y && 875 >= y) {
				console.log("Red");
				floors.push("#C00000");
				for (var i in click) {
					if (click[i] === "#C00000") {
						floors.push(i);
					}
				}
			} else if (200 <= x && 375 >= x && 300 <= y && 975 >= y) {
				console.log("Yellow");
				floors.push("#FFD700")
				for (var i in click) {
					if (click[i] === "#FFD700") {
						floors.push(i);
					}
				}
			}
			console.log(floors);
			//post_to_url("./above.html", {'a': 'z'}, 'POST');
			$.post('./above.html', {'a': 'z'});
			//color, floors, x is delimitors
			//1200x1135
				/* Green
				width: 175px;
				height: 675px; 
				top: 300px;
				left: 1085px; */
				/* Blue
				width: 125px;
				height: 525px;
				top: 350px;
				left: 950px; */
				/* Red
				width: 125px;
				height: 525px;
				top: 350px;
				left: 385px; */
				/* Yellow
				width: 175px;
				height: 675px;
				top: 300px;
				left: 200px; */
			e.pageX
			e.pageY
		});
		//$("#lobby").attr({"src": "lobby.jpg"});
	});
});

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}