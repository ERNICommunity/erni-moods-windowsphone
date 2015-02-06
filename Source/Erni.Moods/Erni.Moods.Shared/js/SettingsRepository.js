/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    this.ErniMoods = this.ErniMoods || {};
    var ns = this.ErniMoods;

    ns.SettingsRepository = function () { }

    ns.SettingsRepository.prototype = {
        getUserKey: function () {
            return Windows.Storage.ApplicationData.current.localSettings.values["userKey"];
        },
        setUserKey: function (value) {
            Windows.Storage.ApplicationData.current.localSettings.values["userKey"] = value;
        }
    }

})();