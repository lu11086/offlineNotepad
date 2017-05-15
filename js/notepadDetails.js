$(document).ready(function() {
	getTheNotepad();
});

function getTheNotepad() {
	var notepadObj = localStorage.getItem("WhichNotepad");
	if (notepadObj == '"first"') {
		$.getJSON("../js/notepad.json", function(data) {
			var $npdWallNew = $(".npdWallNew");
			var strHtml = ""; //存储数据的变量 
			$npdWallNew.empty();
			$.each(data, function(infoIndex, info) {
				strHtml += "<div class='inputTheTitle'>" + info["title"] + "</div>";
				strHtml += "<div class='inputTheArticle'>" + info["article"] + "</div>";
			})
			$npdWallNew.html(strHtml); //显示处理后的数据 
		})
	} else {
		var  reg = new  RegExp('.*[\"]+(.*)[\"]+.*');
		var str = notepadObj.replace(reg, "$1");
		var notepadTitle = getNotepadTitle();
		if (notepadTitle[str]) {
			for (i in notepadTitle) {
				if (i == str) {
					$(".inputTheTitle").html(notepadTitle[i]);
				}
			}
		} else {
			var RCNpdTitle = getRCNpdTitle();
			for (i in RCNpdTitle) {
				if (i == str) {
					$(".inputTheTitle").html(RCNpdTitle[i]);
				}
			}
		}
		var notepadArticle = getNotepadArticle();
		if (notepadArticle[str]) {
			for (i in notepadArticle) {
				if (i == str) {
					$(".inputTheArticle").html(notepadArticle[i]);
				}
			}
		} else {
			var RCNpdArticle = getRCNpdArticle();
			for (i in RCNpdArticle) {
				if (i == str) {
					$(".inputTheArticle").html(RCNpdArticle[i]);
				}
			}
		}
	}
}

$(".CancelNewNote").click(function() {
	window.location = "notepadWall.html";
})


//导航栏hover
var notepadNav = $('.notepadNav>li');
for (var i = 0; i < notepadNav.length; i++) {
	notepadNav.eq(i).mouseover(function() {
		$(this).css({
			backgroundColor: " #d901d7",
			textShadow: "0 0 2px #9e009c"
		});
	});
	notepadNav.eq(i).mouseout(function() {
		$(this).css({
			backgroundColor: " #9e009c",
			textShadow: "none"
		});
	});
};