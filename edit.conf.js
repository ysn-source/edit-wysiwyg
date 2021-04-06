var tree = [{title:"Home", box:[{size:210,ctl:["NEWI","OPEN","SAVE","PRINT"]}]},
			{title:"Edit", 
				box:[{size:120,ctl:["PASTE","cut","copy","redo","undo"]},
					{size:195,ctl:["face","sizeup","backcolor","fontcolor","heading","sizedown"]},
					{size:120,ctl:["bold","italic","stroke","underline","left","center","right","justify"]},
					{size:60,ctl:["table","link","list","resize"]}
					//{size:100,ctl:[]}
					]
			},
			{title:"Insert", box:[{size:150,ctl:["IMAGE","link","anchor","table","list"]}]},
			{title:"View", box:[{size:150,ctl:["PREVIEW","BLOCK"]}]}
		];
				
var edit = "textarea.editor";
var divedit;			
var rtb;
var mysel;
var currentFile;

var fontList =
["Arial", 
"Arial Black",
"Helvetica", 
 "Gadget",	
"Comic Sans MS",
"cursive",
"Impact", 
"Charcoal",
"Lucida Sans Unicode",
"Lucida Grande",
"Tahoma", 
"Geneva",
"Trebuchet MS", 
"Helvetica",
"Verdana", 
"Geneva"];

var colorList = ["lightblue","cornflowerblue","purple","red","darkred","lightgreen","yellow","orange","lightgrey","black"];

var headingLength = 6;
