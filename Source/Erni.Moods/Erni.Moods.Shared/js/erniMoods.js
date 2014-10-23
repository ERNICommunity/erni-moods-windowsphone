/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    var erniMoodsBaseUrl = "http://moodyrest.azurewebsites.net/moods";

    this.ErniMoods = this.ErniMoods || {};
    var ns = this.ErniMoods;

    ns.ErniMoodsClient = function () { }

    ns.ErniMoodsClient.prototype = {
        baseUrl: function () { return erniMoodsBaseUrl; },
        getMoodsAsync: function () {
            return this._sendHttpRequest(this.baseUrl());
        },
        _sendHttpRequest: function (url, data) {
            var uri = new Windows.Foundation.Uri(url);
            var client = new Windows.Web.Http.HttpClient();
            
            var requestPromise = null;
            if (typeof (data) != "undefined" && data != null) {
                var content = "";
                if (typeof (data) == "String") {
                    content = data;
                }
                else {
                    content = JSON.stringify(data);
                }
                requestPromise = client.postAsync(uri, new Windows.Web.Http.HttpStringContent(content));
            }
            else {
                requestPromise = client.getAsync(uri);
            }

            return requestPromise.then(function (response) {
                return response.content.readAsStringAsync()
            }).then(function (data) {
                return JSON.parse(data);
            });
        }
    }

})();