
//CONTROL GENERAL
function newi() {
	divedit.innerHTML=""; 
	currentFile="newFile";
}
function open(e) {
	if (document.getElementById("openable")&&document.getElementById("openable").style.display=="inline-block") {
		document.getElementById("openable").style.display="none";
		e.target.parentNode.parentNode.style.width=e.target.parentNode.parentNode.offsetWidth-140+"px";
		e.target.parentNode.style.width=e.target.parentNode.offsetWidth-140+"px";
	}
	else {
		div = document.createElement("div");
		div.id="openable";
		div.style.height="50px";
		div.style.margin="5px";
		div.style.boxShadow=" inset -1px -1px 0.5px 0px rgba(255,255,255,0.8),inset 1px 1px 0.5px 0px rgba(0,0,0,0.8)";
		div.style.width="120px";
		div.style.display="inline-block";
		div.style.overflowY="scroll";
		div.style.backgroundColor="lightgrey";
		e.target.parentNode.insertBefore(div,e.target.nextSibling);
		e.target.parentNode.parentNode.style.width=e.target.parentNode.parentNode.offsetWidth+140+"px";
		e.target.parentNode.style.width=e.target.parentNode.offsetWidth+140+"px";
		openSnd();
	}	
}

function save(e) {
	if (fileExists(currentFile))
		showSlide("Overwrite existing File ("+currentFile+") ?","no",saveSndRW);
	else
		showSlide("Save As..",currentFile,saveSnd);
}
function fileExists(str) {
	
	for (var i=0; i<document.getElementById("openable").childNodes.length; i++) {
		console.log(document.getElementById("openable").childNodes[i].innerText+":"+str);
		if (document.getElementById("openable").childNodes[i].innerText==str) 
			return true;
	}
	return false;
}
/*
function saveRW(str) {
	
		console.log("false");
}*/


function print() {alert("print");}
function undo() {document.execCommand('Undo', false, null);}
function redo() {document.execCommand('Redo', false, null);}
function cut() {rtb.value=tagAdd();	document.execCommand('cut', false, null);}
function copy() {rtb.value=tagAdd(); document.execCommand('copy', false, null);}
function paste(e) {	document.execCommand("insertHTML", false, rtb.value);}

function face_font(e) { 
	var rg = document.createRange();
	rg.setStart(mysel.startContainer,mysel.startOffset);
	rg.setEnd(mysel.endContainer,mysel.endOffset);
	sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(rg);
	document.execCommand("FontName", false, e.target.value); 
	mysel=sel.getRangeAt(0);
}

function face_size(e) { 
	var rg = document.createRange();
	rg.setStart(mysel.startContainer,mysel.startOffset);
	rg.setEnd(mysel.endContainer,mysel.endOffset);
	sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(rg);
	document.execCommand("FontSize", false, 7); 
	rg.startContainer.previousSibling.removeAttribute("size"); 
	rg.startContainer.previousSibling.style.fontSize = e.target.value+"px";
	rg.selectNode(rg.startContainer.previousSibling);
	sel.addRange(rg);
	mysel=sel.getRangeAt(0);
}



function sizedown() {
	var selstr = tagAdd();
	var ftsize = window.getComputedStyle(sel.anchorNode.parentNode, null).getPropertyValue('font-size');
	var size = parseInt(ftsize.substring(0,ftsize.indexOf("px")))-2;
	document.execCommand('insertHTML', false, "<span style=\"font-size:"+ size +"px\">"+selstr+"</span>");
}
function sizeup() {
	var selstr = tagAdd();
	var ftsize = window.getComputedStyle(sel.anchorNode.parentNode, null).getPropertyValue('font-size');
	var size = parseInt(ftsize.substring(0,ftsize.indexOf("px")))+2;
	document.execCommand('insertHTML', false, "<span style=\"font-size:"+ size +"px\">"+selstr+"</span>");
}

function headings(e) {
	
	document.execCommand('formatBlock', false, "<"+ e.target.name.toUpperCase()+">");
	//document.execCommand("heading", false, e.target.name.toUpperCase());
	closeDropDown();
}

function heading(e) {
	var dd = document.getElementById("ddmenu");
	emptyDDMenu(dd);
	dd.style.display="block";
	dd.style.top=getOffsetTop(e.currentTarget)+e.currentTarget.clientHeight+"px";
	dd.style.left=getOffsetLeft(e.currentTarget)+"px";
	for (var i=1; i<headingLength; i++) {
		var li = document.createElement("li");
		li.className="dditem";
		var h = document.createElement("h"+i);
		h.name="h"+i;
		h.addEventListener("click", headings , false);
		h.appendChild(document.createTextNode("Here is a Title "+i));
		li.appendChild(h);
		dd.appendChild(li);
	}	
}


 //if (!buttonState(e.target)) toggleButton(e.target); else toggleButton(e.target); 
function backcolor(e) {
	var dd = document.getElementById("ddmenu");
	emptyDDMenu(dd);
	dd.style.display="block";
	dd.style.top=getOffsetTop(e.currentTarget)+e.currentTarget.clientHeight+"px";
	dd.style.left=getOffsetLeft(e.currentTarget)+"px";
	dd.style.width=""; dd.style.height="";
	var li = document.createElement("li");	dd.appendChild(li);
	
	createColorPalette(li);
	
	//document.execCommand('backcolor', false, null);
}
function fontcolor() {document.execCommand('forecolor', false, null);}


function italic(e) {
	disableIfCollapsed(e.target); 
	selRecreate(); 
	document.execCommand('italic', false, null);
	mysel=sel.getRangeAt(0);
}
function stroke(e) {
	disableIfCollapsed(e.target); 
	selRecreate(); 
	document.execCommand('line-through', false, null);
	mysel=sel.getRangeAt(0);
}
function underline(e) { 
	disableIfCollapsed(e.target); 
	selRecreate(); 
	document.execCommand('underline', false, null);
	mysel=sel.getRangeAt(0);
}

function bold(e) { 
	disableIfCollapsed(e.target); 
	selRecreate();
	document.execCommand('bold', false, null);
	mysel=sel.getRangeAt(0);
}
function left(e) {
	disableIfCollapsed(e.target); 
	selRecreate(); 
	document.execCommand('justifyLeft', false, null);
	mysel=sel.getRangeAt(0);
}

function center(e) {
	disableIfCollapsed(e.target); 
	selRecreate();
	document.execCommand('justifyCenter', false, null);
	mysel=sel.getRangeAt(0);
}
function right(e) {
	disableIfCollapsed(e.target); 
	selRecreate();
	document.execCommand('justifyRight', false, null);
	mysel=sel.getRangeAt(0);
}
function justify(e) {
	disableIfCollapsed(e.target); 
	selRecreate();
	document.execCommand('justifyFull', false, null);
	mysel=sel.getRangeAt(0);
}

function image() {
	showSlide("Specify the file : ","file",imgInsert);
}
function imgInsert(str) { imgSnd("+str+"); } //
function link(e) { 
	if (buttonState(e.target)) document.execCommand('Unlink'); 
	else  showSlide("Specify the URL : ","text",linkCreate); }
function linkCreate(str) {document.execCommand('createlink', false, str); }
function anchor() {showSlide("Specify the anchor name : ","text",linkCreate);}

function imgSaver() {alert("imgSaver");}
function table() {console.log("table"); document.execCommand('enableInlineTableEditing',false,null);}

function resize() {document.execCommand('enableObjectResizing',false,true);}

function list(e) {
	var dd = document.getElementById("ddmenu");
	emptyDDMenu(dd);
	dd.style.display="block";
	dd.style.top=getOffsetTop(e.currentTarget)+e.currentTarget.clientHeight+"px";
	dd.style.left=getOffsetLeft(e.currentTarget)+"px";
	var li1 = document.createElement("li");
	li1.className="dditem";
	li1.addEventListener("click", unorderderedlist , false);
	li1.innerHTML="&#183; &nbsp;Unordered List";
	var li2 = document.createElement("li");
	li2.className="dditem";
	li2.addEventListener("click", numberlist , false);
	li2.innerHTML="1. &nbsp;Ordered List";
	dd.appendChild(li1);
	dd.appendChild(li2);
}
function unorderderedlist() {document.execCommand('insertUnorderedList', false, null); closeDropDown();}
function numberlist() {document.execCommand('insertOrderedList', false, null); closeDropDown();}



function block(e) {
	//RecurseBlock(edit);
	if (buttonState(e.target)) {hideBlock(divedit);} else {showBlock(divedit);}
	toggleButton(e.target);
}
function showBlock(obj) {
		
	var fragment = document.createDocumentFragment();
	for (var i=0; i<obj.childNodes.length; i++) {
		if (obj.childNodes[i].nodeType!=1) continue;
		obj.childNodes[i].style.border="1px dashed grey";
		obj.childNodes[i].style.position="relative";

			tle=document.createElement("span");
		tle.className="temp";
		tle.style.backgroundColor="black";
		tle.style.opacity="0.4";
		tle.style.color="white"
		tle.style.fontSize="10px";
		tle.style.fontWeight="bold";
		
		tle.textContent=obj.childNodes[i].tagName;
		tle.style.position="absolute";
		
		tle.style.top="0px"; //tle.style.top=getOffsetTop(obj.childNodes[i])+"px";
		tle.style.left="0px"; //getOffsetLeft(obj.childNodes[i])+"px";
		obj.childNodes[i].appendChild(tle);
	}
		
}

function hideBlock(obj) { 
	for (var i=0; i<obj.childNodes.length; i++) {
		if (obj.childNodes[i].nodeType!=1) continue;
		obj.childNodes[i].style.display="";
		obj.childNodes[i].style.border="0";		
		obj.childNodes[i].removeChild(obj.childNodes[i].getElementsByClassName("temp")[0]);
	}
}

function preview() {
	var dd = document.getElementById("ddmenu");
	dd.style.display="block";
	dd.style.top=divedit.offsetTop-50+"px"
	dd.style.marginLeft="5%";
	dd.style.height="70%";
	dd.style.width="90%";
	
	bar = document.createElement("div");
	bar.innerHTML="&nbsp;Preview";
	bar.className="prev";
	imgClose = document.createElement("img");
	imgClose.src="img/close.png";
	imgClose.style.width="20px"
	imgClose.style.height="20px"
	imgClose.style.position="absolute";
	imgClose.style.right="4px";
	imgClose.style.top="-4px"
	imgClose.addEventListener("click",closeDropDown,false);
	bar.appendChild(imgClose);
	corpus = document.createElement("div");
	corpus.style.backgroundColor="white";
	corpus.innerHTML=divedit.innerHTML;
	corpus.className="prev";
	back = document.createElement("div");
	back.className="back";
	//document.body.appendChild(back);
	back.className="prev";
	dd.appendChild(bar);
	dd.appendChild(corpus);
	

}

// DropDownMenu & SliderMenu
function showSlide(str,type, func){
	var popup = document.getElementById("slide");
	popup.childNodes[0].innerHTML=str;
	if (type=="no") popup.childNodes[1].style.display="none";
	else popup.childNodes[1].style.display="inline-block";
	if (type=="file") popup.childNodes[1].type=type; 
	else popup.childNodes[1].type="text";
	if (type!="text"&&type!="file")	popup.childNodes[1].value=currentFile;
	
	popup.style.display="block";
	popup.childNodes[2].addEventListener("click",function() {func(popup.childNodes[1].value);},true);
	popup.style.top=getOffsetTop(divedit.parentNode)+"px";
	popup.style.left=getOffsetLeft(divedit.parentNode)+"px";
	popup.style.width=divedit.parentNode.clientWidth+"px";
}

function emptyDDMenu(dd){ 
	while (dd.hasChildNodes()) {
		dd.removeChild(dd.lastChild);
	} 
}

//COLOR PALETTE
function createColorPalette(e) {
	ccont = document.createElement("div"); ccont.className="colorcont"; e.appendChild(ccont);
	for (var i=0; i<10; i++) {cp = document.createElement("div"); cp.className="colorbox"; cp.style.backgroundColor=colorList[i]; ccont.appendChild(cp);}
	cc = document.createElement("div"); cc.className="colorchoose"; e.appendChild(cc);
	lr = document.createElement("label");	lr.for="red"; lr.innerHTML="&nbsp;Red :"; cc.appendChild(lr);
	inr = document.createElement("input");	inr.id="red"; inr.type="range"; inr.min="0"; inr.max="255"; inr.value="0"; cc.appendChild(inr);
	lg = document.createElement("label");	lg.for="green"; lg.innerHTML="&nbsp;Green :"; cc.appendChild(lg);
	ing = document.createElement("input");	ing.id="green"; ing.type="range"; ing.min="0"; ing.max="255"; ing.value="0"; cc.appendChild(ing);
	lb = document.createElement("label");	lb.for="blue"; lb.innerHTML="&nbsp;Blue :"; cc.appendChild(lb);
	inb = document.createElement("input");	inb.id="blue"; inb.type="range"; inb.min="0"; inb.max="255"; inb.value="0"; cc.appendChild(inb);
}

//FONT CHECKER
var fontChecker = function() {
    var baseFonts = ['monospace', 'sans-serif', 'serif'];
    var testString = "mmmmmmmmmmlli";
    var testSize = '72px';
	var defaultWidth = {};
    var defaultHeight = {};
    
    var h = document.getElementsByTagName("body")[0];

    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    
	for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};

function checkNstyle(fam) {
	var fontchecker =  new fontChecker();
	if (fontchecker.detect(fam))
	document.getElementsByClassName("select")[0].style.fontFamily=fam;
}


//SELECTION & DIVEDIT MISC...
function selRecreate() {
	var rg = document.createRange();	rg.setStart(mysel.startContainer,mysel.startOffset);	rg.setEnd(mysel.endContainer,mysel.endOffset);
	sel = window.getSelection();	sel.removeAllRanges();	sel.addRange(rg);
}
function isEditable(elem) {do {if (elem==divedit) return true;} while (elem=elem.parentNode); console.log("not in edit"); return false;}

// BUTTON  MISC
function disableIfCollapsed(elem){if (mysel.isCollapsed) disableButton(elem);}
function toggleButton(elem) {if (elem.className.indexOf("bactive")==-1)	elem.className+=" bactive";	else elem.className=elem.className.split(" ")[0];}
function buttonState(elem) {return !(elem.className.indexOf("bactive")==-1);}
function enableButton(elem) { return elem.className+=" bactive";}
function disableButton(elem) { return elem.className=elem.className.split(" ")[0]; }

// GENERAL MISC
function getOffsetLeft( elem ){ var offsetLeft = 0; do { if ( !isNaN( elem.offsetLeft)) offsetLeft += elem.offsetLeft;  } while( elem = elem.offsetParent ); return offsetLeft;}
function getOffsetTop( elem ) { var offsetTop = 0; do { if ( !isNaN( elem.offsetTop)) offsetTop += elem.offsetTop;  } while( elem = elem.offsetParent ); return offsetTop;}
