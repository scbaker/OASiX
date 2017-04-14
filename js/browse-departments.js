/*
	This file contains functions which populate the "Browse Authors by Department" OASiX page using the creators.xml file defined by the user.
*/


//Get Departments from the admin XML and output each relevant creator's information under that department heading
	$(document).ready(function() {
		$.ajax({
			type: "GET",
			url: "XML/admin/settings.xml",
			dataType: "xml",
			success: function(xml){
				$(xml).find('Department').each(function(){
					//get the Department name
					var Department = $(this).text();
					//loop through the list of creators and output them
					$("<div class=\"dept-row-list\"></div>").html("<h3>" + Department + "</h3>").appendTo("#dvAuthors");				
					
					$.ajax({
					type: "GET",
					url: "XML/creators.xml",
					dataType: "xml",
					success: function(xml){	
						
						$(xml).find("department:contains('" + Department + "')").each(function(){
							var Creators = "<a href='author-page.html?author=" + $(this).parent().children('identifier').text() + "'>" + $(this).parent().children('display_name').text() + "</a>";							
							//loop through the list of creators and output them
							$("<p></p>").html(Creators).appendTo(".dept-row-list:contains('" + Department + "')");
						});
					},
					error: function() {
						alert("An error occurred while processing creator XML file.");
					}
				});//inner ajax ends
					
				});
			},
			error: function() {
				alert("An error occurred while processing settings XML file.");
			}
		});//outer ajax ends
	});