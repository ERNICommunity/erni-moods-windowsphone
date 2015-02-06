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
        _usersClient: new ErniMoodsUsers.ErniMoodsUsersClient(),
        _pinInfobox: null,

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
                            var icon;
                            var location = new Microsoft.Maps.Location(user.location[0], user.location[1]);

                            switch (user.mood) {
                                case 1:
                                    icon = "ms-appx:///images/veryHappy.png";
                                    break;
                                case 2:
                                    icon = "ms-appx:///images/good.png";
                                    break;
                                case 3:
                                    icon = "ms-appx:///images/soSoLaLa.png";
                                    break;
                                case 4:
                                    icon = "ms-appx:///images/notAmused.png";
                                    break;
                                case 5:
                                    icon = "ms-appx:///images/veryMoody.png";
                                    break;
                                case 6:
                                    icon = "ms-appx:///images/dontAsk.png";
                                    break;
                            }


                            var pushpin = new Microsoft.Maps.Pushpin(location, { icon: icon, width: 100, height: 100 });
                            pushpin.user = user;
                            Microsoft.Maps.Events.addHandler(pushpin, 'click', function (e) { t._pushpinOnClick.call(t, e); });
                            t._map.entities.push(pushpin);
                        }
                    }
                },
                function () {
                    alert("Mood posting failed.");
                });
        },
        _pushpinOnClick: function (e) {
            var t = this;
            t._hideCurrentInfobox();

            if (e.target != null) {
                var pushpin = e.target;
                var pinInfobox = new Microsoft.Maps.Infobox(pushpin.getLocation(),
                    {
                        title: pushpin.user.username,
                        description: "test"
                    });
                t._pinInfobox = pinInfobox;
                t._map.entities.push(pinInfobox);
            }
        },
        _hideCurrentInfobox: function () {
            var t = this;
            if (t._pinInfobox != null) {
                t._map.entities.pop(t._pinInfobox);
                t._pinInfobox = null;
            }
        }
    });
})();