/// <reference path="/Scripts/jquery-2.1.1.js" />
/// <reference path="/Bing.Maps.JavaScript/js/veapicore.js" />

(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;
    WinJS.UI.Pages.define("/pages/mapWithMoods.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });
            function initMap() {
                var map;

                var mapOptions =
                {
                    credentials: "AkUeZZ_8CT2Y1VawMWhAIPyfKwEtKLxtrj0TkHVMAR4J8TCCdcJ6z6-rvk14mMFP",
                    center: new Microsoft.Maps.Location(49.029645, 21.276521),
                    zoom: 10,
                    mapTypeId: Microsoft.Maps.MapTypeId.aerial
                };

                map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },
    });
})();