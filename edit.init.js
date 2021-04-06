var lastind=0;

function cr(elem,st="") {
	let o = document.createElement(elem);
	st.forEach((k,v)=> o.style.setProperty(k,v));
	return o;
}

function showTab(evt) {
	var ind = evt.target.id;
	var source = document.getElementsByClassName("tab");
	
	source[lastind].style.top="";
	source[ind].style.top="-"+ind*80+"px";
	
	document.getElementById(lastind).style.background="";
	evt.target.style.background="linear-gradient(to bottom, #f2f5f6 0%,#e3eaed 37%,#c8d7dc 100%)";
	
	lastind=ind;	
}

function getImgElem(t,stl) {
	let cv = new CanvasGradient();
	let ctx = cv.getContext("2d"); 
	let cvImage = new Image(stl); ctx.drawImage(stl,0,0);
	let img= cr("img",{ width:"20px",	height:"20px",	position:"relative",top:"8px","right":"1px"});	img.src="img/chevron.png"; 
	let span= cr("span");	span.setAttribute("name",str);
	span.style.top="0px"; span.appendChild(document.createTextNode(stl));
	obj.appendChild(span);	obj.appendChild(img);
}

var tbind=0;
function create(dest,nType,nClass,str,stl) {
	//var dest = document.getElementsByClassName(nClsDest);
	var obj = cr(nType); obj.setAttribute("name",str); obj.className=nClass;
	if (nClass=="but"||nClass=="bigbut") { obj.title=str; obj.style.backgroundImage="url('img/"+stl+"')"; obj.style.backgroundRepeat="no-repeat";}
	else if (nClass=="but headings") { 
		let img= cr("img",{ width:"20px",	height:"20px",	position:"relative",top:"8px","right":"1px"}); img.src="img/chevron.png";
		let span=  cr("span",{top:"0px"});	span.setAttribute("name",str);
		span.appendChild(document.createTextNode(stl));
		obj.appendChild(span);
		obj.appendChild(img);
	}
	else if (nClass=="select") {
		obj.type="text"
		obj.setAttribute("list","fontdata");
		var d = cr("datalist"); d.id="fontdata";
		for (var i=0; i<fontList.length; i++) {
			var opt = cr("option");	opt.value=fontList[i];	opt.innerHTML=fontList[i];	d.appendChild(opt);
		}	
	}
	else if (nClass=="selsize") {
		obj.type="text"
		obj.setAttribute("list","fontsize");
		obj.style.width="40px";  obj.style.height="15px";
		var d = cr("datalist"); d.id="fontsize"
		for (var i=8; i<=40; i+=2) {
			var opt = cr("option");
			opt.value=i; opt.innerHTML=i;
			d.appendChild(opt)
		}
	}
	else if (nClass=="box") {obj.style.width=stl+"px";}
	else if (nClass=="tabtitle") {obj.appendChild(document.createTextNode(str));}
	else if (nClass=="slide") {
		obj.style.fontWeight="bold";
		obj.style.position="absolute";
		obj.style.width="50px";
		obj.style.display="none";
		obj.id=nClass;
		obj.appendChild(document.createElement("span"));
		file = cr("input",{"marginLeft":"20px"});
		file.type="file"; obj.appendChild(file);
		okB = create(obj,"div","but","okb","check.png");
		okB.style.position="absolute";
		okB.style.top="-3px"; okB.style.right="45px";
		//	okB.addEventListener("click",imgSaver,false);
		
		clsB = create(obj,"div","but","clsb","close.png");
		clsB.style.position="absolute";
		clsB.style.top="-3px"; clsB.style.right="5px";
		clsB.addEventListener("click",function () {this.parentNode.style.display="none";},false);
	}
	else if (nClass=="ddmenu") {
		obj.id=nClass;	
	}
	dest.appendChild(obj);
	if (d) dest.appendChild(d);
	return obj;
}

function updateToolBar() {
	if (!mysel.startContainer) return;
	
	// FACE
	var ftsize = window.getComputedStyle(mysel.startContainer.parentNode, null).getPropertyValue('font-size');
	var ftfam =  window.getComputedStyle(mysel.startContainer.parentNode, null).getPropertyValue('font-family');
	document.getElementsByClassName("select")[0].value=ftfam.replace("\"","");
	checkNstyle(ftfam.replace("\"",""));
	document.getElementsByClassName("selsize")[0].value=ftsize.replace("px","");
	
	//FORMAT
	var link = (mysel.startContainer.parentNode.tagName=="A");
	if (link) {enableButton(document.getElementsByName("link")[0]);} else {disableButton(document.getElementsByName("link")[0]);}
	var bold =  (window.getComputedStyle(mysel.startContainer.parentNode, null).getPropertyValue('font-weight')=="bold");
	if (bold) {enableButton(document.getElementsByName("bold")[0]);} else {disableButton(document.getElementsByName("bold")[0]);}
	var italic =  (window.getComputedStyle(mysel.startContainer.parentNode, null).getPropertyValue('font-style')=="italic");
	if (italic) {enableButton(document.getElementsByName("italic")[0]);} else {disableButton(document.getElementsByName("italic")[0]);}
	var stroke =  (window.getComputedStyle(mysel.startContainer.parentNode, null).getPropertyValue('text-decoration')=="line-through");
	if (stroke) {enableButton(document.getElementsByName("stroke")[0]);} else {disableButton(document.getElementsByName("stroke")[0]);}
	var under =  (window.getComputedStyle(mysel.startContainer.parentNode, null).getPropertyValue('text-decoration')=="underline");
	if (under) {enableButton(document.getElementsByName("underline")[0]);} else {disableButton(document.getElementsByName("underline")[0]);}
	
	
}

function selectionHandle (evt) { 
	//console.log("mouseup");
	if (isEditable(evt.target)) { //&&evt.target.hasFocus()
		mysel=window.getSelection().getRangeAt(0);
		console.log("selection logged: "+mysel);
		
	}
	updateToolBar();
}
function buttonHandle(evt) {
	closeDropDown();
	//console.log(evt.target.getAttribute("name").toLowerCase());
	var fn = window[evt.target.getAttribute("name").toLowerCase()];
	if (typeof fn == "function") fn(evt);
}

function closeDropDown() { dd = document.getElementsByClassName("ddmenu"); dd[0].style.display="none"; emptyDDMenu(dd[0]); }

function fontListHandle(evt){checkNstyle(evt.target.value); }

function tagAdd() {
	console.log(mysel);
	range = mysel; 
	common = range.commonAncestorContainer.children;
	var result = mysel;
	if (!common) return result;
	for (var i=0; i<common.length; i++) {
		
		result = result.toString().replace(common[i].innerHTML,common[i].outerHTML);
	}
	return result;
}


function paint() {
	for (var i=0; i<tree.length; i++) {
		currTabt = create(document.getElementsByClassName("tabhead")[0],"li","tabtitle",tree[i].title);
		currTabt.id=i;
		currTabt.addEventListener("click",showTab,false); 
		currTab = create(document.getElementsByClassName("toolbar")[0],"div","tab","");
		for (var j=0; j<tree[i].box.length; j++) {
			currBox = create(currTab,"div","box","box",tree[i].box[j].size);
			currCon = create(currBox,"div","contain","aaa");
			var lastIsBig = false;
			for (var jj=0; jj<tree[i].box[j].ctl.length; jj++) {
				if (tree[i].box[j].ctl[jj]=="face") {
					currSel = create(currCon,"input","select",tree[i].box[j].ctl[jj]+"_font");
					currSel = create(currCon,"input","selsize",tree[i].box[j].ctl[jj]+"_size");
				}
				else if (tree[i].box[j].ctl[jj].toUpperCase()==tree[i].box[j].ctl[jj]) {
					console.log(getCtlRatio(i,j));
					currCon.style.width=tree[i].box[j].size/getCtlRatio(i,j)+"px";
					currBut = create(currCon,"div","bigbut",tree[i].box[j].ctl[jj],tree[i].box[j].ctl[jj]+".png");
					currCon = create(currBox,"div","contain","aaa");
					lastIsBig=true;
				}
				else if (tree[i].box[j].ctl[jj]=="heading") {
					currBut = create(currCon,"div","but headings",tree[i].box[j].ctl[jj],"Headings");
				}
				else {
					if (lastIsBig) currCon.style.width=tree[i].box[j].size/2+"px"; else currCon.style.width=tree[i].box[j].size+"px";
					currBut = create(currCon,"div","but",tree[i].box[j].ctl[jj],tree[i].box[j].ctl[jj]+".png");
				}
			}
			
		}
	}
	currSlide= create(document.body,"div","slide");
	currd= create(document.body,"ul","ddmenu");
	
}

function getCtlRatio(i,j) {
	var ratio = 0;
	var lil=0;
	for (var k=0; k<tree[i].box[j].ctl.length; k++) {
		if (tree[i].box[j].ctl[k].toUpperCase()==tree[i].box[j].ctl[k]) 
			ratio++;
		else
			lil++;
		if (lil==4) 
			ratio++;
	}
	
	
	return ratio;
}


function init() {
	rtb = document.querySelector(edit);
	divedit = document.createElement("div");
	rtb.style.display="none";
	//rtb.addEventListener("selectionchange", slcHandle, false);
	var divglob = document.createElement("div");
	divglob.appendChild(divedit);
	divedit.className="editor";
	divglob.className="global";
	var htmlStr = unescape(rtb.value);
	divedit.innerHTML=htmlStr;
	rtb.parentNode.appendChild(divglob);
	divedit.contentEditable="true";
	
	
	b = document.getElementsByClassName("toolbar")[0].getElementsByClassName("but");
	for (var k=0; k<b.length; k++) {
		str = b[k].getAttribute("name");
		b[k].addEventListener("click",buttonHandle,false);
	}
	
	b = document.getElementsByClassName("bigbut");
	for (var k=0; k<b.length; k++) {str = b[k].getAttribute("name");b[k].addEventListener("click",buttonHandle,false);}
	
	
	divedit.addEventListener("click",function() { closeDropDown();},true);
	
	selectEvent = document.getElementsByClassName("select");
	document.getElementsByClassName("select")[0].addEventListener("click",function() {},false);
	document.getElementsByClassName("select")[0].addEventListener("input",fontListHandle,false);
	document.getElementsByClassName("select")[0].addEventListener("change",buttonHandle,false);
	document.getElementsByClassName("select")[0].addEventListener("focus",function(e) {e.target.value="";},false);
	document.getElementsByClassName("selsize")[0].addEventListener("focus",function(e) {e.target.value="";},false);
	//document.getElementsByClassName("selsize")[0].addEventListener("input",function (e) {setTimeout(buttonHandle(e),2000);},false);
	document.getElementsByClassName("selsize")[0].addEventListener("change",buttonHandle,false);
	
	divedit.addEventListener("mouseup",selectionHandle,true);
	divedit.addEventListener("blur",function (e) {return false;},false); //divedit.setSelectionRange(sel.anchorNode,sel.focusNode);
	//divedit.addEventListener("paste", function(e) { e.preventDefault();  document.execCommand("insertHTML", false, e.clipboardData.getData("text/plain"));});
	
	document.execCommand('stylewithcss', false, null);
	
}
document.addEventListener('DOMContentLoaded', paint, false);
window.addEventListener('load', init, false);