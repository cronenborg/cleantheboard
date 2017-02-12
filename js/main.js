var x = 0,
y = 0,
ox = 0,
oy = 0,
dx = 0,
dy = 0,
victory = 0,
bonus = 36,
level = 1,
score = 0,
firstmove = 0;

function bonusdecrease(){
	window.bonus--;
	if (window.bonus<=1){window.bonus=1;}
	$('#bonus').html(window.bonus);
}

function finish(){
	console.log("You finished the game!!");
	$('#victorylabel').addClass("hidden");
	$('#endlabel').removeClass("hidden");
}

function init(l){
	window.x 			= 0;
	window.y 			= 0;
	window.ox 			= 0;
	window.oy 			= 0;
	window.dx 			= 0;
	window.dy 			= 0;
	window.victory 		= 0;
	window.bonus 		= 36;
	window.level 		= l+1;
	window.firstmove 	= 0;
	$('#bonus').html(window.bonus);
	$('#level').html(window.level);
	
	var orig = $("#pedina").parent();
	var pedinahtml = orig.html();
	$('td').each(function() {
		$(this).removeClass("bg-grey");
		$(this).empty();
	});
	$("#grid00").html(pedinahtml);
	
	switch(window.level) {
		case 1:
			console.log("level 1");
			$('#grid01').addClass("bg-grey");
		break;
		case 2:
			console.log("level 2");
			$('#grid01').addClass("bg-grey");
			$('#grid02').addClass("bg-grey");
		break;
		case 3:
			console.log("level 3");
			$('#grid23').addClass("bg-grey");
		break;
		case 4:
			console.log("level 4");
			$('#grid23').addClass("bg-grey");
			$('#grid55').addClass("bg-grey");
		break;
		case 5:
			console.log("level 5");
			$('#grid15').addClass("bg-grey");
			$('#grid40').addClass("bg-grey");
			$('#grid53').addClass("bg-grey");
		break;
		case 6:
			console.log("level 6");
			$('#grid13').addClass("bg-grey");
			$('#grid14').addClass("bg-grey");
			$('#grid25').addClass("bg-grey");
			$('#grid31').addClass("bg-grey");
		break;
		case 7:
			console.log("level 7");
			$('#grid55').addClass("bg-grey");
		break;
		default:
			console.log("END");
		break;
	}
	
	
}

function victoryFunc() {
	console.log("VICTORY!");
	window.victory = 1;
	window.score += window.bonus;
	$('#victorylabel').removeClass("hidden");
	$('#score').html(window.score);
	if(window.level<=6){
		init(window.level);
	} else {
		finish();
	}
}

function checkboard(){
	var res = 1;
	$('td').each(function() {
		if ($(this).hasClass("bg-grey")) {
			res = 0;
		}
	});
	if (res===1) {
		victoryFunc();
	}
}

function muovipedina() {
	bonusdecrease();
	var orig = {};
	orig = $("#pedina").parent();
	var pedinahtml = orig.html();
	orig.empty();
	$("#grid"+window.dx+""+window.dy).html(pedinahtml);
	window.x = window.dx;
	window.y = window.dy;
	if ($("#grid"+window.dx+""+window.dy).hasClass("bg-grey")) {
		$("#grid"+window.dx+""+window.dy).removeClass("bg-grey");
	} else {
		$("#grid"+window.dx+""+window.dy).addClass("bg-grey");
	}
	checkboard();
}

$(document).ready(function(){
	init(0);
	$(document).keydown(function(e) {
		var orig = {};
		orig = $("#pedina").parent();
		window.ox = orig.data("row");
		window.oy = orig.data("col");
		if (window.victory===0) {
			if (window.firstmove==0) {
				$("#victorylabel").addClass("hidden");
				window.firstmove = 1;
			}
			switch(e.which) {
				case 37: // left
					if (window.oy>0){
						window.dy = window.oy-1;
						muovipedina();
					} else {
						window.dy = 0;
					}
				break;
				case 38: // up
					if (window.ox>0){
						window.dx = window.ox-1;
						muovipedina();
					} else {
						window.dx = 0;
					}
				break;
				case 39: // right
					if (window.oy<5){
						window.dy = window.oy+1;
						muovipedina();
					} else {
						window.dy = 5;
					}
				break;
				case 40: // down
					if (window.ox<5){
						window.dx = window.ox+1;
						muovipedina();
					} else {
						window.dx = 5;
					}
				break;
				default: return;
			}
		} else {
			console.log("no movements allowed!");
			return;
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});
});
