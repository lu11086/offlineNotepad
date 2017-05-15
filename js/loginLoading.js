var language = selectTheLang();

checkHeight();
loading();

$(document).ready(function() {
	loginOrNot = registerOrNot = loginTabNum = 0;

	loginTab.eq(loginTabNum).css({
		color: 'white',
		backgroundColor: 'cadetblue'
	});
	loginTab.eq(loginTabNum + 2).css({
		color: 'white',
		backgroundColor: 'cadetblue'
	});
});

function loading() {
	$('.loginAndReg').hide();
	$('.notepadLogin').eq(language).hide();
	$('header').css({
		top: "-70px"
	});
	$('footer').css({
		bottom: "-50px"
	});
	$('.loginAndReg').eq(language).css({
		height: "125%"
	}).animate({
		height: "100%",
		opacity: 'toggle'
	}, 2000);
	setTimeout('getready()', 1500);
}

function getready() {
	$('header').animate({
		top: "0px"
	});
	$('footer').animate({
		bottom: "0px"
	});
	$('.loginTabBody').hide();
	$('.loginTabBody').eq(language*2).show();
	$('.loginTab').eq(language*2).css({
		borderRight: "1px solid #5F9EA0"
	});
	setTimeout('realyready()', 500);
}

function realyready() {
	setInterval('checkHeight()', 100);
	$('.loginAndRegLogo').eq(language).animate({
		marginLeft: "26%"
	}, 1000);
	setTimeout(function() {
		$('.notepadLogin').eq(language).fadeIn()
	}, 1000);

}

//关于登录的彩蛋
$('.IDlogin').click(function() {
	if (registerOrNot == 0) {
		alert('无效的账号信息，请确认自己的账号是否输入正确！');
	} else if (registerOrNot == 1) {
		registerOrNot++;
		alert('虽然很抱歉，不过请您想想离线版哪里需要登录？请出门右转“游客登录”吧！');
	} else if (registerOrNot == 2) {
		registerOrNot++;
		alert('啊呀不要调戏程序员嘛！请出门右转选择“游客登录”吧！！');
	} else if (registerOrNot == 3) {
		registerOrNot++;
		alert('你再这样我是会生气的！！请、出、门、右、转、选、择、“游客登录”！！！');
	} else if (registerOrNot == 4) {
		registerOrNot++;
		alert('好吧你赢了。你不用出门右转了，左转去看眼科吧');
	} else {
		alert('您所拨打的用户不在服务区……');
	}
})

//游客登录
$('.TouristLogin').click(function() {
	window.location = "Web/notepadWall.html";
})

//切换到注册界面
$('.register').click(function() {
	var languageObj = selectTheLang();
	if (loginOrNot == 0) {
		$('.notepadRegister').toggle();
		$('.notepadLogin').toggle();
		loginOrNot = registerOrNot = 1;
		if(!languageObj) {
		$('#changeStyle').removeClass('register').addClass('login').text('登录');}
		else{
			$('#changeStyle').removeClass('register').addClass('login').text('login');
		}
	}
})

$('.registered').click(function() {
	var languageObj = selectTheLang();
	if (loginOrNot == 0) {
		$('.notepadRegister').toggle();
		$('.notepadLogin').toggle();
		loginOrNot = registerOrNot = 1;
		if(!languageObj) {
		$('#changeStyle').removeClass('register').addClass('login').text('登录');}
		else{
			$('#changeStyle').removeClass('register').addClass('login').text('login');
		}
	}
})

//切换到登录界面
$('.login').click(function() {
	var languageObj = selectTheLang();
	if (loginOrNot == 1) {
		$('.notepadRegister').toggle();
		$('.notepadLogin').toggle();
		loginOrNot = 0;
		if(!languageObj) {
		$('#changeStyle').addClass('register').removeClass('login').text('注册');}else{
			$('#changeStyle').addClass('register').removeClass('login').text('register');
		}
	}
})

//切换账号登录与游客登录
var loginTab = $('.loginTab');
var loginTabBody = $('.loginTabBody');
for (var i = 0; i < loginTab.length; i++) {
	loginTab.eq(i).mouseover(function() {
		loginTab.css({
			color: 'cadetblue',
			backgroundColor: 'white'
		})
		$(this).css({
			color: 'white',
			backgroundColor: 'cadetblue'
		})
	});
	loginTab.eq(i).mouseout(function() {
		$(this).css({
			color: 'cadetblue',
			backgroundColor: 'white'
		});
		loginTab.eq(loginTabNum).css({
			color: 'white',
			backgroundColor: 'cadetblue'
		});
		loginTab.eq(loginTabNum + 2).css({
			color: 'white',
			backgroundColor: 'cadetblue'
		});
	});
	loginTab.eq(i).click(function() {
		loginTabBody.hide();
		$(this).next().next().toggle();
		if (loginTabNum) {
			loginTabNum = 0
		} else {
			loginTabNum = 1
		};
	});
}

//判断浏览器高度
function checkHeight() {
	var loginAndReg = $('.loginAndReg');
	var OldHeight = Oheight;
	var Oheight = $(window).height();
	if (OldHeight != Oheight) {
		loginAndReg.css({
			height: $(window).height()
		})
	}
	if (1.5 * Oheight >= $(window).width()) {
		loginAndReg.css({
			backgroundSize: "auto 100%"
		})
	} else if (1.5 * Oheight < $(window).width()) {
		loginAndReg.css({
			backgroundSize: "100%"
		})
	}
}

//写着玩的……
$("input").keydown(function(event){
console.log(event.keyCode);
});