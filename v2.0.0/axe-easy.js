/* Define All AXE Easy Animations */
/*
	
	See all axe-easy default animations, copy this to a javascript console

**
	console.log( JSON.parse( atob( 'eyJib3VuY2UiOnsiYSI6IkFUMCUgdDogdFktLTEwMCU7IG86IDA7IEFUNSUgdDogdFktLTEwMCUgbzogMDsgQVQxNSUgdDogdFktMDsgcEI6IDU\
	7IEFUMzAlIHQ6IHRZLS01MCU7IEFUNDAlIHQ6IHRZLTA7IHBCOiA2OyBBVDUwJSB0OiB0WS0tMzAlOyBBVDcwJSB0OiB0WS0wOyBwQjogN3B4OyB\
	BVDgwJSB0OiB0WS0tMTUlOyBBVDkwJSB0OiB0WS0wOyBwYjogNzsgQVQ5NSUgdDogdFktLTclOyBBVDk3JSB0OiB0WS0wOyBwQjogOTsgQVQ5OSU\
	gdDogdFktLTMlOyBBVDEwMCUgdDogdFktMDsgcEI6IDk7ICIsIm4iOiJib3VuY2UiLCJ0IjozLCJmIjoiZWFzZS1vdXQifX0=' ) ) )
**

*/
$xeasy = {
	"bounce": {
		a: "AT0%,20%,53%,80%,100% atf: cubic-bezier(0.215, 0.61, 0.355, 1); t: td-0,0,0; AT40%,43% atf: cubic-bezier(0.755, 0.05, 0.855, 0.06); t: td-0,-30px,0; AT70% atf: cubic-bezier(0.755, 0.05, 0.855, 0.06); t: td-0,-15px,0; AT90% t: td-0,-4px,0;",
		t: 1,
		extra: "to: center bottom;"
	},
	"flash": {
		a: "AT0%,50%,100% o: 1; AT25%,75% o: 0;",
		t: 1
	},
	"pulse": {
		a: "AT0% t: sd-1,1,1; AT50% t: sd-1.05,1.05,1.05; AT100% t: sd-1,1,1;",
		t: 1
	},
	"rubber-band": {
		a: "AT0% t: sd-1,1,1; AT30% t: sd-1.25,0.75,1; AT40% t: sd-0.75,1.25,1; AT50% t: sd-1.15,0.85,1; AT65% t: sd-0.95,1.05,1; AT75% t: sd-1.05,0.95,1; AT100% t: sd-1,1,1;",
		t: 1
	},
	"shake": {
		a: "AT0%,100% t: td-0,0,0; AT10%,30%,50%,70%,90% t: td--10px,0,0; AT20%,40%,60%,80% t: td-10px,0,0;",
		t: 1
	},
	"head-shake": {
		a: "AT0% t: tX-0; AT6.5% t: tX--6px rY--9deg; AT18.5% t: tX-5px rY-7deg; AT31.5% t: tX--3px rY--5deg; AT43.5% t: tX-2px rY-3deg; AT50% t: tX-0;",
		t: 1,
		f: "ease-in-out"
	},
	"swing": {
		a: "AT20% t: rd-0,0,1,15deg; AT40% t: rd-0,0,1,-10deg; AT60% t: rd-0,0,1,5deg; AT80% t: rd-0,0,1,-5deg; AT100% t: rd-0,0,1,0deg;",
		t: 1,
		extra: "to: top center;"
	},
	"tada": {
		a: "AT0% t: sd-1,1,1; AT10%,20% t: sd-0.9,0.9,0.9 rd-0,0,1,-3deg; AT30%,50%,70%,90% t: sd-1.1,1.1,1.1 rd-0,0,1,3deg; AT40%,60%,80% t: sd-1.1,1.1,1.1 rd-0,0,1,-3deg; AT100% t: sd-1,1,1;",
		t: 1
	},
	"wobble": {
		a: "AT0% t: td-0,0,0; AT15% t: td--25%,0,0 rd-0,0,1,-5deg; AT30% t: td-20%,0,0 rd-0,0,1,3deg; AT45% t: td--15%,0,0 rd-0,0,1,-3deg; AT60% t: td-10%,0,0 rd-0,0,1,2deg; AT75% t: td--5%,0,0 rd-0,0,1,-1deg; AT100% t: td-0,0,0;",
		t: 1
	},
	"jello": {
		a: "AT0%,11.1%,100% t: td-0,0,0; AT22.2% t: skX--12.5deg skY--12.5deg; AT33.3% t: skX-6.25deg skY-6.25deg; AT44.4% t: skX--3.125deg skY--3.125deg; AT55.5% t: skX-1.5625deg skY-1.5625deg; AT66.6% t: skX--0.78125deg skY--0.78125deg; AT77.7% t: skX-0.390625deg skY-0.390625deg; AT88.8% t: skX--0.1953125deg skY--0.1953125deg;",
		t: 1,
		extra: "to: center;"
	},
	"heart-beat": {
		a: "AT0% t: s-1; AT14% t: s-1.3; AT28% t: s-1; AT42% t: s-1.3; AT70% t: s-1;",
		t: 1.3,
		f: "ease-in-out"
	},
	"bounce-in": {
		a: "AT0%,20%,40%,60%,80%,100% atf: cubic-bezier(0.215, 0.61, 0.355, 1); AT0% o: 0; t: sd-0.3,0.3,0.3; AT20% t: sd-1.1,1.1,1.1; AT40% t: sd-0.9,0.9,0.9; AT60% o: 1; t: sd-1.03,1.03,1.03; AT80% t: sd-0.97,0.97,0.97; AT100% o: 1; t: sd-1,1,1;",
		t: 0.75
	},
	"bounce-in-down": {
		a: "AT0%,60%,75%,90%,100% atf: cubic-bezier(0.215, 0.61, 0.355, 1); AT0% o: 0; t: td-0,-3000px,0; AT60% o: 1; t: td-0,25px,0; AT75% t: td-0,-10px,0; AT90% t: td-0,5px,0; AT100% t: td-0,0,0;",
		t: 1
	},
	"bounce-in-left": {
		a: "AT0%,60%,75%,90%,100% atf: cubic-bezier(0.215, 0.61, 0.355, 1); AT0% o: 0; t: td--3000px,0,0; AT60% o: 1; t: td-25px,0,0; AT75% t: td--10px,0,0; AT90% t: td-5px,0,0; AT100% t: td-0,0,0;",
		t: 1
	},
	"bounce-in-right": {
		a: "AT0%,60%,75%,90%,100% atf: cubic-bezier(0.215, 0.61, 0.355, 1); AT0% o: 0; t: td-3000px,0,0; AT60% o: 1; t: td--25px,0,0; AT75% t: td-10px,0,0; AT90% t: td--5px,0,0; AT100% t: td-0,0,0;",
		t: 1
	},
	"bounce-in-up": {
		a: "AT0%,60%,75%,90%,100% atf: cubic-bezier(0.215, 0.61, 0.355, 1); AT0% o: 0; t: td-0,3000px,0; AT60% o: 1; t: td-0,-20px,0; AT75% t: td-0,10px,0; AT90% t: td-0,-5px,0; AT100% t: td-0,0,0;",
		t: 1
	},
	"bounce-out": {
		a: "AT20% t: sd-0.9,0.9,0.9; AT50%,55% o: 1; t: sd-1.1,1.1,1.1; AT100% o: 0; t: sd-0.3,0.3,0.3;",
		t: 0.75
	},
	"bounce-out-down": {
		a: "AT20% t: td-0,10px,0; AT40%,45% o: 1; t: td-0,-20px,0; AT100% o: 0; t: td-0,2000px,0;",
		t: 1
	},
	"bounce-out-left": {
		a: "AT20% o: 1; t: td-20px,0,0; AT100% o: 0; t: td--2000px,0,0;",
		t: 1
	},
	"bounce-out-right": {
		a: "AT20% o: 1; t: td--20px,0,0; AT100% o: 0; t: td-2000px,0,0;",
		t: 1
	},
	"bounce-out-up": {
		a: "AT20% t: td-0,-10px,0; AT40%,45% o: 1; t: td-0,20px,0; AT100% o: 0; t: td-0,-2000px,0;",
		t: 1
	},
	"fade-in": {
		a: "AT0% o: 0; AT100% o: 1;",
		t: 1
	},
	"fade-in-down": {
		a: "AT0% o: 0; t: td-0,-100%,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"fade-in-down-big": {
		a: "AT0% o: 0; t: td-0,-2000px,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"fade-in-left": {
		a: "AT0% o: 0; t: td--100%,0,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"fade-in-left-big": {
		a: "AT0% o: 0; t: td--2000px,0,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"fade-in-right": {
		a: "AT0% o: 0; t: td-100%,0,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"fade-in-right-big": {
		a: "AT0% o: 0; t: td-2000px,0,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"fade-in-up": {
		a: "AT0% o: 0; t: td-0,100%,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"fade-in-up-big": {
		a: "AT0% o: 0; t: td-0,2000px,0; AT100% o: 1; t: td-0,0,0;",
		t: 1
	},
	"": {
		t: 1
	},
	"": {
		t: 1
	},
	"": {
		t: 1
	}
}

// axe-easy Extensions
// $xeasy[extension-name] = animation-options