/***********************************
 * REST API - READ 
 * Create table using insertRow(), insertCell()
 * 
 */
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
    var listItems = '';
    listItems = data.d.results.map(myRows)
}

function myRows(row) {
    var tbl = document.getElementById("service")
    var rows = tbl.insertRow(-1)
    var tdTitle = rows.insertCell(0)
    var tdPermanent = rows.insertCell(1)
    var tdItinerant = rows.insertCell(2)
    var tdRegion = rows.insertCell(3)

    tdTitle.innerHTML = row.Title
    tdPermanent.innerHTML = row.Permanent
    tdItinerant.innerHTML = row.Itinerant
    tdRegion.innerHTML = row.Region
}

function onQueryFailed(e) {
    console.log(e)
}