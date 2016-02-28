(function() {
	//var Firebase = require("firebase");
	var myFirebaseRef = new Firebase("https://luminous-fire-9933.firebaseio.com");
	myFirebaseRef.child("locations/latitude").set("oppai");
})();