function loadSnd(e) {
	var req = new XMLHttpRequest();
	req.onload = loadLsnr;
	req.open("post", "http://localhost/editor/load.php", true);
	var toSend = new FormData();
	toSend.append('filename', e.target.innerText);
	req.send(toSend);
	currentFile=e.target.innerText;
}

function openSnd() {
	var req = new XMLHttpRequest();
	req.onload = openLsnr;
	req.open("post", "http://localhost/editor/read_dir.php", true);
	req.send();

}

function imgSnd() {
	var req = new XMLHttpRequest();
	req.onload = imgLsnr;
	var toSend = new FormData();
	toSend.append('fileUpload', document.getElementById("slide").childNodes[1].files[0]);
	req.upload.addEventListener("progress",
	function(e) {progress.style.backgroundPosition = parseInt(100 - (e.loaded / e.total * 100)) + "% 0";},false);
	req.addEventListener("load",function() {console.log("upload complete");},false);
	req.addEventListener("error",function() {console.log("error");},false);
	req.addEventListener("abort",function() {console.log("aborted");},false);
	req.open("post", "http://localhost/editor/upload.php", true);
	req.send(toSend);
	
	//PROGRESSBAR
	var sl = document.getElementById("slide");
	var prg = document.createElement("progress");
	var p = document.createElement("p");
	p.style.background="#0c0 none 0 0 no-repeat";
	var progress = prg.appendChild(p);
	sl.childNodes[1].style.display="none";
	sl.appendChild(prg);
}


function saveSnd(str) {
	var req = new XMLHttpRequest();
	req.onload = saveLsnr;
	req.open("post", "http://localhost/editor/save.php", true);
	var toSend = new FormData();
	toSend.append('filename', str);
	toSend.append('overwrite', 'false');
	toSend.append('data', divedit.innerHTML);
	req.send(toSend);
}

function saveSndRW(str) {
	console.log("saveSndRW");
	var req = new XMLHttpRequest();
	req.onload = saveLsnr;
	req.open("post", "http://localhost/editor/save.php", true);
	var toSend = new FormData();
	toSend.append('filename', str);
	toSend.append('overwrite', 'true');
	toSend.append('data', divedit.innerHTML);
	req.send(toSend);
}


//ONREADYSTATECHANGE LISTENER
function openLsnr () {
	console.log(this.responseText);
	var ob= document.getElementById("openable");
	for (var i=0; i<this.responseText.split(";").length; i++) {
		div = document.createElement("div");
		div.style.margin="0.2em";
		div.innerHTML=this.responseText.split(";")[i];
		ob.appendChild(div);
		div.addEventListener("mouseover",function(e) {e.target.style.color="cornflowerblue";},false);
		div.addEventListener("mouseout",function(e) {e.target.style.color="black";},false);
		div.addEventListener("click",loadSnd,false);
	}
}

function loadLsnr() {
	
	divedit.innerHTML=this.responseText;
}

function saveLsnr() {
	
	document.getElementById("slide").style.display="none";
}

function imgLsnr(e) {
	console.log(e.responseText);
	
}

