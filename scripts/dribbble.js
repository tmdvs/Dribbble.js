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
var dribbble = {
	// How many shots to display
	shotLimit : 3,
	// The div ID to draw to
	element : 'shots',
	// How many users we're loading
	usersToLoad : 0,
	// All API results
	allShots : [],
	// Complete callback
	complete : function () {},
	// Shots sort function
	order : function (a,b) {
	  if (a.id > b.id)
		 return -1;
	  if (a.id < b.id)
		return 1;
	  return 0;
	}
}

function getShotsForID (users, elm, limit, callback)
{	
	/* Initialise funcation variables */
	dribbble.shotLimit = (!limit)? 3 : limit;
	dribbble.element = (!elm)? 'shots' : elm;
	dribbble.complete = callback;

	dribbble.usersToLoad = users.length;
	
	document.addEventListener('DOMContentLoaded', function () {
		
		for(var indx in users)
		{
			/* Insert JSONP Script tag*/
			var url = 'http://api.dribbble.com/players/'+users[indx]+'/shots?callback=parseShots'; 	
			var myscript = document.createElement('script');
			myscript.src = url;
			document.body.appendChild(myscript);
		}
	});
}


/* JSONP callback handler */
function parseShots (shots)
{	
	dribbble.usersToLoad--;
	dribbble.allShots.push.apply(dribbble.allShots, shots.shots);

	if(dribbble.usersToLoad === 0)
	{
		dribbble.allShots.sort(dribbble.order)
		
		var htmlString = "\n<ul>\n"

		for (var i = 0; i < dribbble.shotLimit; i++)
		{
			var shot = dribbble.allShots[i];
			htmlString = htmlString+"\n<li class=\"dribbble_shot\">";
			htmlString = htmlString+"<a href=\""+shot.url+"\">";
			htmlString = htmlString+"<img src=\""+shot.image_url+"\" alt=\""+shot.title+"\" />";
			htmlString = htmlString+"</a>";
			htmlString = htmlString+"</li>\n";
		}

		htmlString = htmlString + "\n</ul>\n";

		document.getElementById(dribbble.element).innerHTML = htmlString;
		dribbble.complete();
	}
}
