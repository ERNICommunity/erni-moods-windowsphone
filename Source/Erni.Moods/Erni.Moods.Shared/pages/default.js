/// <reference path="/Scripts/jquery-2.1.1.js" />
(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;
    WinJS.UI.Pages.define("/pages/default.html", {
        _settingRepository: new ErniMoods.SettingsRepository(),

        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var t = this;
            var moodList = element.querySelector(".main-holder").winControl;
            moodList.addEventListener("iteminvoked", function () { t.onMoodSelect.call(t); });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        onMoodSelect: function () {
            var userKey = this._settingRepository.getUserKey();

            var data = {
                "username": "someUsername",
                "location": [
                  49.029645,     //latitude
                  21.276521      //longitude
                ],
                "comment": "some comment",
                "mood": 3         //range 1 to 5
            };


            var uri = new Windows.Foundation.Uri("http://moodyrest.azurewebsites.net/moods");
            var httpClient = new Windows.Web.Http.HttpClient();

            // Always catch network exceptions for async methods
            httpClient.postAsync(uri, new Windows.Web.Http.HttpStringContent(JSON.stringify(data))).done(function () {
                window.location = "/pages/mapWithMoods.html";
            }, onError);


            function onError(reason) {
                // Details in reason.Message and ex.HResult.
                alert("Mood posting failed.");
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },
    });
})();