$(document).ready(function() {
	$(".notepadNav>li").eq(2).css({
		backgroundColor: " #00fff0",
		textShadow: "0 0 2px #0182a8"
	});

});

//保存与退出
$(".SaveNewNote").click(SaveNotepad);

$(".CancelNewNote").click(function() {
	var languageObj = selectTheLang();
	if (!languageObj) {
		if (window.confirm("您确认要放弃保存并退出吗?")) {
			window.location = "notepadWall.html";
		}
	} else {
		if (window.confirm("Are you sure to quit without save?")) {
			window.location = "notepadWall.html";
		}
	}
})

//存储新建的记事本——要用主js文件的函数
function SaveNotepad() {
	var languageObj = selectTheLang();
	var notepadTitle = $(".inputTheTitle").eq(languageObj).val();
	var notepadNode = $(".inputTheArticle").eq(languageObj).html();
	if (notepadTitle == "") {
		if (!languageObj) {
			alert("请输入标题后再保存!");
		} else {
			alert("Please enter the Title then save!");
		}
	} else if (notepadNode == "") {
		if (!languageObj) {
			alert("请输入内容后再保存!");
		} else {
			alert("Please enter the Article then save!");
		}
	} else {
		var date = new Date();
		var dateNow = (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		var key = date.getTime();
		var NotepadTitle = getNotepadTitle();
		NotepadTitle[key] = notepadTitle;
		setNotepadTitle(NotepadTitle);
		var NotepadArticle = getNotepadArticle();
		NotepadArticle[key] = notepadNode;
		setNotepadArticle(NotepadArticle);
		var NotepadDate = getNotepadDate();
		NotepadDate[key] = dateNow;
		setNotepadDate(NotepadDate);
		if (!languageObj) {
			alert("保存成功！");
		} else {
			alert("Save successfully!");
		}
		$(".inputTheArticle").empty();
		notepadTitle == "";
		window.location = "notepadWall.html";
	}
}

var addStyle = 0;
//插入视频
$(".addVideo").click(function() {
	var languageObj = selectTheLang();
	if (languageObj) {
		alert("Please use the newly inserted upload control uploaded video.")
	} else {
		alert("请用文中新插入的上传控件上传视频")
	}
	$(".inputTheArticle").attr('contenteditable', 'false');
	$('<input />', {
		type: 'file',
		class: 'getVideo',
		onchange: 'getURL(this)'
	}).appendTo(".inputTheArticle");
	addStyle = 0;
})

//插入音频
$(".addAudio").click(function() {
	var languageObj = selectTheLang();
	if (languageObj) {
		alert("Please use the newly inserted upload control uploaded audio.")
	} else {
		alert("请用文中新插入的上传控件上传音频")
	}
	$(".inputTheArticle").attr('contenteditable', 'false');
	$('<input />', {
		type: 'file',
		class: 'getAudio',
		onchange: 'getURL(this)'
	}).appendTo(".inputTheArticle");
	addStyle = 1;
})

//插入图片
$(".addPicture").click(function() {
	var languageObj = selectTheLang();
	if (languageObj) {
		alert("Please use the newly inserted upload control uploaded image.")
	} else {
		alert("请用文中新插入的上传控件上传图片")
	}
	$(".inputTheArticle").attr('contenteditable', 'false');
	$('<input />', {
		type: 'file',
		class: 'getImg',
		onchange: 'getURL(this)'
	}).appendTo(".inputTheArticle");
	addStyle = 2;
})

var myUrl = path = "";

//input的获取url
function getURL(node) {
	var myUrl = "";
	//	if (!!window.ActiveXObject || "ActiveXObject" in window) {
	//		var imgURL = "";
	//		var file = null;
	//		if (node.files && node.files[0]) {
	//			file = node.files[0];
	//		} else if (node.files && node.files.item(0)) {
	//			file = node.files.item(0);
	//		}
	//
	//		//这种获取方式支持IE10    
	//		node.select();
	//		myUrl = document.selection.createRange().text;
	//		alert(myUrl);
	//
	//		obj.select();
	//		window.parent.document.body.focus();
	//		myUrl = document.selection.createRange().text;
	//	} else 
	{
		try {
			var file = null;
			if (node.files && node.files[0]) {
				file = node.files[0];
			} else if (node.files && node.files.item(0)) {
				file = node.files.item(0);
			}
			//Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
			try {
				//Firefox7.0   
				myUrl = file.getAsDataURL();
				//alert("//Firefox7.0"+imgRUL);                           
			} catch (e) {
				//Firefox8.0以上                                
				myUrl = window.URL.createObjectURL(file);
				//alert("//Firefox8.0以上"+imgRUL);  
			}
		} catch (e) { //这里不知道怎么处理了，如果是遨游的话会报这个异常                   
			//支持html5的浏览器,比如高版本的firefox、chrome、ie10  
			if (node.files && node.files[0]) {
				var reader = new FileReader();
				reader.onload = function(e) {
					myUrl = e.target.result;
				};
				reader.readAsDataURL(node.files[0]);
			}
		}

		if (addStyle == 0) {
			creatVideo(myUrl);
		} else if (addStyle == 1) {
			creatAudio(myUrl);
		} else if (addStyle == 2) {
			creatImg(myUrl);
		}
		return myUrl;
	}
}

function creatVideo(RUL) {
	var textHtmlVideo = "<br><video src='" + RUL + "' controls='controls' style= 'max-width:900px' /></video><br><br>";
	var getVideo = $(".getVideo");
	getVideo.parent().append(textHtmlVideo);
	getVideo.remove();
	$(".inputTheArticle").attr('contenteditable', 'true');
}

function creatAudio(RUL) {
	var textHtmlAudio = "<br><audio src='" + RUL + "' controls='controls' style= 'max-width:900px' /></audio><br><br>";
	var getAudio = $(".getAudio");
	getAudio.parent().append(textHtmlAudio);
	getAudio.remove();
	$(".inputTheArticle").attr('contenteditable', 'true');
}

function creatImg(RUL) {
	var textHtmlImg = "<br><img src='" + RUL + "' style= 'max-width:900px' /><br><br>";
	var getImg = $(".getImg");
	getImg.parent().append(textHtmlImg);
	getImg.remove();
	$(".inputTheArticle").attr('contenteditable', 'true');
}

//插入地址信息
$(".addAddress").click(function() {
	var languageObj = selectTheLang();
	var myCity = new BMap.LocalCity();
	myCity.get(getCityByIP);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showErrorMsg);
	} else {
		if (languageObj) {
			alert("Your browser does not support to use HTML5 to obtain location services.")
		} else {
			alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
		}
	}
})

//获取经纬度
function showPosition(data) {
	var languageObj = selectTheLang();
	var cds = data.coords;
	var lon = cds.longitude;
	var lat = cds.latitude;
	var acc = cds.accuracy;

	if (languageObj) {
		$('<div />', {
			text: "longitude:" + lon + ";latitude:" + lat + ";Accuracy:" + acc
		}).appendTo(".inputTheArticle");
	} else {
		$('<div />', {
			text: "经度：" + lon + "；纬度：" + lat + "；准确度：" + acc
		}).appendTo(".inputTheArticle");
	}
}

//根据IP定位所在城市
function getCityByIP(rs) {
	var languageObj = selectTheLang();
	var cityName = rs.name;
	if (languageObj) {
		$('<div />', {
			text: "Your city is:" + cityName
		}).appendTo(".inputTheArticle");
	} else {
		$('<div />', {
			text: "您所在的城市为：" + cityName
		}).appendTo(".inputTheArticle");
	}
}

//失败
function showErrorMsg() {
	var languageObj = selectTheLang();
	if (languageObj) {
		alert('Failed to get latitude and longitude, check user permissions or replace browser');
	} else {
		alert('获取经纬度失败，请检查用户权限或更换浏览器');
	}
}

//导航栏hover
var notepadNav = $('.notepadNav>li');
for (var i = 0; i < notepadNav.length; i++) {
	notepadNav.eq(i).mouseover(function() {
		notepadNav.css({
			backgroundColor: " #00c5ff",
			textShadow: "none"
		});
		$(this).css({
			backgroundColor: " #00fff0",
			textShadow: "0 0 2px #0182a8"
		});
	});
	notepadNav.eq(i).mouseout(function() {
		$(this).css({
			backgroundColor: " #00c5ff",
			textShadow: "none"
		});
		notepadNav.eq(2).css({
			backgroundColor: " #00fff0",
			textShadow: "0 0 2px #0182a8"
		});
		notepadNav.eq(6).css({
			backgroundColor: " #00fff0",
			textShadow: "0 0 2px #0182a8"
		});
	});
};