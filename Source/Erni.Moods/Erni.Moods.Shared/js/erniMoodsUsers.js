/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    var erniMoodsUsersBaseUrl = "http://moodyrest.azurewebsites.net/users";

    this.ErniMoods = this.ErniMoods || {};
    var ns = this.ErniMoods;

    ns.ErniMoodsUsersClient = function () { }

    ns.ErniMoodsUsersClient.prototype = {
        userKey: null,
        baseUrl: function () { return erniMoodsUsersBaseUrl; },
        login: function (username, password) {
            var url = this.baseUrl() + "/" + encodeURIComponent(username) + "/" + encodeURIComponent(password);
            var response = this._sendHttpRequest(url);
            return response.then(function (user) {
                return user.id;
            }, function () {
                return null;
            });
        },
        signUp: function (username, password, phone) {
            var data = {
                username: username,
                password: password,
                phone: phone
            };

            var uri = new Windows.Foundation.Uri(this.baseUrl());
            var client = new Windows.Web.Http.HttpClient();

            var content = JSON.stringify(data);
            var request = new Windows.Web.Http.HttpRequestMessage(Windows.Web.Http.HttpMethod.post, uri);
            request.content = new Windows.Web.Http.HttpStringContent(content);
            request.content.headers.contentType = new Windows.Web.Http.Headers.HttpMediaTypeHeaderValue("application/json");
            var requestPromise = client.sendRequestAsync(request);

            return requestPromise.then(function (response) {
                var location = response.headers.lookup("Location");
                return location.replace("/users/", "");
                //return response.content.readAsStringAsync();
            });
        },
        getUser: function (username) {
            var url = this.baseUrl() + "?key=" + this.userKey + "&username=" + encodeURIComponent(username);
            return this._sendHttpRequest(url);
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

            var requestPromise = client.sendRequestAsync(request);
            return requestPromise.then(function (response) {
                return response.content.readAsStringAsync()
            }).then(function (data) {
                return JSON.parse(data);
            });
        }
    }

})();