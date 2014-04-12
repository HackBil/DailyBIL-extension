var enregistrer = function(){
	$.post('http://dailybil.herokuapp.com/news',
		$('#veille').serialize(),
		function(data)
		{	
			window.close();
		});
	$('#container').html('<img src="bravo.gif"/>');
	$('#header').html('<h4><i class="icon-spin icon-spinner"></i> Sauvegarde en cours. Merci !</h4>');
	return false;
};

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};

//Access-Control-Allow-Headers: x-requested-with 
$(document).ready(function()
{
	// Peupler le formulaire
	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		function(tabs){
			$('#url').val(tabs[0].url);
			$('#title').val(tabs[0].title);
		}
	);

	$("form").submit(enregistrer);	

	$.get('http://dailybil.herokuapp.com/users',function(data)
	{
		users = data.split(',');
		$('#user').typeahead({
		    source : users
		});
	});	

	$.get('http://dailybil.herokuapp.com/categories',function(data)
	{
		$("#categories").attr("disabled",false);
		hashtags = data.split(',');
		//we could just set the data-provide="tag" of the element inside HTML, but IE8 fails!
		var tag_input = $('#categories');
		if(! ( /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase())) ) 
		{
			tag_input.tag(
			  {
				placeholder:tag_input.attr('placeholder'),
				//enable typeahead by specifying the source array
				source: hashtags
			  }
			);
		}
		else {
			//display a textarea for old IE, because it doesn't support this plugin or another one I tried!
			tag_input.after('<textarea id="'+tag_input.attr('id')+'" name="'+tag_input.attr('name')+'" rows="3">'+tag_input.val()+'</textarea>').remove();
			//$('#form-field-tags').autosize({append: "\n"});
		}
	});	
});
