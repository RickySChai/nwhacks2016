/**
 * Created by Evan on 2/27/2016.
 */
(function() {
    "use strict";

    var map = L.map('map');
    window.onload = function () {
        loadMap();
        initCoursera();
    };

    /*
     *   generic ajax caller method
     */

    function ajax(url, func) {
        var req = new XMLHttpRequest();
        req.onload = func;
        req.open("GET", url, true);
        
        req.send();
    }

    /*
     *    LEAFTLET JS
     */
    function loadMap() {

        var key = "pk.eyJ1IjoiZXZhbmZyYXdsZXkiLCJhIjoiY2lqemV0cDJpMmx2a3Z3bTV2dGh1bmt0MSJ9.gJsWsiu3AareD8XkI1-0Aw";

        var url = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" + key;

        L.tileLayer(url, {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

        map.setView([47.6550, -122.3080], 13);
        getData();
    }

    function getData() {
        var url = "https://data.seattle.gov/resource/awnr-r8xe.json";
        ajax(url, addMap);
    }

    function addMap() {
        var data = JSON.parse(this.responseText);
        //console.log(this.responseText);
        for (var i = 0; i < data.length; i++) {
            var popup = "<h3>" + data[i].address + "</h3>";
            if (data[i].website !== undefined) {
                popup += "<br /><a href=\"" + data[i].website.url + "\">Website</a>";
            }
            L.marker([data[i].latitude, data[i].longitude]).addTo(map).bindPopup(popup);

        }
    }


    /*
     *      FIREBASE JS
     */

    var myFirebaseRef = new Firebase("https://luminous-fire-9933.firebaseio.com");

    myFirebaseRef.child("locations/latitude").set("chinchin");

    myFirebaseRef.on("value", function (snapshot) {
        var chin = snapshot.child("locations/latitude");
        console.log(chin.val());
    });

    /*
     *      COURSERA JS
     */

    function initCoursera() {

        var url = "https://api.coursera.org/api/courses.v1?fields=domainTypes,description,startDate";
        //get the things to make this a specific url    

        ajax(url, loadCourera);
    }

    function loadCourera() {
        var data = JSON.parse(this.responseText);
        // do shit to the data that is passed in
        // look at the data of coursera
        var test = data.elements[3].startDate.toDateString();

        console.log(test);
    }



})();