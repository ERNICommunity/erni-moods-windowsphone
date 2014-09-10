﻿/// <reference path="/Scripts/jquery-2.1.1.js" />
(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;
    WinJS.UI.Pages.define("/pages/default.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var moodList = element.querySelector(".main-holder").winControl;
            moodList.addEventListener("iteminvoked", this.onMoodSelect);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        onMoodSelect: function () {
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
                alert("Mood posted successfully.");
            }, onError);


            function onError(reason) {
                // Details in reason.Message and ex.HResult.
                alert("Mood posting failed.");
            }

            // Once your app is done using the HttpClient object call close to 
            // free up system resources (the underlying socket and memory used for the object)
            // httpClient.close();

            //$.ajax("http://moodyrest.azurewebsites.net/moods", {
            //    type: "POST",
            //    data: data,
            //    url: "default.html",
            //    success: function () {
            //        alert("Mood posted successfully.");
            //    }, fail: function () {
            //        alert("Mood posting failed.");
            //    }
            //});
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },
    });
})();