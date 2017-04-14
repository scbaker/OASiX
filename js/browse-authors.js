/*
	This file contains functions which populate the "Browse by Author" OASiX page using the creators.xml file defined by the user.
*/


//Use author ID from URL to retrieve basic author information
	
//Retrieve list of authors
	$(document).ready(function(){
	  $.ajax({
	    type: "GET",
	    url: "XML/creators.xml",
	    dataType: "xml",
	    success: function(xml){
	    $(xml).find('creator').each(function(){
	      //load things into variables for ease of parsing
		  var cName = $(this).find('display_name').text();
		  var cImage = $(this).find('image').text();
		  var cID = $(this).find('identifier').text();
		  var cTitle = $(this).find('title').text();
		  var cDept = $(this).find('department').text();
		  
		  //append each creator into a div
		  var AuthorInfo = "";
		  
		  //if there's an image, add one
		  if(!cImage) {
			AuthorInfo += "<img class=\"author-thumb\" src=\"images/no-img.jpg\" alt=\"No image found\" />";
		}
		  else {
			AuthorInfo += "<img class=\"author-thumb\" src=\"images/authors/" + cID + "/" + cImage + "\" alt=\"An image of " + cName + "\" />";
		}
		
		  AuthorInfo +="<p><a href=\"author-page.html?author=" + cID + "\">" + cName + "</a><br />" + cTitle + "<br />" + cDept + "</p>";
		  $("<div class=\"row-list\"></div>").html(AuthorInfo).appendTo("#dvAuthors");
		 
	    });
	  },
	  error: function() {
	    alert("An error occurred while processing XML file.");
	  }
	  });
	});

//Switch layout to grid if user clicks "Grid"
$("#grid").click(function() {
	$("div.row-list").addClass("row-grid");
	$("div.row-list").removeClass("row-list");
});

//Switch layout to list if user clicks "List"
$("#list").click(function() {
	$("div.row-grid").addClass("row-list");
	$("div.row-grid").removeClass("row-grid");
});