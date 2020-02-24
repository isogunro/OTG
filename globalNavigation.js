
/*Used code from w3schools and made it dynamic https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_responsive_navbar_dropdown*/	
	
 /*Global variable to capture navigation sublist data*/
		 subList=[];

		  //will implement deferred promises as explained at this site (https://social.technet.microsoft.com/wiki/contents/articles/37723.sharepoint-online-or-sharepoint-2013-steps-to-use-deferred-promise-and-then-in-rest-api.aspx)
		  $(document).ready(function() {
			//Retrieve 'Navigation' list data
			getData("Training Navigation");
          });
          	//Retrieve 'Sub Navigation' list data
            getData("Sub Navigation");
            

          function myFunction() {
			  var x = document.getElementById("myTopnav");
			  if (x.className === "topnav") {
			    x.className += " responsive";
			  } else {
			    x.className = "topnav";
			  }
		 }


		//shortcut for document.createElement()
		function _createEl(el){
		  return document.createElement(el);
		}
				
		//Function that receives listname that will ping the right list 		
		function getData(lName){
		
			if(lName == "Training Navigation"){
				//For some reason, this doesn't work --> _spPageContextInfo.webAbsoluteUrl/_api/web/lists/getbyTitle('"+lName+"')/items"
				var endPointUrl = "http://www.ipracticeit.com/otg/_api/web/lists/getbyTitle('"+lName+"')/items";
			}else{
				var endPointUrl = "http://www.ipracticeit.com/otg/_api/web/lists/getbyTitle('"+lName+"')/items?$select=parentNav/URL, parentNav/URLNAME,subLink&$expand=parentNav";
			}

			var headers = {
				"accept":"application/json;odata=verbose"
			}
			
			$.ajax({
			  url:endPointUrl,
			  async:true,
			  type:"GET",
			  headers: headers,
			  success: function success(data) {
			  var results;
			  	if(lName == "Training Navigation"){
			  		buildNavBar(data.d.results);
			  	}else {			  
			  		subList = data.d.results;
			  	}
			  }
			});						
		}


		function buildNavBar(navData){
		  var topNav = document.getElementById("myTopnav");
		  console.log(navData);
		  //Loop through list that has menu items
		  for (var x=0; x<navData.length; x++){
		    
		    //If it should not have a drop down, link it up and append it to the top nav
		    if (navData[x].dropDown === "no"){
		       
		       var aLink = _createEl("a");
		       var aTextNode = document.createTextNode(navData[x].URLNAME);
		        aLink.href=navData[x].URL;
		        aLink.appendChild(aTextNode);
		        topNav.appendChild(aLink);
		    }else{
		    //If it should have a drop down, retrieve the drop down values and append to the parent menu
		                var buildSubNavigation;
		          console.log(navData[x].URLNAME)
		          buildSubNavigation = buildSubNavBar(navData[x].URLNAME);
		          topNav.appendChild(buildSubNavigation)
		    }
		  }
		}	

		function buildSubNavBar(subNavID){
				  //create div and add dropdown class
				    var ddDiv = _createEl("div");
				    ddDiv.classList.add("dropdown");
				  //create button and add text
				    var btn = _createEl("button");
				  btn.classList.add("dropbtn")
				    var btnText = document.createTextNode(subNavID);
				  //append the text to the button
				    btn.appendChild(btnText);
				  //append the button to the div
				    ddDiv.appendChild(btn);
				  //create i tag and add "fa fa-caret-down" classes
				    var itag = _createEl("i");
				        itag.classList.add("fa")
				        itag.classList.add("fa-caret-down")
				   btn.appendChild(itag)
				   ddDiv.appendChild(btn)
				  
				  var ddContent = _createEl("div");
				      ddContent.classList.add("dropdown-content");
			      			      
			    for (var i=0; i<subList.length; i++){
			      if (subList[i].parentNav.URLNAME === subNavID){
			          var li = _createEl("li");
			          var a = _createEl("a");
			          var aTextNode = document.createTextNode(subList[i].subLink.Description);
			        
			          a.href = subList[i].subLink.Url;
			          a.appendChild(aTextNode);
			          ddContent.appendChild(a)
			       } 
			    }
			  
			  ddDiv.appendChild(ddContent)
			  return ddDiv;
		}		
