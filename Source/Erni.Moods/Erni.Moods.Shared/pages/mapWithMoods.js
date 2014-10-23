/// <reference path="/Scripts/jquery-2.1.1.js" />
/// <reference path="/Bing.Maps.JavaScript/js/veapicore.js" />

(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;
    WinJS.UI.Pages.define("/pages/mapWithMoods.html", {
        _map: null,
        _moodsClient: new ErniMoods.ErniMoodsClient(),

        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var t = this;

            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: function () { t._initMapCallback(t); }, culture: "en-us", homeRegion: "US" });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },
        _initMapCallback: function (t) {
            var mapOptions =
            {
                credentials: "AkUeZZ_8CT2Y1VawMWhAIPyfKwEtKLxtrj0TkHVMAR4J8TCCdcJ6z6-rvk14mMFP",
                center: new Microsoft.Maps.Location(49.029645, 21.276521),
                zoom: 10,
                mapTypeId: Microsoft.Maps.MapTypeId.aerial
            };

            t._map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);

            t._moodsClient.getMoodsAsync().done(
                function (data) {
                    if (data.length > 0) {
                        // focus on first user
                        var user = data[0];
                        var location = new Microsoft.Maps.Location(user.location[0], user.location[1]);
                        t._map.setView({ center: location });

                        // show pushpins
                        for (var i in data) {
                            var user = data[i];
                            var location = new Microsoft.Maps.Location(user.location[0], user.location[1]);
                            var pushpin = new Microsoft.Maps.Pushpin(location);
                            t._map.entities.push(pushpin);
                        }
                    }
                },
                function () {
                    alert("Mood posting failed.");
                });
        }
    });
})();