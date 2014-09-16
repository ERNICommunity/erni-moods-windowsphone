/// <reference path="/Scripts/jquery-2.1.1.js" />
var simpleGoogleMapsApiExample = simpleGoogleMapsApiExample || {};

simpleGoogleMapsApiExample.map = function (mapDiv, latitude, longitude) {
    "use strict";

    var createMap = function (mapDiv, coordinates) {
        var mapOptions = {
            center: coordinates,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15
        };

        return new google.maps.Map(mapDiv, mapOptions);
    };

    var initialize = function (mapDiv, latitude, longitude) {
        var coordinates = new google.maps.LatLng(latitude, longitude);

        createMap(mapDiv, coordinates);
    };

    initialize(mapDiv, latitude, longitude);
};

$(document).ready(function () {
    "use strict";

    simpleGoogleMapsApiExample.map($("#map")[0], 55.612278, 12.999406);
});