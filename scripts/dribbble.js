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
var usersToLoad = 0;
var all_shots = [];

function getShotsForID (dribbbleID, elm, limit)
{	
	/* Initialise funcation variables */
	shotLimit = (!limit)? 3 : limit;
	element = (!elm)? 'shots' : elm;

	usersToLoad = dribbbleID.length;
	
	document.addEventListener('DOMContentLoaded', function () {
		
		for(indx in dribbbleID)
		{
			var url = 'http://api.dribbble.com/players/'+dribbbleID[indx]+'/shots?callback=parseShots';  
			var shots = [];
	
			/* Insert JSONP Script tag*/
			var myscript = document.createElement('script');
			myscript.src = url;
			document.body.appendChild(myscript);
		}
	});
}


/* JSONP callback handler */
function parseShots (shots)
{	
	usersToLoad--;
	all_shots.push.apply(all_shots, shots.shots);
	
	// Our basic compare to order shots
	function compare(a,b) {
	  if (a.id > b.id)
		 return -1;
	  if (a.id < b.id)
		return 1;
	  return 0;
	}

	if(usersToLoad == 0)
	{
		all_shots.sort(compare)
		
		var htmlString = "\n<ul>\n"

		for (var i = 0; i < shotLimit; i++)
		{
			var shot = all_shots[i];
			htmlString = htmlString+"\n<li class=\"dribbble_shot\">";
			htmlString = htmlString+"<a href=\""+shot.url+"\">";
			htmlString = htmlString+"<img src=\""+shot.image_url+"\" alt=\""+shot.title+"\" />";
			htmlString = htmlString+"</a>";
			htmlString = htmlString+"</li>\n";
		}

		htmlString = htmlString + "\n</ul>\n";

		document.getElementById(element).innerHTML = htmlString;
	}
}
