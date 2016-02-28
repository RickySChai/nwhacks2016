(function() {
	"use strict";
	//var Firebase = require("firebase");

	window.onload = function() {

	};

	var myFirebaseRef = new Firebase("https://luminous-fire-9933.firebaseio.com");

	myFirebaseRef.child("locations/latitude").set("chinchin");

	myFirebaseRef.on("value", function(snapshot) {
		var chin = snapshot.child("locations/latitude");
		console.log(chin.val());
	});


})();