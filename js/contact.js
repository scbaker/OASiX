/*
	This file contains functions which populate the header and footer of each OASiX page using the settings.xml file defined by the user.
*/

//Get admin info from XML file
	$(document).ready(function(){
	  $.ajax({
	    type: "GET",
	    url: "XML/admin/settings.xml",
	    dataType: "xml",
	    success: function(xml){	
		$(xml).find('AdminInfo').each(function(){
			var Admin = $(this).find('AdminEmail').text();
			var AdminName = $(this).find('AdminName').text();
			var AdminArea = $(this).find('AdminArea').text();
			var AdminPhone = $(this).find('AdminPhone').text();
			//add an e-mail to the admin into the span
			$("<p></p>").html(AdminName + " (" + AdminArea + ") <br />Phone: " + AdminPhone + "<br />Email: <a href=\"mailto:" + Admin + "\">" + Admin + " </a>").appendTo("#dvAdmins");
		});
	  },
	  error: function() {
	    alert("An error occurred while processing XML file.");
	  }
	  });	
	});

