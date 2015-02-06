/// <reference path="/Scripts/jquery-2.1.1.js" />
(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;
    WinJS.UI.Pages.define("/pages/login.html", {
        _usersClient: new ErniMoods.ErniMoodsUsersClient(),
        _settingRepository: new ErniMoods.SettingsRepository(),
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var t = this;
            document.getElementById("signinButton").onclick = function () { t.onSignIn.call(t); };
            document.getElementById("signupButton").onclick = function () { t.onSignUp.call(t); };
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        onSignIn: function () {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var t = this;
            this._usersClient.login(username, password).then(function (userKey) {
                t._settingRepository.setUserKey(userKey);
                window.location = "/pages/default.html";
            });
        },
        
        onSignUp: function () {
            var username = document.getElementById("signupUsername").value;
            var password = document.getElementById("signupPassword").value;
            var phone = document.getElementById("signupPhone").value;
            phone = "+" + phone;
            var t = this;
            this._usersClient.signUp(username, password, phone).then(function (userKey) {
                t._settingRepository.setUserKey(userKey);
                window.location = "/pages/default.html";
            });

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