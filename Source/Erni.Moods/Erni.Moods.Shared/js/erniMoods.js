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
            
            var method = Windows.Web.Http.HttpMethod.get;
            var content = null;
            if (typeof (data) != "undefined" && data != null) {
                var content = "";
                if (typeof (data) == "String") {
                    content = data;
                }
                else {
                    content = JSON.stringify(data);
                }

                method = Windows.Web.Http.HttpMethod.post;
            }

            var request = new Windows.Web.Http.HttpRequestMessage(method, uri);
            if (content != null) {
                request.content = new Windows.Web.Http.HttpStringContent(content);
                request.content.headers.contentType = new Windows.Web.Http.Headers.HttpMediaTypeHeaderValue("application/json");
            }

            return requestPromise.then(function (response) {
                return response.content.readAsStringAsync()
            }).then(function (data) {
                return JSON.parse(data);
            });
        }
    }

})();