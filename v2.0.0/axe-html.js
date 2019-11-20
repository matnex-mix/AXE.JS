function prepare_axe_html() {

	do_axe_pointers();
	$fq = document.querySelectorAll("[axe-a][axe-n][axe-t]");

	$fq.forEach(function($fq_el){

		$fq_obj = {
			a: $fq_el.getAttribute("axe-a"),
			n: $fq_el.getAttribute("axe-n"),
			t: $fq_el.getAttribute("axe-t"),
			f: $fq_el.getAttribute("axe-f"),
			i: $fq_el.getAttribute("axe-i"),
			m: $fq_el.getAttribute("axe-m"),
			z: $fq_el.getAttribute("axe-z"),
			pseudo: $fq_el.getAttribute("axe-pseudo")
		}

		$fq_axe = $XE.$($fq_obj);
		$fq_cont = $fq_axe.apply($fq_el);

		Event($fq_cont, $fq_el);
		Moment($fq_cont, $fq_el);

		if($fq_el.hasAttribute("axe-start")) {
			$fq_cont.start();
		}

	});

	$fq = document.querySelectorAll("[axe-easy]");

	$fq.forEach(function($fq_el){

		$fq_obj = {
			a: $fq_el.getAttribute("axe-a"),
			n: $fq_el.getAttribute("axe-n"),
			t: $fq_el.getAttribute("axe-t"),
			f: $fq_el.getAttribute("axe-f"),
			i: $fq_el.getAttribute("axe-i"),
			m: $fq_el.getAttribute("axe-m"),
			z: $fq_el.getAttribute("axe-z"),
			pseudo: $fq_el.getAttribute("axe-pseudo")
		}

		$fq_axe = $XE.easy($fq_el.getAttribute("axe-easy"), $fq_obj);
		$fq_cont = $fq_axe.apply($fq_el);

		Event($fq_cont, $fq_el);
		Moment($fq_cont, $fq_el);

		if($fq_el.hasAttribute("axe-start")) {
			$fq_cont.start();
		}

	});

}

function Event($cont, $el) {

	if($el.hasAttribute("axe-onstart")) {

		var run = $el.getAttribute("axe-onstart");
		name = btoa(Date()-0).replace(/=/g, "");
		
		eval(name+" = function () { "+run+" }");
		$cont[0].event("start", name);

	}

	if($el.hasAttribute("axe-onpause")) {

		var run = $el.getAttribute("axe-onpause");
		name = btoa(Date()-0).replace(/=/g, "");
		
		eval(name+" = function () { "+run+" }");
		$cont[0].event("pause", name);

	}

	if($el.hasAttribute("axe-onplay")) {

		var run = $el.getAttribute("axe-onplay");
		name = btoa(Date()-0).replace(/=/g, "");
		
		eval(name+" = function () { "+run+" }");
		$cont[0].event("play", name);

	}

	if($el.hasAttribute("axe-onrestart")) {

		var run = $el.getAttribute("axe-onrestart");
		name = btoa(Date()-0).replace(/=/g, "");
		
		eval(name+" = function () { "+run+" }");
		$cont[0].event("restart", name);

	}

	if($el.hasAttribute("axe-onend")) {

		var run = $el.getAttribute("axe-onend");
		name = btoa(Date()-0).replace(/=/g, "");
		
		eval(name+" = function () { "+run+" }");
		$cont[0].event("end", name);

	}

}

function Moment($cont, $el) {

	if($el.hasAttribute("axe-moment")) {

		$moments = $el.getAttribute("axe-moment").split(";");
		
		$moments.forEach(function($moment){
			$cont.moment($moment.trim());
		});

	}

}

function support_axe_pointer( $el ) {

	$pointer = $el.getAttribute("axe-pointer");
	$pointer_dict = document.querySelector('style[axe-style=""]');
	
	if( $pointer_dict ){

		$pointer_dict = $pointer_dict.innerHTML.replace( /(?:\#[^\n]*)|\n/gm, '' );
		// Remove hard-code from here
		pi = $pointer_dict.indexOf( $pointer+' {' );
		if( pi != -1 ){

			final_obj = {n: $pointer}
			read = '';
			$pointer_dict = $pointer_dict.substring( pi );
			match = $pointer_dict.trim().search( /[-\w]+\s*\{/gm );

			if( match!=-1 ) {

				for( x = match; x < $pointer_dict.length; x++ ) {
					
					if( $pointer_dict[x] == '{' ) {
					
						read += $pointer_dict[x];
					
					} else if( $pointer_dict[x] == '}' && read ) {
					
						read += $pointer_dict[x];
						break;
					
					} else if( read ) { read += $pointer_dict[x]; }
				
				}

				name = ''; value = '';
				name_i = 0; val_i = 0;
				colon = '';
				read = read.substring( 1, read.length-1 ).replace( /\n|\t/gm, '' );

				for( x=0; x<read.length; x++ ) {
  	
					if( read[x] == ':' && !colon ) {
					  
					  name = read.substring( name_i, x );
					  val_i = x+1;
					
					} else if( (read[x] == ',' && colon == '') || x==read.length-1 ) {
					  
					  value = read.substring( val_i, x );
					  name_i = x+1;
					  final_obj[name.trim()] = value.trim();
					
					} else if( (read[x] == '"' || read[x] == '\'') && read[x] == colon ) {
					  
					  colon = '';
					
					} else if( (read[x] == '"' || read[x] == '\'') && !colon ) {
					  colon = read[x];
					}

				}
				//Error: console.error('AXE SyntaxError: axe-pointers not properly formed'); console.trace();

				$el.removeAttribute('axe-pointer');
				return final_obj;
				
			} else { console.error('AXE SyntaxError: axe-pointers not properly formed'); console.trace(); return false; }

		} else {
			console.warn('AXE NullPointerException: element is pointing to an undefined axe-style');
			console.trace();
			return false;
		}

	} else {
		return false;
	}

}

function do_axe_pointers() {
	$fq = document.querySelectorAll( "[axe-pointer]:not([axe-pointer=''])" );
	$fq.forEach( function( $fq_el ){

		$fq_obj = support_axe_pointer($fq_el);
		if( $fq_obj === false ) {
			return;
		}

		$fq_axe = $XE.$($fq_obj);
		$fq_cont = $fq_axe.apply($fq_el);

		Event($fq_cont, $fq_el);
		Moment($fq_cont, $fq_el);

		if($fq_el.hasAttribute("axe-start")) {
			$fq_cont.start();
		}

	});
}

if(document.readyState == "loading") {
	
	document.addEventListener("DOMContentLoaded", prepare_axe_html);

} else {
	prepare_axe_html();
}