/***********************************
 * REST API - INSERT item into SharePoint
 * 
 * 
 */
window.addEventListener('DOMContentLoaded', function (event) {
    //Add eventlistener
    var btn = getEl("btn")
    btn.addEventListener("click", submit)
})

function submit(e) {
    //Prevent a submit
    e.preventDefault();

    //Store form values
    var service = getEl("service")
    var itinerant = getEl("itinerant")
    var permanent = getEl("permanent")
    var region = getEl("region")
    var regionOpt = region.options[region.selectedIndex];

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists/GetByTitle('Regional Data')/items";

    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Data.Regional_x0020_DataListItem' },
            'Title': service.value,
            'Permanent': permanent.value,
            'Itinerant': itinerant.value,
            'Region': regionOpt.value
        }),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });

}

function getEl(el) {
    return document.getElementById(el)
} ``

function onQuerySucceeded() {
    alert("Your item has been submited")
}

function onQueryFailed() {
    alert("Your item did not submit.  Please see the administrator")
}