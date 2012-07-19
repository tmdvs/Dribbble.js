/**
* Dribbble.js
*
* @author Tim Davies
*/

/**
* Fetch and parse Dribbble JSON
*
* @param dribbbleID   int      Dribbble User ID
* @param elm          string   Dom Element ID to add the shots to (optional, defaults to 'shots')
* @param limit        int      Number of shots to draw (optional, defaults to 3)
*/

function getShotsForID (dribbbleID, elm, limit)
{	
	/* Initialise funcation variables */
	limit = (!limit)? 3 : limit;
	elm = (!elm)? 'shots' : elm;
	var apirequest = new XMLHttpRequest();  
	var url = 'http://api.dribbble.com/players/'+dribbbleID.toString()+'/shots';  
	var shots = [];
	
	/* Begin XMLHttpRequest/AJAX request */
	apirequest.open('GET', url, true);  
	apirequest.onreadystatechange = apiRequestHandler;  
	apirequest.send();  
	
	/* Remote request handler */
	function apiRequestHandler ()
	{
		/* When readyState becomes "DONE" draw shots */
		if(apirequest.readyState == 4)
		{
			shots = JSON.parse(apirequest.response);
			var htmlString = "\n<ul>\n"
			
			for (var i = 0; i < limit; i++)
			{
				var shot = shots.shots[i];
				htmlString = htmlString+"\n<li class=\"dribbble_shot\">";
				htmlString = htmlString+"<a href=\""+shot.url+"\">";
				htmlString = htmlString+"<img src=\""+shot.image_url+"\" alt=\""+shot.title+"\" />";
				htmlString = htmlString+"</a>";
				htmlString = htmlString+"</li>\n";
			}
			
			htmlString = htmlString + "\n</ul>\n";
			document.getElementById(elm).innerHTML = htmlString;
		}
	}	
}