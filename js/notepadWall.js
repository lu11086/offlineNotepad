$(document).ready(function() {
	$(".notepadNav>li").eq(0).css({
		backgroundColor: " orange",
		textShadow: "0 0 2px yellow"
	});

	StartNpdWall();
});

//遍历得出.json文件里的数据
function StartNpdWall() {
	$.getJSON("../js/notepad.json", function(data) {
		var $npdWallList = $(".npdWallList");
		var strHtml = ""; //存储数据的变量 
		$npdWallList.empty(); //清空内容 
		$.each(data, function(infoIndex, info) {
			strHtml += "<div class='oneNpdWall' value='first'>";
			if (info["title"].substr(16)) {
				strHtml += "<a class='oneNpdWallTitle'>" + info["title"].substr(0, 15) + "...</a>";
			} else {
				strHtml += "<a class='oneNpdWallTitle'>" + info["title"] + "</a>";
			}
			if (info["article"].substr(17)) {
				strHtml += "<span class='oneNpdWallArticle'>" + info["article"].substr(0, 14) + "...</span>";
			} else {
				strHtml += "<span class='oneNpdWallArticle'>" + info["article"] + "</span>";
			}
			strHtml += "<a class='oneNpdWallDate'>" + info["Date"] + "</a>";
			strHtml += "</div>"
		})
		$npdWallList.html(strHtml); //显示处理后的数据 
		addNotepad();
	})
}

//加载储存在本地的数据
function addNotepad() {
	var notepadTitle = getNotepadTitle();
	var notepadArticle = getNotepadArticle();
	var notepadDate = getNotepadDate();
	var title = article = null;
	for (i in notepadArticle) {
		//if (JSON.stringify(notepadTitle[i]).substr(16)) {title=notepadTitle[i].substr(0, 15)}else{title=notepadTitle[i]};
		//if (JSON.stringify(notepadArticle[i]).substr(17)) {article=notepadArticle[i].substr(0, 14)}else{article=notepadArticle[i]};
		$('<div />', {
			class: 'oneNpdWall',
			value: i,
			html: "<a class='oneNpdWallTitle'>" + notepadTitle[i] + "</a><span class='oneNpdWallArticle'>" + notepadArticle[i] + "</span><a class='oneNpdWallDate'>" + notepadDate[i] + "</a>"
		}).appendTo(".npdWallList");
	}
	afterNotepad();
}

//加载最后的 新建记事本	
function afterNotepad() {
	$('<div />', {
		class: 'lastNpdWall',
		html: "<img src='../img/add1.png' class='UrlNpdNew' />"
	}).appendTo(".npdWallList");

	$(".UrlNpdNew").click(function() {
		window.location = "notepadNew.html"
	});
	
	$(".lastNpdWall").click(function() {
		window.location = "notepadNew.html"
	});

	var whichNpd = $(".oneNpdWall");
	for(var i = 0;i<whichNpd.length;i++) {
		whichNpd.eq(i).click(function() {
			window.location = "notepadDetails.html";
			setWhichNpd($(this).attr("value"));
		})
	}
}

//导航栏hover
var notepadNav = $('.notepadNav>li');
for (var i = 0; i < notepadNav.length; i++) {
	notepadNav.eq(i).mouseover(function() {
		notepadNav.css({
			backgroundColor: " rgba(255,120,0,1)",
			textShadow: "none"
		});
		$(this).css({
			backgroundColor: " orange",
			textShadow: "0 0 2px yellow"
		});
	});
	notepadNav.eq(i).mouseout(function() {
		$(this).css({
			backgroundColor: " rgba(255,120,0,1)",
			textShadow: "none"
		});
		notepadNav.eq(0).css({
			backgroundColor: " orange",
			textShadow: "0 0 2px yellow"
		});
		notepadNav.eq(4).css({
			backgroundColor: " orange",
			textShadow: "0 0 2px yellow"
		});
	});
}