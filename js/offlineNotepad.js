MobileTime = MyUrl = null;
tMobile = 3;
NavNumble = 0;
var loginTab = $('.loginTab');

WhichLanguage();

//确认语言类型
function WhichLanguage() {
	var language = selectTheLang();
	if (language) {
		$('#zhCnPage').hide();
		$('#enPage').show();
		$('#changeLang').text('简体中文');
		$('#changeMobile').text('Mobile');
		$('.logOff').text('Exit');
		$('.register').text('register');
		$('.login').text('login');
		$('.headerLeft').children().eq(1).text('Web Note App');
		$('footer>span').children().eq(0).text('About us');
		$('footer>span').children().eq(1).text('Service terms');
		$('footer>span').children().eq(2).text('Suggestions');
		$('footer>span').children().eq(3).text('Support');
		if (loginTab) {
			$('.notepadLogin').eq(language).show();
			loginTab.eq(2).next().next().show();
		}
	} else {
		$('#enPage').hide();
		$('#zhCnPage').show();
		$('#changeLang').text('English');
		$('#changeMobile').text('手机版');
		$('.logOff').text('退出');
		$('.register').text('注册');
		$('.login').text('登录');
		$('.headerLeft').children().eq(1).text('网络记事应用');
		$('footer>span').children().eq(0).text('关于我们');
		$('footer>span').children().eq(1).text('服务条款');
		$('footer>span').children().eq(2).text('反馈建议');
		$('footer>span').children().eq(3).text('帮助中心');
		if (loginTab) {
			loginTab.eq(0).next().next().show();
		}
	}
}

//切换语言
$('#changeLang').click(function() {
	var languageObj = selectTheLang();
	MyUrl = window.location.href;
	localStorage.removeItem("WhichLang");
	if (languageObj == 0) {
		languageObj = 1;
	} else {
		languageObj = 0;
	}
	localStorage.setItem("WhichLang", JSON.stringify(languageObj));
	window.location = MyUrl;
	MyUrl = null;
})

//导航栏跳转
$(".UrlNpdList").click(function() {
	window.location = "notepadList.html"
});
$(".UrlNpdWall").click(function() {
	window.location = "notepadWall.html"
});
$(".UrlNpdNew").click(function() {
	window.location = "notepadNew.html"
});
$(".UrlNpdReturn").click(function() {
	window.location = "notepadReturn.html"
});
$(".userIf img").click(function() {
	window.location = "notepadWall.html"
});

//退出登录
$(".logOff").click(function() {
	var languageObj = selectTheLang();
	if (!languageObj) {
		if (window.confirm("您确认要退出登录吗?")) {
			window.location = "../index.html";
		}
	} else {
		if (window.confirm("Are you sure to Exit?")) {
			window.location = "../index.html";
		}
	}

})

//切换手机版电脑版
$('#changeMobile').click(function() {
	if (!MobileTime) {
		theFunctionHaveNotTrue();
		var languageObj = selectTheLang();
		if (!languageObj) {
			$('#changeMobile').text('电脑版');
		} else {
			$('#changeMobile').text('Computer');
		}
	} else {
		window.location = MyUrl;
		clearInterval(MobileTime);
		MyUrl = null;
	}
});

//缓存原网址以及运行倒计时
function theFunctionHaveNotTrue() {
	MyUrl = window.location.href;
	$('.loginAndReg').hide();
	$(".notepadPage").hide();
	$('#Mobile').show();
	MobileTime = setInterval('tMobileTime()', 1000);
}

//倒计时结束返回原网址
function tMobileTime() {
	if (tMobile == 0) {
		window.location = MyUrl;
		clearInterval(MobileTime);
		MyUrl = null;
	}
	$('#MobileTime').text('点击此处或等待' + tMobile + '秒后将跳转回原界面click here or wait ' + tMobile + ' second to return')
	tMobile--;
}

//footer未实现的功能
$(".theFunctionHaveNotTrue").click(theFunctionHaveNotTrue);

//notepad存取功能
////在localStorage中读取出来所有的记事本数据
function getNotepadTitle() {
	var notepadObj = localStorage.getItem("notepadsTitle");
	if (!notepadObj) {
		notepadObj = {};
		localStorage.setItem("notepadsTitle", JSON.stringify(notepadObj));
		return notepadObj;
	} else {
		return JSON.parse(notepadObj);
	}
}

function getNotepadArticle() {
	var notepadObj = localStorage.getItem("notepadsArticle");
	if (!notepadObj) {
		notepadObj = {};
		localStorage.setItem("notepadsArticle", JSON.stringify(notepadObj));
		return notepadObj;
	} else {
		return JSON.parse(notepadObj);
	}
}

function getNotepadDate() {
	var notepadObj = localStorage.getItem("notepadsDate");
	if (!notepadObj) {
		notepadObj = {};
		localStorage.setItem("notepadsDate", JSON.stringify(notepadObj));
		return notepadObj;
	} else {
		return JSON.parse(notepadObj);
	}
}

////把全部记事本对象存储进localstorage
function setNotepadTitle(obj) {
	localStorage.setItem("notepadsTitle", JSON.stringify(obj));
}

function setNotepadArticle(obj) {
	localStorage.setItem("notepadsArticle", JSON.stringify(obj));
}

function setNotepadDate(obj) {
	localStorage.setItem("notepadsDate", JSON.stringify(obj));
}

////在回收站中读取出来所有的记事本数据
function getRCNpdTitle() {
	var notepadObj = localStorage.getItem("RCNpdsTitle");
	if (!notepadObj) {
		notepadObj = {};
		localStorage.setItem("RCNpdsTitle", JSON.stringify(notepadObj));
		return notepadObj;
	} else {
		return JSON.parse(notepadObj);
	}
}

function getRCNpdArticle() {
	var notepadObj = localStorage.getItem("RCNpdsArticle");
	if (!notepadObj) {
		notepadObj = {};
		localStorage.setItem("RCNpdsArticle", JSON.stringify(notepadObj));
		return notepadObj;
	} else {
		return JSON.parse(notepadObj);
	}
}

function getRCNpdDate() {
	var notepadObj = localStorage.getItem("RCNpdsDate");
	if (!notepadObj) {
		notepadObj = {};
		localStorage.setItem("RCNpdsDate", JSON.stringify(notepadObj));
		return notepadObj;
	} else {
		return JSON.parse(notepadObj);
	}
}

////把全部记事本对象存储进回收站
function setRCNpdTitle(obj) {
	localStorage.setItem("RCNpdsTitle", JSON.stringify(obj));
}

function setRCNpdArticle(obj) {
	localStorage.setItem("RCNpdsArticle", JSON.stringify(obj));
}

function setRCNpdDate(obj) {
	localStorage.setItem("RCNpdsDate", JSON.stringify(obj));
}

////跳转到详情页的时候知道是哪页
function setWhichNpd(obj) {
	localStorage.removeItem("WhichNotepad");
	localStorage.setItem("WhichNotepad", JSON.stringify(obj));
}

////突然觉得中英转换也可以用到这东西
function selectTheLang() {
	var languageObj = localStorage.getItem("WhichLang");
	if (!languageObj) {
		languageObj = 0;
		localStorage.setItem("WhichLang", JSON.stringify(languageObj));
		return languageObj;
	} else {
		return JSON.parse(languageObj);
	}
}