$(document).ready(function() {
	$(".notepadNav>li").eq(3).css({
		backgroundColor: " #e96d00",
		textShadow: "0 0 2px #6c3a01"
	});

	StartRCNpdList();
});

//加载储存在本地的数据
function StartRCNpdList() {
	var notepadTitle = getRCNpdTitle();
	var notepadArticle = getRCNpdArticle();
	var notepadDate = getRCNpdDate();
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
				class: 'oneNpdRC',
				name: i,
				html: "恢复"
			}).appendTo(".ListIsHere");
		} else {
			$('<div />', {
				class: 'oneNpdDel',
				name: i,
				html: "Delete"
			}).appendTo(".ListIsHere");
			$('<div />', {
				class: 'oneNpdRC',
				name: i,
				html: "Return"
			}).appendTo(".ListIsHere");
		}
	}
	afterTheNotepad();
}

//各种功能：
function afterTheNotepad() {
	var languageObj = selectTheLang();
	////点击进入详情页
	var whichNpd = $(".myNotepadList");
	for (var i = 0; i < whichNpd.length; i++) {
		whichNpd.eq(i).click(function() {
			window.location = "notepadDetails.html";
			setWhichNpd($(this).attr("name"));
		})
	}
	////点击还原
	var whichNpdRC = $(".oneNpdRC");
	for (var i = 0; i < whichNpdRC.length; i++) {
		whichNpdRC.eq(i).click(function() {
			RecycleThisOne($(this).attr("name"));
			if (!languageObj) {
				alert('该记事本已成功恢复！');
			} else {
				alert('This note is restored successfully！');
			}
		})
	}
	////点击删除
	var whichNpdDel = $(".oneNpdDel");
	for (var i = 0; i < whichNpdDel.length; i++) {
		whichNpdDel.eq(i).click(function() {
			if (!languageObj) {
				if (window.confirm("您确认要永久删除此记事本吗?")) {
					DeleteThisOne($(this).attr("name"));
					alert('该记事本已成功删除！');
				}
			} else {
				if (window.confirm("Are you sure to delete this note?")) {
					DeleteThisOne($(this).attr("name"));
					alert('This note is deleted successfully！');
				}
			}
		})
	}
////点击全部删除
	$(".DelAllNote").click(function() {
		var languageObj = selectTheLang();
		if (!languageObj) {
			if (window.confirm("您确认要彻底删除全部记事本吗?")) {
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

	window.location = "notepadReturn.html";
}


//恢复单一条目
function RecycleThisOne(key) {
	var notepadTitle = getNotepadTitle();
	var RCNpdTitle = getRCNpdTitle();
	notepadTitle[key] = RCNpdTitle[key];
	delete RCNpdTitle[key];
	setNotepadTitle(notepadTitle);
	setRCNpdTitle(RCNpdTitle);

	var notepadArticle = getNotepadArticle();
	var RCNpdArticle = getRCNpdArticle();
	notepadArticle[key] = RCNpdArticle[key];
	delete RCNpdArticle[key];
	setNotepadArticle(notepadArticle);
	setRCNpdArticle(RCNpdArticle);

	var notepadDate = getNotepadDate();
	var RCNpdDate = getRCNpdDate();
	notepadDate[key] = RCNpdDate[key];
	delete RCNpdDate[key];
	setNotepadDate(notepadDate);
	setRCNpdDate(RCNpdDate);

	window.location = "notepadReturn.html";
}

//永久删除单一条目
function DeleteThisOne(key) {
	var notepadTitle = getRCNpdTitle();
	delete notepadTitle[key];
	setRCNpdTitle(notepadTitle);
	var notepadArticle = getRCNpdArticle();
	delete notepadArticle[key];
	setRCNpdArticle(notepadArticle);
	var notepadDate = getRCNpdDate();
	delete notepadDate[key];
	setRCNpdDate(notepadDate);
	window.location = "notepadReturn.html";
}

//导航栏hover
var notepadNav = $('.notepadNav>li');
for (var i = 0; i < notepadNav.length; i++) {
	notepadNav.eq(i).mouseover(function() {
		notepadNav.css({
			backgroundColor: " #9d5300",
			textShadow: "none"
		});
		$(this).css({
			backgroundColor: " #e96d00",
			textShadow: "0 0 2px #6c3a01"
		});
	});
	notepadNav.eq(i).mouseout(function() {
		$(this).css({
			backgroundColor: " #9d5300",
			textShadow: "none"
		});
		notepadNav.eq(3).css({
			backgroundColor: " #e96d00",
			textShadow: "0 0 2px #6c3a01"
		});
		notepadNav.eq(7).css({
			backgroundColor: " #e96d00",
			textShadow: "0 0 2px #6c3a01"
		});
	});
}