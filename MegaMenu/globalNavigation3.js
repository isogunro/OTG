var cacheNavData = [];
var cacheSubNavData = [];
var cacheMegaMenuData = [];
var cacheCategoryMenuData = [];

$(document).ready(function(){
    getData("Training Navigation").done(function(data1){
        cacheNavData = data1.d.results;
            console.log(cacheNavData);        
        getData("Sub Navigation").done(function(data2){
            cacheSubNavData = data2.d.results;
            console.log(cacheSubNavData);
            getData("Mega Menu Category").done(function(data3){
                cacheMegaMenuData = data3.d.results;
                getData("category menu").done(function(data4){
                    cacheCategoryMenuData = data4.d.results;
                    //alert(cacheCategoryMenuData)
                    createNavigation(cacheNavData);
                });
            });
        });
    });
})
function getData(lName){
    var endPointUrl=_spPageContextInfo.webAbsoluteUrl;
    if (lName != "Sub Navigation") {    
        endPointUrl+= "/_api/web/lists/getbyTitle('" + lName + "')/items";
    }else {
        endPointUrl+="/_api/web/lists/getbyTitle('" + lName + "')/items?$select=parentNav/URL, parentNav/URLNAME,subLink&$expand=parentNav";
    }
    
    return $.ajax({
        url: endPointUrl,
        type: "GET",
        headers: {
            "accept":"application/json;odata=verbose"
        }
    }); 
}
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function createNavigation(navData) {
    var topNav = document.getElementById("myTopnav");
    for (var x = 0; x < navData.length; x++) {
        if (navData[x].dropDown === "no") {
            var aLink = _createEl("a");
            var aTextNode = document.createTextNode(navData[x].URLNAME);
            aLink.href = navData[x].URL;
            aLink.appendChild(aTextNode);
            topNav.appendChild(aLink);
        } else if (navData[x].dropDown === "yes") {
            var buildSubNavigation;
            buildSubNavigation = buildSubNavBar(navData[x].URLNAME);
            topNav.appendChild(buildSubNavigation);
        } else {
            //build megamenu
            var buildSubNavigation;
            buildDirectorateNav = buildDirectorateMegaMenu(navData[x].URLNAME);
        }
    }
}

function buildDirectorateMegaMenu(navDataID) {
    var buildNav;
    var topNav = document.getElementById("myTopnav");
    buildNav = buildSubNavBar(navDataID, "training");  //Build mega menu and attach in buildSubNavBar()
    topNav.appendChild(buildNav);
}

function buildSubNavBar(subNavID, isDirectorate) {
    //create div and add dropdown class
    var ddDiv = _createEl("div");
    if(isDirectorate === "training"){
        ddDiv.classList.add("Mdropdown");
    }else{
        ddDiv.classList.add("dropdown");
    }
    //create button and add text
    var btn = _createEl("button");
    if(isDirectorate === "training"){
        btn.classList.add("Mdropbtn");
    }else{
        btn.classList.add("dropbtn");
    }
    var btnText = document.createTextNode(subNavID);
    //append the text to the button
    btn.appendChild(btnText);

    //create i tag and add "fa fa-caret-down" classes
    var itag = _createEl("i");
    itag.classList.add("fa");
    itag.classList.add("fa-caret-down");
    btn.appendChild(itag);
    ddDiv.appendChild(btn);

    var ddContent = _createEl("div");
    ddContent.classList.add("dropdown-content");
    for (var i = 0; i < cacheSubNavData.length; i++) {
        if (cacheSubNavData[i].parentNav.URLNAME=== subNavID  && cacheSubNavData[i].parentNav.URLNAME !== "Training") {
            var li = _createEl("li");
            var a = _createEl("a");
            var aTextNode = document.createTextNode(cacheSubNavData[i].subLink.Description);

            a.href = cacheSubNavData[i].subLink.Url;
            a.appendChild(aTextNode);
            ddContent.appendChild(a);  
        }
    }

    if(isDirectorate === "training"){
        //alert("I ");
        //create div and add dropdown class
        var megaDivDropDown = _createEl("div");
        megaDivDropDown.classList.add("dropdown");

        var megaBtn = _createEl("button");
        megaBtn.classList.add("dropbtn");

        megaDivDropDown.appendChild(megaBtn);
        var megaI = _createEl("i");
        megaI.classList.add("fa");
        megaI.classList.add("fa-caret-down");

        megaBtn.appendChild(megaI);

        var megaDDivContent = _createEl("div");
        megaDDivContent.classList.add("Mdropdown-content");

        var headerDiv = _createEl("div");
        headerDiv.classList.add("Mheader");

        var megaH2 = _createEl("h2");
        var h2Text = document.createTextNode("Team Sites");

        megaH2.appendChild(h2Text);
        headerDiv.appendChild(megaH2);
        megaDDivContent.appendChild(headerDiv);

        var megaDDivRow = _createEl("div");
        megaDDivRow.classList.add("Mrow");

        //Loop through categories & sub-categories items
        for (var i = 0; i < cacheMegaMenuData.length; i++) {
            var megaDivCol = _createEl("div");
            megaDivCol.classList.add("Mcolumn");
            var colHr = _createEl("h3");
            var colHrText = document.createTextNode(cacheMegaMenuData[i].category);
            colHr.appendChild(colHrText);
            megaDivCol.appendChild(colHr);
            for (var x = 0; x < cacheCategoryMenuData.length; x++) {
                if (cacheMegaMenuData[i].category === cacheCategoryMenuData[x].category) {
                    var colAnchor = _createEl("a");
                    colAnchor.href = cacheCategoryMenuData[x].menuUrl;
                    var menuColText = document.createTextNode(cacheCategoryMenuData[x].menuItem);
                    colAnchor.appendChild(menuColText);

                    megaDivCol.appendChild(colAnchor);
                    megaDDivRow.appendChild(megaDivCol);
                    megaDDivContent.appendChild(megaDDivRow);
                    ddDiv.appendChild(megaDDivContent);
                }
            }
            //create the other stuff
            //console.log(megaDivCol)
            console.log("megaDdivRow:");
            console.log(ddDiv);
        }
    }
    ddDiv.appendChild(ddContent);
    return ddDiv;
}    
function _createEl(el) {
    return document.createElement(el);
}