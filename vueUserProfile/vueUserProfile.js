new Vue({
    el: "#app",
    data: function () {
        return {
            prefererredName: '',
            FirstName: '',
            LastName: ''
        }
    },
    created: function () {
        this.getUserProfile()
    },
    methods: {
        getUserProfile: function () {
            var endPointUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";

            axios.get(endPointUrl).then((response) => {
                var property = response.data.UserProfileProperties;

                for (var i = 0; i < property.length; i++) {
                    if (property[i].Key === "FirstName") {
                        this.FirstName = property[i].Value;
                    }

                    if (property[i].Key === "LastName") {
                        this.LastName = property[i].Value;
                    }

                    if (property[i].Key === "PreferredName") {
                        this.prefererredName = property[i].Value;
                    }
                }
            })
        }
    }
})