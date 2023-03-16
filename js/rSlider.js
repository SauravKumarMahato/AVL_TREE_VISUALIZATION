(function () {
	"use strict";

	var init = function () {
	  var slider2 = new rSlider({
		target: "#slider2",
		values: [0, 1, 2, 3, 4, 5, 6, "7", 8],
		range: false,
		set: [5],
		tooltip: false,
		onChange: function (vals) {
		  console.log(vals);
		},
	  });
	};
	window.onload = init;
  })();