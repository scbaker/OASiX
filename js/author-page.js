/*
	This file contains functions which populate the "Author Page" OASiX page using the relevant author's xml file defined by the user.
*/


/*Get the URL for the Parameter
code from http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
*/
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
		}
	}
}//GetURLParameter

//On pageload, use 'author' parameter from the URL to retrieve basic author information
	$(document).ready(function(){ 
	 var cID = GetURLParameter('author');
	 $.ajax({
	    type: "GET",
	    url: "XML/creators.xml",
	    dataType: "xml",
	    success: function(xml){
		//find all items that match this particular author ID
		$(xml).find("creator:contains('" + cID + "')").each(function(){
		 var cName = $(this).find('display_name').text();
		 var cProfile = $(this).find('profile').text();
		 var cEmail = "<a href='mailto:" + $(this).find('email').text() + "'>" + $(this).find('email').text() + "</a>";
		 var cURL = "<a href='" + $(this).find('url').text() + "'>" + $(this).find('url').text() + "</a>";
		 var cImage = $(this).find('image').text();
		 var cTitle = $(this).find('title').text();
		 var cDept = $(this).find('department').text();
		 
		 //place each into its relevant span
		 $("#authorname").replaceWith(cName);
		 $("<span></span>").html(cEmail).appendTo("#email");
		 $("<span></span>").html(cURL).appendTo("#url");
		 $("#profile").replaceWith("<p>" + cProfile + "</p>");
		 
		 var AuthorImg = "<img class=\"author-thumb\" src=\"images";
		 
		 //if there's an image, add one
		  if(!cImage) {
			AuthorImg += "/no-img.jpg\" alt=\"No image found\" />";
		}
		  else {
			AuthorImg += "/authors/" + cID + "/" + cImage + "\" alt=\"An image of " + cName + "\" />";
		}
				  
		  $("#image").replaceWith(AuthorImg);
		 
		});
	  },
	  error: function() {
	    alert("An error occurred while processing XML file.");
	  }
	  });
	});



//Retrieve list of Works
	$(document).ready(function(){ 
	 var cID = GetURLParameter('author');
	 $.ajax({
	    type: "GET",
	    url: "XML/works-" + cID + ".xml",
	    dataType: "xml",
	    success: function(xml){
	    $(xml).find('work').each(function(){
	      //load things into variables for ease of parsing
		  var sTitle = $(this).find('title').text();
		  
		  //build the byline by combining all creator names and truncating the last comma
		  var Creators = "by ";
		  $(this).find('creator').each(function(){
			Creators += $(this).text();
			Creators += ", ";
		  });
		  var trunc = (Creators.length - 2);
		  var Byline = Creators.substr(0,trunc);
		  var sContent = $(this).find('description').text();

		//start building a string for each work
		  var WorkInfo = "<h3>" + sTitle + "</h3>" 
		  
		  if (Byline) {
			WorkInfo += "<p>" + Byline + "</p>";
		  }
		  
		  WorkInfo += sContent;
		  
		  //loop through each source in the sources list and finish off the WorkInfo
		  $(this).find('source').each(function(){
			  var sPublisher = $(this).find('source_title').text();
			  var sURL = $(this).find('url').text();
			  var sDate = $(this).find('date').text();
			  var sPaywall = $(this).find('paywall').text();
			  
			  WorkInfo += "<p>";
			 
			  if (!sURL) {
				WorkInfo += sPublisher;
				if (sDate) 
					WorkInfo += ", " + sDate;
			   }
			  else {
				WorkInfo += "<a href=\"" + sURL + "\">" + sPublisher;
				if (sDate)
					WorkInfo += ", " + sDate;
				WorkInfo += "</a>";
			  }
			  
			  if (sPaywall == 'y')
				WorkInfo += "<img src='images/paywall.png' style='width:18px;margin-left:5px;' alt='this work requires a subscription or purchase at this location' />";
			  else
				WorkInfo += "<img src='images/open.png' style='width:15px;margin-left:5px;' alt='this work is free to access at this location' />";
			  
			  WorkInfo += "</p>";
		  });
		  		  
	      $("<div class=\"row\"></div>").html(WorkInfo).appendTo("#dvWorks");
	    });
	  },
	  error: function() {
	    alert("An error occurred while processing XML file.");
	  }
	  });
	});