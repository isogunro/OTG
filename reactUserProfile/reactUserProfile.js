class App extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        preferredName: ''
    }

    componentDidMount() {
        var endPointUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";

        axios.get(endPointUrl).then((response) => {
            var property = response.data.UserProfileProperties;

            for (var i = 0; i < property.length; i++) {
                if (property[i].Key === "FirstName") {
                    this.setState({
                        firstName: property[i].Value
                    })
                }

                if (property[i].Key === "LastName") {
                    this.setState({
                        lastName: property[i].Value
                    })
                }

                if (property[i].Key === "PreferredName") {
                    this.setState({
                        preferredName: property[i].Value
                    })
                }
            }
        })

    }

    render() {
        return (
            <div>
                <h1>First Name: </h1>{this.state.firstName}
                <h1>Last Name: </h1>{this.state.lastName}
                <h1>Preferred Name: </h1>{this.state.preferredName}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)