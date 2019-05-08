/** *
*
*	AXE v1.0.0 and is a lightweight javascript library for creating animations
*	Lear more about AXE <https://github.com/matnex-mix/AXE.JS/wiki/Introduction>
*	Copyright (C) <2019>  <Jolaosho AbdulMateen (Matnex Mix)>

*	This program is free software: you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation, either version 3 of the License, or
*	(at your option) any later version.

*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU General Public License for more details.

*	You should have received a copy of the GNU General Public License
*	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
** */

if(!String.prototype.endsWith) {
	String.prototype.endsWith = function($str) {
		if(this[this.length-1] == $str) return true;
		return false;
	}
}
function AXE($opt) {
	if(!$opt.a) { return; console.error("AXE: Animation Keyframes not Set"); console.trace(); }
	else if(!$opt.n) { return; console.error("AXE: Animation Name not Set"); console.trace(); }
	else if(!$opt.t) { return; console.error("AXE: Animation Duration not Set"); console.trace(); }
	this.animation = $opt.a;
	this.name = $opt.n;
	this.duration = $opt.t;
	this.iteration = $opt.i||1;
	this.delay = $opt.d||0;
	this.timing = $opt.f||"ease-in";
	this.mode = $opt.m||"";
	this.direction = $opt.z||"";
	this.pseudo = $opt.pseudo||"";
	!this.pseudo||(this.pseudo = ":"+this.pseudo);
	this.prepare();
	this.build();
};
AXE.prototype.compile_keyframes = function($frames) {
	if(typeof this != "object") return;
	var $build_object = {};
	try {
		$ex = $frames.split(/\s*AT[0-9.,%]+\s*/);
		$mex = $frames.match(/AT[0-9.,%]+/g);
		$ex.shift(0, 1);
		$mex.forEach( function($mex_i, $mex_e){
			$cur_build_object = {};
			$frame_string = $ex[$mex_e].split(";");
			$frame_string[$frame_string.length-1]||$frame_string.pop();
			$frame_string.forEach(function($fs){
				$cur = $fs.split(/\s*:\s*/);
				$curs = "";
				if($cur[0] == "t") {
					$curs = $cur[1].split(/\s/);
					$cur[1] = {};
					$curs.forEach(function($curS){
						$curi = $curS.indexOf("-");
						$curS = [$curS.substring(0,$curi), $curS.substring($curi+1)];
						$cur[1][$curS[0]] = $curS[1]||"";
					});
				}
				$cur_build_object[$cur[0]] = $cur[1]||"";
			});
			$nm = $mex_i.substring(2).split(",");
			$nm.forEach(function($nim) {
				$build_object[$nim] = $cur_build_object;
			});
		});
		this.compiled_frames = $build_object;
	} catch($ex) {
		console.log("AXE: Keyframes Sequence Not Properly Formed");
		console.trace();
	}
	delete($build_object, $cur_build_object, $cur, $curs, $frames, $frame_string, $ex, $mex);
};
AXE.prototype.define_vars = function($vars) {
	if(typeof this != "object") return;
	if($vars.startsWith("DEF")) {
		$real_vars = $vars.replace("DEF", "").replace(":", "").trim();
		$real_vars = $real_vars.match(/\$?[A-Za-z_]{1,6}\[[A-Za-z0-9.`]*\]/g);
		try {
			this.vars = this.vars||{};
			for ($ri = 0; $ri < $real_vars.length; $ri++) {
				$propv = $real_vars[$ri].replace(/]$/, "").split("[");
				if($propv[1].startsWith("`")) {
					this.vars[$propv[0]] = eval($propv[1].substring(1));
				} else this.vars[$propv[0]] = $propv[1];
			}
		} catch (ex) {
			console.log(ex); 			console.warn("AXE: You have an error in your definition syntax, kindly check and retry");
		}
	};
	delete($vars, $real_vars, $propv, $ri);
};
AXE.prototype.prepare = function() {
	if(typeof this != "object") return;
	$anim = this.animation;
	if($anim.indexOf("DEF") != -1 && $anim.indexOf("||") != -1) {
		$anim = $anim.split(/\|\|/);
		this.define_vars($anim[0].trim());
	} else this.compile_keyframes($anim);
};
AXE.prototype.build = function() {
	$class = ".axe-"+this.name+this.pseudo+"{\n";
	$arrs = ["", "-webkit-", "-ms-", "-os-"];
	$this = this;
	$arrs.forEach(function($arr){
		$class += "\t"+$arr+"animation-name: axeframes-"+$this.name+";\n";
		$class += "\t"+$arr+"animation-duration: "+$this.duration+"s;\n";
		$class += "\t"+$arr+"animation-iteration-count: "+$this.iteration+";\n";
		$class += "\t"+$arr+"animation-delay: "+$this.delay+"s;\n";
		$class += "\t"+$arr+"animation-timing-function: "+$this.timing+";\n";
		$class += "\t"+$arr+"animation-fill-mode: "+$this.mode+";\n";
		$class += "\t"+$arr+"animation-direction: "+$this.direction+";\n";
	});
	$class += "}";
	$Keyframes = "@Keyframes axeframes-"+this.name+" {\n"
	$axe_obj = this.compiled_frames;
	for ( $axe in $axe_obj ){
		$axes = $axe;
		if(!$axe.endsWith("%")) $axes = ((parseFloat($axe)/this.duration)*100)+"%";
		$Keyframes += "\t"+$axes+" {\n";
		for( $axe_ind in $axe_obj[$axe] ) {
			$axe_main = $axe_obj[$axe][$axe_ind];
			$axe_ind = $axe_ind.trim();
			if($XE.cssProps[$axe_ind]) {
				if(typeof $axe_main == "object") {
					$axe_mains = "";
					for($axe_n in $axe_main) {
						$axe_lit = $axe_n;
						if($XE.cssProps["-"+$axe_ind+$axe_n]) $axe_lit = $XE.cssProps["-"+$axe_ind+$axe_n].long_name;
						$axe_mains += $axe_lit+"("+$axe_main[$axe_n]+") ";
					}
					$axe_main = $axe_mains;
				}
				if(RegExp(/\d+/).test($axe_main)) $axe_main+=$XE.cssProps[$axe_ind].default_unit;
				$XE.cssProps[$axe_ind].browser_support.forEach(function($br) {
					$brow = $XE.cssProps[$axe_ind].browser_support[$br];
					$Keyframes += "\t\t-"+$br+"-"+$XE.cssProps[$axe_ind].long_name+": "+$axe_main+";\n";
				});
				$Keyframes += "\t\t"+$XE.cssProps[$axe_ind].long_name+": "+$axe_main+";\n";
			}
		}
		$Keyframes += "\t}\n";
	}
	$Keyframes += "}";
	$el = document.getElementById("axestyle-"+this.name);
	if(!$el) { $el = document.createElement("style"); $el.id = "axestyle-"+this.name; document.head.appendChild($el); }
	$el.innerHTML = $class+"\n\n"+$Keyframes;
}
AXE.prototype.reset = function($new_opt) {
	this.animation = $new_opt.a||this.animation;
	if($new_opt.n) {
		document.head.removeChild(document.getElementById("axestyle-"+this.name));
		this.name = $new_opt.n;
	}
	this.duration = $new_opt.t||this.duration;
	this.iteration = $new_opt.i||this.iteration||1;
	this.delay = $new_opt.d||this.delay||0;
	this.timing = $new_opt.f||this.timing||"ease-in";
	this.mode = $new_opt.m||this.mode||"";
	this.direction = $new_opt.z||this.direction||"";
	this.pseudo = $new_opt.pseudo||this.pseudo||"";
	!this.pseudo||(this.pseudo = ":"+this.pseudo);
	this.prepare();
	this.build();
}
AXE.prototype.setFrames = function($frame_object) {
	$df_object = this.compiled_frames;
	if(typeof $frame_object == "string") {
		this.compile_keyframes($frame_object);
		$frame_object = this.compiled_frames;
	}
	try {
		for ($frame in $frame_object) {
			if(!$df_object[$frame] || $frame.axe_write) {
				$df_object[$frame] = {};
			}
			for ($frames in $frame_object[$frame]) {
				$df_object[$frame][$frames] = $frame_object[$frame][$frames];
			}
		}
		this.compiled_frames = $df_object;
		this.build();
	} catch(ex) {
		console.error("AXE Error: Unknown Error Ocurred");
		console.trace();
		this.compiled_frames = $df_object;
	}
}
AXE.prototype.apply = function($el_s) {
	if(typeof $el_s == "string") $el_s = document.querySelector($el_s);
	if($el_s.length) {
		$el_s.forEach(function($el_){
			$el_.classList.add("axe-paused");
			$el_.classList.add("axe-"+this.name);
			$el_.setAttribute("data-axe-class", "axe-"+this.name);
		});
	}
	$el_s.classList.add("axe-paused");
  	$el_s.setAttribute("data-axe-class", "axe-"+this.name);
  	$axec = $XE.control($el_s);
  	if(this.ini) this.ini($axec);
	return $axec;
}
function AXECONTROLS($el_s) {
	try {
		if(typeof $el_s == "string") $el_s = document.querySelector($el_s);
		if($el_s.length) {
			$el_s.forEach(function($el_, $i){
				$obj = {DOM: $el_, index: $i}
				$obj.__proto__ = this.__proto__;
				$this = this;
				$el_.onanimationstart = function(){ $this.runEvents("start"); };
				$el_.onanimationcancel = function(){ $this.runEvents("cancel"); };
				$el_.onanimationiteration = function(){ $this.runEvents("cycle"); };
				$el_.onanimationend = function(){ $this.runEvents("end"); };
				this[$i] = $obj;
			});
			this.length = $el_s.length;
		} else { 
			$obj = {DOM: $el_s, index: 0};
			$obj.__proto__ = this.__proto__;
			$this = this;
			$el_s.onanimationstart = function(){ $this.runEvents("start"); };
			$el_s.onanimationcancel = function(){ $this.runEvents("cancel"); };
			$el_s.onanimationiteration = function(){ $this.runEvents("cycle"); };
			$el_s.onanimationend = function(){ $this.runEvents("end"); };
			this[0] = $obj;
			this.length = 1;
		}
		this.index = -1;
	} catch (ex) { console.log("AXE: Catched Exception; "+ex); }
};
AXECONTROLS.prototype.start = function (){
	if(this.index == -1) {
		this.forEach(function($v){
			$v.start();
		});
		return;
	}
	$class = this.DOM.dataset.axeClass;
	this.DOM.classList.add($class);
	this.play();
};
AXECONTROLS.prototype.pause = function (){
	if(this.index == -1) {
		this.forEach(function($v){
			$v.pause();
		});
		return;
	}
	this.DOM.classList.add("axe-paused");
	this.runEvents("pause");
};
AXECONTROLS.prototype.play = function (){
	if(this.index == -1) {
		this.forEach(function($v){
			$v.play();
		});
		return;
	}
	this.DOM.classList.remove("axe-paused");
	this.runEvents("play");
};
AXECONTROLS.prototype.end = function (){
	if(this.index == -1) {
		this.forEach(function($v){
			$v.end();
		});
		return;
	}
	$class = this.DOM.dataset.axeClass;
	this.DOM.classList.remove($class);
	this.pause();
};
AXECONTROLS.prototype.restart = function (){
	if(this.index == -1) {
		this.forEach(function($v){
			$v.restart();
		});
		return;
	}
	this.end();
	$this = this;
	setTimeout(function() { $this.start(); }, 10);
	this.runEvents("restart");
};
AXECONTROLS.prototype.forEach = function($_do){
	for($i = 0; $i < this.length; $i++) {
		$_do(this[$i], $i);
	}
};
AXECONTROLS.prototype.event = function($event_name, $_do) {
	if(!this.events) this.events = {};
	if(!this.events[$event_name]) this.events[$event_name] = [];
	this.events[$event_name].push(btoa($_do));
};
AXECONTROLS.prototype.r_event = function($event_name, $_do) {
	if(!this.events[$event_name]) {
		console.warn("AXE: Attempting to Remove function of undefined Event Type");
		return;
	}
	$i = this.events[$event_name].indexOf(btoa($_do));
	if($i != -1) this.events[$event_name].shift($i, 1);
};
AXECONTROLS.prototype.runEvents = function($event_name) {
	if(!this.events) this.events = {};
	if(this.index == -1) {
		this.forEach(function($this){
			$this.runEvents($event_name);
		});
		return;
	}
	if(this.events[$event_name]) {
		this.events[$event_name].forEach(function($_do){
			eval("("+atob($_do)+")()");
		});
	}
}
AXECONTROLS.prototype.moment = function ($ct) {
	$ct = $ct.split(",");
	$func = btoa($ct.join(',')).replace(/=/gi,"");
	eval($func+' = function () { $this[$ct[0]](); }');
	if(!$ct[2]) {
		if(this.index == -1) {
			var $this = this;
			this.forEach(function($obj){
				eval('$obj.DOM.addEventListener($ct[1].trim(), '+$func+')');
			});
		} else {
			var $this = this;
			eval('this.DOM.addEventListener($ct[1].trim(), '+$func+')');
		}
	} else {
		$els = document.querySelectorAll($ct[2].trim());
		if($els.length > 1) {
			var $this = this;
			$els.forEach(function($obj){
				eval('$obj.addEventListener($ct[1].trim(), '+$func+')');
			});
		} else {
			var $this = this;
			eval('$els[0].addEventListener($ct[1].trim(), '+$func+')');
		}
	}
		}
AXECONTROLS.prototype.r_moment = function($ct) {
	if($ct.toUpperCase() === "CLEAR") $XE.moments = {};
	else {
		$id = btoa($ct).replace(/=/gi,"");
		if($XE.moments[$id]) delete($XE.moments[$id]);
		$ct = $ct.split(",");
		if(!$ct[2]) {
			if(this.index == -1) {
				var $this = this;
				this.forEach(function($obj){
					eval('$obj.DOM.removeEventListener($ct[1].trim(), '+$id+')');
				});
			} else {
				var $this = this;
				eval('this.DOM.removeEventListener($ct[1].trim(), '+$id+')');
			}
		} else {
			$els = document.querySelectorAll($ct[2].trim());
			if($els.length > 1) {
				var $this = this;
				$els.forEach(function($obj){
					eval('$obj.removeEventListener($ct[1].trim(), '+$id+')');
				});
			} else {
				var $this = this;
				eval('$els[0].removeEventListener($ct[1].trim(), '+$id+')');
			}
		}
	}
}
function AXEEASY($name, $opt) {
	if(typeof $xeasy !== "object") { console.log("AXE: Cannot use Easy-Axe, Module not loaded"); console.trace(); return; }
	if($xeasy[$name]) {
		$easy = new AXE($xeasy[$name]);
		if($opt) $easy.reset($opt);
		if($xeasy[$name].ini) $xeasy[$name].ini($easy);
		return $easy;
	} else {
		console.warn("AXE: Trying to Use undefined AXE-EASY Animation");
		console.trace();
	}

}
var $XE = {
	"$": function ($opt) { return new AXE($opt); },
	OPTIMIZE: {
		registerCssProp: function($short_name, $long_name, $browser_support, $dft_ext) {
			if(!$short_name) return console.log("AXE: registerCssProp; short_name not specified");
			if(!$long_name) return console.log("AXE: registerCssProp; long_name not specified");
			$browser_support = $browser_support||"";
			$browser_support = $browser_support.replace("o", "|os|").replace("m", "|moz|").replace("e", "|ms|").replace("w", "|webkit|");
			$browser_support = $browser_support.split(/\s*\|\|?\s*/)||[];
			$browser_support.pop(); $browser_support.shift(0, 1);
			$XE.cssProps[$short_name] = {"long_name": $long_name, "browser_support": $browser_support||"", "default_unit": $dft_ext||""}
		},
		cssPropExists: function($short_name) {
			return $XE.cssProps.hasOwnProperty($short_name);
		}
	},
	cssProps: {},
	Initialize: function() {
		$axe_style = document.createElement("style");
		$axe_style.innerHTML = ".axe-paused{animation-play-state: paused !important;}";
		document.head.appendChild($axe_style);
	},
	moments: {},
		control: function($el_s) { return new AXECONTROLS($el_s); },
	easy: function($axe_name, $axe_options) { return AXEEASY($axe_name, $axe_options); }
}
if(document.readyState != "loading") {
	document.addEventListener("DOMContentLoaded", function() {
		$XE.Initialize();
	});
} else {
	$XE.Initialize();
}
$XE.OPTIMIZE.registerCssProp("t", "transform", "mwoe");
$XE.OPTIMIZE.registerCssProp("-tr", "rotate");
$XE.OPTIMIZE.registerCssProp("-trX", "rotateX");
$XE.OPTIMIZE.registerCssProp("-trY", "rotateY");
$XE.OPTIMIZE.registerCssProp("-ts", "scale");
$XE.OPTIMIZE.registerCssProp("-tsX", "scaleX");
$XE.OPTIMIZE.registerCssProp("-tsY", "scaleY");
$XE.OPTIMIZE.registerCssProp("-tsk", "skew");
$XE.OPTIMIZE.registerCssProp("-tskX", "skewX");
$XE.OPTIMIZE.registerCssProp("-tskY", "skewY");
$XE.OPTIMIZE.registerCssProp("-tt", "translate");
$XE.OPTIMIZE.registerCssProp("-ttX", "translateX");
$XE.OPTIMIZE.registerCssProp("-ttY", "translateY");
$XE.OPTIMIZE.registerCssProp("bg","background");
$XE.OPTIMIZE.registerCssProp("bga","background-attachment");
$XE.OPTIMIZE.registerCssProp("bgc","background-color");
$XE.OPTIMIZE.registerCssProp("bgi","background-image");
$XE.OPTIMIZE.registerCssProp("bgp","background-position");
$XE.OPTIMIZE.registerCssProp("bgr","background-repeat");
$XE.OPTIMIZE.registerCssProp("b","border");
$XE.OPTIMIZE.registerCssProp("bb","border-bottom");
$XE.OPTIMIZE.registerCssProp("bbc","border-bottom-color");
$XE.OPTIMIZE.registerCssProp("bbs","border-bottom-style");
$XE.OPTIMIZE.registerCssProp("bbw","border-bottom-width");
$XE.OPTIMIZE.registerCssProp("bc","border-color");
$XE.OPTIMIZE.registerCssProp("bl","border-left");
$XE.OPTIMIZE.registerCssProp("blc","border-left-color");
$XE.OPTIMIZE.registerCssProp("bls","border-left-style");
$XE.OPTIMIZE.registerCssProp("blw","border-left-width");
$XE.OPTIMIZE.registerCssProp("br","border-right");
$XE.OPTIMIZE.registerCssProp("brc","border-right-color");
$XE.OPTIMIZE.registerCssProp("brs","border-right-style");
$XE.OPTIMIZE.registerCssProp("brw","border-right-width");
$XE.OPTIMIZE.registerCssProp("bs","border-style");
$XE.OPTIMIZE.registerCssProp("bt","border-top");
$XE.OPTIMIZE.registerCssProp("btc","border-top-color");
$XE.OPTIMIZE.registerCssProp("bts","border-top-style");
$XE.OPTIMIZE.registerCssProp("btw","border-top-width");
$XE.OPTIMIZE.registerCssProp("bw","border-width");
$XE.OPTIMIZE.registerCssProp("clr","clear");
$XE.OPTIMIZE.registerCssProp("clp","clip");
$XE.OPTIMIZE.registerCssProp("col","color");
$XE.OPTIMIZE.registerCssProp("cur","cursor");
$XE.OPTIMIZE.registerCssProp("dis","display");
$XE.OPTIMIZE.registerCssProp("fil","filter");
$XE.OPTIMIZE.registerCssProp("fl","float");
$XE.OPTIMIZE.registerCssProp("f","font");
$XE.OPTIMIZE.registerCssProp("ff","font-family");
$XE.OPTIMIZE.registerCssProp("fs","font-size");
$XE.OPTIMIZE.registerCssProp("fv","font-variant");
$XE.OPTIMIZE.registerCssProp("fw","font-weight");
$XE.OPTIMIZE.registerCssProp("h","height");
$XE.OPTIMIZE.registerCssProp("lef","left");
$XE.OPTIMIZE.registerCssProp("lts","letter-spacing");
$XE.OPTIMIZE.registerCssProp("lh","line-height");
$XE.OPTIMIZE.registerCssProp("ls","list-style");
$XE.OPTIMIZE.registerCssProp("lsi","list-style-image");
$XE.OPTIMIZE.registerCssProp("lsp","list-style-position");
$XE.OPTIMIZE.registerCssProp("lst","list-style-type");
$XE.OPTIMIZE.registerCssProp("m","margin");
$XE.OPTIMIZE.registerCssProp("mb","margin-bottom");
$XE.OPTIMIZE.registerCssProp("ml","margin-left");
$XE.OPTIMIZE.registerCssProp("mr","margin-right");
$XE.OPTIMIZE.registerCssProp("mt","margin-top");
$XE.OPTIMIZE.registerCssProp("o","opacity");
$XE.OPTIMIZE.registerCssProp("ov","overflow");
$XE.OPTIMIZE.registerCssProp("ox","overflow-x");
$XE.OPTIMIZE.registerCssProp("oy","overflow-y");
$XE.OPTIMIZE.registerCssProp("p","padding");
$XE.OPTIMIZE.registerCssProp("pb","padding-bottom");
$XE.OPTIMIZE.registerCssProp("pl","padding-left");
$XE.OPTIMIZE.registerCssProp("pr","padding-right");
$XE.OPTIMIZE.registerCssProp("pt","padding-top");
$XE.OPTIMIZE.registerCssProp("pba","page-break-after");
$XE.OPTIMIZE.registerCssProp("pbb","page-break-before");
$XE.OPTIMIZE.registerCssProp("pos","position");
$XE.OPTIMIZE.registerCssProp("sda","stroke-dasharray");
$XE.OPTIMIZE.registerCssProp("sdo","stroke-dashoffset");
$XE.OPTIMIZE.registerCssProp("sw","stroke-width");
$XE.OPTIMIZE.registerCssProp("ta","text-align");
$XE.OPTIMIZE.registerCssProp("td","text-decoration");
$XE.OPTIMIZE.registerCssProp("ti","text-indent");
$XE.OPTIMIZE.registerCssProp("tt","text-transform");
$XE.OPTIMIZE.registerCssProp("top","top");
$XE.OPTIMIZE.registerCssProp("va","vertical-align");
$XE.OPTIMIZE.registerCssProp("vis","visibility");
$XE.OPTIMIZE.registerCssProp("w","width");
$XE.OPTIMIZE.registerCssProp("z","z-index");
