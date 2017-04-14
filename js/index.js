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
		  var About = $(this).find('About').text();
		//Put about information in div
		$("#dvAbout").replaceWith("<span>" + About + "</span>");
	    });
	  },
	  error: function() {
	    alert("An error occurred while processing header XML file.");
	  }
	  });
	});
	
	
