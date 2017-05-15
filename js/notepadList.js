$(document).ready(function() {
	$(".notepadNav>li").eq(1).css({
		backgroundColor: " #0bcd02",
		textShadow: "0 0 2px yellow"
	});

	StartTheNpdList();
});

//遍历得出.json文件里的数据
function StartTheNpdList() {
	$.getJSON("../js/notepad.json", function(data) {
		var $ListIsHere = $(".ListIsHere");
		var strHtml = ""; //存储数据的变量 
		$ListIsHere.empty(); //清空内容 
		$.each(data, function(infoIndex, info) {
			strHtml += "<li class='myNotepadList' name='first'>";
			strHtml += "<a class='oneNpdList'>" + info["title"] + "</a>";
			strHtml += "<span class='oneNpdDate'>" + info["Date"] + "</span>";
			strHtml += "</li>"
		})
		$ListIsHere.html(strHtml); //显示处理后的数据 
		addTheNotepad();
	})
}

//加载储存在本地的数据
function addTheNotepad() {
	var notepadTitle = getNotepadTitle();
	var notepadArticle = getNotepadArticle();
	var notepadDate = getNotepadDate();
	var languageObj = selectTheLang();
	for (i in notepadArticle) {
		$('<li />', {
			class: 'myNotepadList',
			name: i,
			html: "<a class='oneNpdList'>" + notepadTitle[i] + "</a><span class='oneNpdDate'>" + notepadDate[i] + "</span>"
		}).appendTo(".ListIsHere");
		if (languageObj == 0) {
			$('<div />', {
				class: 'oneNpdDel',
				name: i,
				html: "删除"
			}).appendTo(".ListIsHere");
			$('<div />', {
				class: 'oneNpdEdit',
				name: i,
				html: "编辑"
			}).appendTo(".ListIsHere");
		} else {
			$('<div />', {
				class: 'oneNpdDel',
				name: i,
				html: "Del"
			}).appendTo(".ListIsHere");
			$('<div />', {
				class: 'oneNpdEdit',
				name: i,
				html: "Edit"
			}).appendTo(".ListIsHere");
		}
	}
	afterTheNotepad();
}

//各种功能：
function afterTheNotepad() {
	////点击进入详情页
	var whichNpd = $(".myNotepadList");
	for (var i = 0; i < whichNpd.length; i++) {
		whichNpd.eq(i).click(function() {
			window.location = "notepadDetails.html";
			setWhichNpd($(this).attr("name"));
		})
	}
	////点击进入编辑界面
	var whichNpdEdit = $(".oneNpdEdit");
	for (var i = 0; i < whichNpdEdit.length; i++) {
		whichNpdEdit.eq(i).click(function() {
			window.location = "notepadEdit.html";
			setWhichNpd($(this).attr("name"));
		})
	}
	////点击删除
	var whichNpdDel = $(".oneNpdDel");
	for (var i = 0; i < whichNpdDel.length; i++) {
		whichNpdDel.eq(i).click(function() {
			DeleteThisOne($(this).attr("name"));
		})
	}
	////点击全部删除
	$(".DelAllNote").click(function() {
		var languageObj = selectTheLang();
		if (!languageObj) {
			if (window.confirm("您确认要删除全部记事本吗?")) {
				DeleteAll();
			}
		} else {
			if (window.confirm("Are you sure to delete all notes?")) {
				DeleteAll();
			}
		}
	})
}

//删除全部
function DeleteAll() {
	var notepadTitle = getNotepadTitle();
	var RCNpdTitle = getRCNpdTitle();
	RCNpdTitle = notepadTitle;
	localStorage.removeItem("notepadsTitle");
	setRCNpdTitle(RCNpdTitle);

	var notepadArticle = getNotepadArticle();
	var RCNpdArticle = getRCNpdArticle();
	RCNpdArticle = notepadArticle;
	localStorage.removeItem("notepadsArticle");
	setRCNpdArticle(RCNpdArticle);

	var notepadDate = getNotepadDate();
	var RCNpdDate = getRCNpdDate();
	RCNpdDate = notepadDate;
	localStorage.removeItem("notepadsDate");
	setRCNpdDate(RCNpdDate);

	window.location = "notepadList.html";
}

//删除单一条目放入回收站
function DeleteThisOne(key) {
	var notepadTitle = getNotepadTitle();
	var RCNpdTitle = getRCNpdTitle();
	RCNpdTitle[key] = notepadTitle[key];
	delete notepadTitle[key];
	setNotepadTitle(notepadTitle);
	setRCNpdTitle(RCNpdTitle);

	var notepadArticle = getNotepadArticle();
	var RCNpdArticle = getRCNpdArticle();
	RCNpdArticle[key] = notepadArticle[key];
	delete notepadArticle[key];
	setNotepadArticle(notepadArticle);
	setRCNpdArticle(RCNpdArticle);

	var notepadDate = getNotepadDate();
	var RCNpdDate = getRCNpdDate();
	RCNpdDate[key] = notepadDate[key];
	delete notepadDate[key];
	setNotepadDate(notepadDate);
	setRCNpdDate(RCNpdDate);

	window.location = "notepadList.html";
}

//导航栏hover
var notepadNav = $('.notepadNav>li');
for (var i = 0; i < notepadNav.length; i++) {
	notepadNav.eq(i).mouseover(function() {
		notepadNav.css({
			backgroundColor: " #067600",
			textShadow: "none"
		});
		$(this).css({
			backgroundColor: " #0bcd02",
			textShadow: "0 0 2px yellow"
		});
	});
	notepadNav.eq(i).mouseout(function() {
		$(this).css({
			backgroundColor: " #067600",
			textShadow: "none"
		});
		notepadNav.eq(1).css({
			backgroundColor: " #0bcd02",
			textShadow: "0 0 2px yellow"
		});
		notepadNav.eq(5).css({
			backgroundColor: " #0bcd02",
			textShadow: "0 0 2px yellow"
		});
	});
}