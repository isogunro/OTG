window.addEventListener('DOMContentLoaded', function (event) {
    getListItems()
})

function getListItems() {

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists/GetByTitle('Regional Data')/items";

    $.ajax({
        url: fullUrl,
        type: "GET",
        headers: {
            "accept": "applic ation/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });
}

function onQuerySucceeded(data) {

    if (data.d && data.d.results) {
        var items = data.d.results
        var listItems = '<table>'
        listItems += '<tr>'
        listItems += '<th>Update</th>'
        listItems += '<th>Service</th>'
        listItems += '<th>Permanent</th>'
        listItems += '<th>Itinerant</th>'
        listItems += '<th>Region</th>'
        listItems += '</tr>'

        for (var x = 0; x < items.length; x++) {
            listItems += '<tr>'
            listItems += '<td><a href="https://isogunro.sharepoint.com/sites/demos/mdemos/SitePages/editFormRestAPI.aspx?idItem=' + items[x].ID + '">edit</a></td>'
            listItems += '<td>' + items[x].Title + '</td>'
            listItems += '<td>' + items[x].Permanent + '</td>'
            listItems += '<td>' + items[x].Itinerant + '</td>'
            listItems += '<td>' + items[x].Region + '</td>'
            listItems += '</tr>'
        }

        listItems += '</table>'
    }



    document.getElementById("service").innerHTML = listItems
}

function myRows(row) {
    console.log(row)
}

function onQueryFailed(e) {
    console.log(e)
}