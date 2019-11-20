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

function prepare_axe_html() {
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
if(document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", prepare_axe_html);
} else {
	prepare_axe_html();
}