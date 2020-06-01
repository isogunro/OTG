(function () {
    getUserProfile();
})();

function getUserProfile() {
    var endPointUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";

    axios.get(endPointUrl).then(function (response) {
        var property = response.data.UserProfileProperties;

        for (var i = 0; i < property.length; i++) {
            if (property[i].Key === "FirstName") {
                document.getElementById("FirstName").innerHTML = property[i].Value;
            }

            if (property[i].Key === "LastName") {
                document.getElementById("LastName").innerHTML = property[i].Value;
            }

            if (property[i].Key === "PreferredName") {
                document.getElementById("PreferredName").innerHTML = property[i].Value;
            }
        }
    })
}