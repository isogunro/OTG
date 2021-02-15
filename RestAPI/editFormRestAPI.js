window.addEventListener('DOMContentLoaded', function (event) {
    getListItems()
})

function getListItems() {
	//Grab value from querystring
	var id = getUrlVars()["idItem"];
	
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists/GetByTitle('Regional Data')/items?$filter=ID eq "+parseInt(id);
	console.log(fullUrl)
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

function onQueryFailed(){
	console.log("failed");
}
function onQuerySucceeded(data){
	getEl("service").value = data.d.results[0].Title
	getEl("permanent").value = data.d.results[0].Permanent
	getEl("itinerant").value = data.d.results[0].Itinerant
	getEl("region").value = data.d.results[0].Region
		
}




function updateForm(){
	var id = parseInt(getUrlVars()["idItem"]);
	
	var service = document.getElementById("service").value
	var permanent = document.getElementById("permanent").value
	var itinerant = document.getElementById("itinerant").value
	var region = document.getElementById("region").value

 	$.ajax 
        ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Regional Data')/items(" + id +")",
        type: "POST",        
        headers: 
        { 
            "Accept": "application/json;odata=verbose",   
            "content-type": "application/json;odata=verbose",         
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*"
        },
         data: JSON.stringify({
         __metadata:
            {
              type: "SP.Data.Regional_x0020_DataListItem"
            },
            'Permanent': permanent,
            'Itinerant': itinerant,
            'Title': service,
            'Region': region
        }),
        success: function(data, status, xhr) 
        { 
            alert("Item Updated!");     
        }, 
        error: function(xhr, status, error) 
        { 
            alert("Failed");
        } 
    });	

}

function getEl(el){
	return document.getElementById(el);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}