/**
* Dribbble.js
*
* @author Tim Davies
*/

/**
* Fetch and parse Dribbble JSON
*
* @param dribbbleID   int/string  Dribbble User ID or username
* @param elm          string      Dom Element ID to add the shots to (optional, defaults to 'shots')
* @param limit        int         Number of shots to draw (optional, defaults to 3)
*/

// Define Global Vars
var userID, shotLimit, element = '';

function getShotsForID (dribbbleID, elm, limit)
{	
	/* Initialise funcation variables */
	shotLimit = (!limit)? 3 : limit;
	element = (!elm)? 'shots' : elm;
	userID = ''+dribbbleID;
	
	document.addEventListener('DOMContentLoaded', function () {
		var url = 'http://api.dribbble.com/players/'+userID+'/shots?callback=parseShots';  
		var shots = [];
		
		/* Insert JSONP Script tag*/
		var myscript = document.createElement('script');
		myscript.src = url;
		document.body.appendChild(myscript);
	});
}

/* JSONP callback handler */
function parseShots (shots)
{	
	var htmlString = "\n<ul>\n"
	
	for (var i = 0; i < shotLimit; i++)
	{
		var shot = shots.shots[i];
		htmlString = htmlString+"\n<li class=\"dribbble_shot\">";
		htmlString = htmlString+"<a href=\""+shot.url+"\">";
		htmlString = htmlString+"<img src=\""+shot.image_url+"\" alt=\""+shot.title+"\" />";
		htmlString = htmlString+"</a>";
		htmlString = htmlString+"</li>\n";
	}
	
	htmlString = htmlString + "\n</ul>\n";
				
	document.getElementById(element).innerHTML = htmlString;
}
