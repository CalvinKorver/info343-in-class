"use strict";

var boxOne = document.getElementById('one'),
	boxTwo = document.getElementById('two'),
	boxThree = document.getElementById('three'),
	boxFour = document.getElementById('four'),
	boxFive = document.getElementById('five'),
	boxSix = document.getElementById('six');




boxOne.addEventListener("click", function() {
	boxOne.className += " fade-to-black";
	
});

boxTwo.addEventListener("click", function() {
	boxTwo.className += " fall";
});

boxThree.addEventListener("mouseover", function() {
	
	boxThree.className += " white";
});

boxThree.addEventListener("mouseout", function() {
	
	boxThree.className.replace(" white", "grey");
	
	
});