/*
	This file contains functions which populate the header and footer of each OASiX page using the settings.xml file defined by the user.
*/

//Get basic showcase info from XML file
	$(document).ready(function(){
	  $.ajax({
	    type: "GET",
	    url: "XML/admin/settings.xml",
	    dataType: "xml",
	    success: function(xml){
	    $(xml).find('ShowcaseInfo').each(function(){
	      //load things into variables for ease of parsing
		  var sName = $(this).find('Name').text();
		  var sIcon = $(this).find('Icon').text();
		  //if there's an image, add one
		  if(sIcon) {
			$("<img class=\"branding-icon\" src=\"images/no-img.jpg\" alt=\"No image found\" />").appendTo("#branding");
		}
			//replace name of the showcase with title from setting
			$("h1").replaceWith("<h1>" + sName + "</h1>");
	    });
	  },
	  error: function() {
	    alert("An error occurred while processing header XML file.");
	  }
	  });
	});
	
//Add Institution info to footer
	$(document).ready(function(){
	  $.ajax({
	    type: "GET",
	    url: "XML/admin/settings.xml",
	    dataType: "xml",
	    success: function(xml){
	    $(xml).find('ShowcaseInfo').each(function(){
	      //load things into variables for ease of parsing
		  var sOwn = $(this).find('OwningGroup').text();
		  var sURL = $(this).find('OwningURL').text();
		  var FooterText = $(this).find('FooterText').text();
		  		  
		 //Add a URL to the owning institution's home page
			$("<span></span>").html(" <a href=\"" + sURL + "\">" + sOwn + "</a>").appendTo("#owning");	

		 //add extra text to footer
			$("#FooterContent").replaceWith("<span id='#FooterContent'>" + FooterText + "</span>");
	    });
	  },
	  error: function() {
	    alert("An error occurred while processing settings (footer) XML file.");
	  }
	  });	
	});
	
