(function () {

    WinJS.UI.Pages.define("/default.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            // When the page loads, check the view state and
            // use the appropriate layout.

            this.updateLayout(element, Windows.UI.ViewManagement.ApplicationView, null);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {

            // Respond to changes in viewState.

            // Get the ListView control. 
            var viewStateExampleListView =
                element.querySelector("#viewStateExampleListView").winControl;

            // Use a ListLayout if the app is in portrait mode. 
            if (viewState.getForCurrentView().orientation) {

                // If layout.orientation is horizontal, the ListView
                // is already using a ListLayout, so we don't
                // have to do anything. We only need to switch
                // layouts when layout.orientation is horizontal. 
                if (viewStateExampleListView.layout.orientation == "horizontal") {
                    viewStateExampleListView.layout = new WinJS.UI.ListLayout();
                }
            }

                // Use a GridLayout if the app isn't in portrait mode. 
            else {
                // Only switch layouts if layout.orientation is vertical. 
                if (viewStateExampleListView.layout.orientation == "vertical") {
                    viewStateExampleListView.layout = new WinJS.UI.GridLayout();
                }
            }

        }
    });

    "use strict";
    var dataArray = [
        { title: "very happy", text: "VERY HAPPY", picture: "images/face_angel.png" },
        { title: "good", text: "GOOD", picture: "images/face_angel.png" },
        { title: "so so lala", text: "SO SO LALA", picture: "images/face_angel.png" },
        { title: "not amuzed", text: "NOT AMUZED", picture: "images/face_angel.png" },
        { title: "very moody", text: "VERY MOODY", picture: "images/face_angel.png" },
        { title: "don't ask", text: "DON'T ASK!", picture: "images/face_angel.png" },
    ];

    var dataList = new WinJS.Binding.List(dataArray);

    // Create a namespace to make the data publicly
    // accessible. 
    var publicMembers =
        {
            itemList: dataList
        };

    WinJS.Namespace.define("moodsList", publicMembers);

})();