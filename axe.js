// Define prototype for backward Browsers

if(!String.prototype.endsWith) {

	String.prototype.endsWith = function($str) {

		if(this[this.length-1] == $str) return true;
		return false;

	}

}

function AXE($opt) {

	if(!$opt.a) return console.error("AXE: Animation Keyframes not Set")&&console.trace();
	else if(!$opt.n) return console.error("AXE: Animation Name not Set")&&console.trace();
	else if(!$opt.t) return console.error("AXE: Animation Duration not Set")&&console.trace();

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

// AXE Core - Personal Use functions

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
			console.log(ex); //

			console.warn("AXE: You have an error in your definition syntax, kindly check and retry");

		}

	};

	delete($vars, $real_vars, $propv, $ri);

};

// Prepare animation option for compilation.

AXE.prototype.prepare = function() {

	if(typeof this != "object") return;

	$anim = this.animation;

	if($anim.indexOf("DEF") != -1 && $anim.indexOf("||") != -1) {

		$anim = $anim.split(/\|\|/);
		
		this.define_vars($anim[0].trim());

	} else this.compile_keyframes($anim);

};

// AXE compiled_frames Builder

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

// Resetting AXE Animations

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

// For Specifically Setting||Changing Particular AXE Frames

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

// AXE Apply animation to Elements

AXE.prototype.apply = function($el_s) {

	if(typeof $el_s == "string") $el_s = document.querySelector($el_s);

	if($el_s.length) {

		$el_s.forEach(function($el_){

			$el_.classList.add("axe-"+this.name);
			$el_.setAttribute("data-axe-class", "axe-"+this.name);
			$el_.classList.add("axe-paused");

		});

	}

	$el_s.classList.add("axe-"+this.name);
	$el_s.setAttribute("data-axe-class", "axe-"+this.name);
	$el_s.classList.add("axe-paused");

	return $XE.control($el_s);

}

/*
	AXE Controls Module
*/

function AXECONTROLS($el_s) {

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

};

// AXE prototype CONTROL Module

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

// AXE Events Module

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

/* Momentux */

AXECONTROLS.prototype.moment = function ($ct) {

	$ct = $ct.split(",");

	if(!$ct[2]) {

		if(this.index == -1) {

			var $this = this;
			this.forEach(function($obj){

				$obj.DOM.addEventListener($ct[1].trim(), function(){
					$this[$ct[0]]();
				});

			});

		} else {

			var $this = this;
			this.DOM.addEventListener($ct[1].trim(), function(){
				$this[$ct[0]]();
			});

		}

	} else {

		

	}

}

/*
	AXE Controls END
*/

/*
	AXE Easy Module
*/

function AXEEASY($name, $opt) {

	/* Define All AXE Easy Animations */
	//$xeasy = JSON.parse(atob("eyJib3VuY2UiOnsiYSI6IkFUMCUgdDogdFktLTEwMCU7IG86IDA7IEFUNSUgdDogdFktLTEwMCUgbzogMDsgQVQxNSUgdDogdFktMDsgcEI6IDU7IEFUMzAlIHQ6IHRZLS01MCU7IEFUNDAlIHQ6IHRZLTA7IHBCOiA2OyBBVDUwJSB0OiB0WS0tMzAlOyBBVDcwJSB0OiB0WS0wOyBwQjogN3B4OyBBVDgwJSB0OiB0WS0tMTUlOyBBVDkwJSB0OiB0WS0wOyBwYjogNzsgQVQ5NSUgdDogdFktLTclOyBBVDk3JSB0OiB0WS0wOyBwQjogOTsgQVQ5OSUgdDogdFktLTMlOyBBVDEwMCUgdDogdFktMDsgcEI6IDk7ICIsIm4iOiJib3VuY2UiLCJ0IjozLCJmIjoiZWFzZS1vdXQifX0="));
	$xeasy = {
		"bounce": {
			"a": "AT0% t: tY--100%; o: 0; AT5% t: tY--100% o: 0; AT15% t: tY-0; pB: 5; AT30% t: tY--50%; AT40% t: tY-0; pB: 6; AT50% t: tY--30%; AT70% t: tY-0; pB: 7px; AT80% t: tY--15%; AT90% t: tY-0; pb: 7; AT95% t: tY--7%; AT97% t: tY-0; pB: 9; AT99% t: tY--3%; AT100% t: tY-0; pB: 9;",
			"n": "bounce",
			"t": 3,
			"f": "ease-out"
		}
	}

	if($xeasy[$name]) {

		if($xeasy[$name].ini) $xeasy[$name].ini();

		$easy = new AXE($xeasy[$name]);
		if($opt) $easy.reset($opt);

		return $easy;

	} else {

		console.warn("AXE: Trying to Use undefined AXE-EASY Animation");
		console.trace();

	}



}

// AXE Caller

var $XE = {
	"new": function ($opt) { return new AXE($opt); },
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
	// AXE Animation Controls
	control: function($el_s) { return new AXECONTROLS($el_s); },
	easy: function($axe_name, $axe_options) { return AXEEASY($axe_name, $axe_options); }

}

// Initialize AXE

if(document.readyState != "loading") {
	
	document.addEventListener("DOMContentLoaded", function() {

		$XE.Initialize();

	});

} else {

	$XE.Initialize();

}