// JavaScript Document
<!-- 屏蔽网页右鍵,适用于IE6,IE7,IE8,FireFox,谷歌Chrome浏览器 开始-->
function clickIE4(){
	if (event.button==2){
		return false;
	}
}
function clickNS4(e){
	if (document.layers||document.getElementById&&!document.all){
		if (e.which==2||e.which==3){
			return false;
		}
	}
}
function OnDeny(){
	if(event.ctrlKey || event.keyCode==78 && event.ctrlKey || event.altKey || event.altKey && event.keyCode==115){
		return false;
	}
}
if (document.layers){
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown=clickNS4;
	document.onkeydown=OnDeny();
}else if (document.all&&!document.getElementById){
	document.onmousedown=clickIE4;
	document.onkeydown=OnDeny();
}
document.oncontextmenu=new Function("return false");
<!--屏蔽网页右鍵,适用于 IE6,IE7,IE8,FireFox,谷歌Chrome浏览器 结束-->







