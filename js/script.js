enregistrer = function(){
	$('#container').html('<img src="bravo.gif"/>');
	$('#header').html('<h4><i class="icon-spin icon-spinner"></i> Sauvegarde en cours. Merci !</h4>');
	$.post('http://dailybil.herokuapp.com/news',
		$('form').serialize(),
		function(data)
		{
			window.close();
		});
	return false;
};
//Access-Control-Allow-Headers: x-requested-with 
$(document).ready(function()
{
	$('.chosen').chosen();

	// Peupler le formulaire
	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		function(tabs){
			$('#url').val(tabs[0].url);
			$('#titre').val(tabs[0].title);
		}
	);
	$("form").submit(enregistrer);	


	$.get('http://dailybil.herokuapp.com/categories',function(data)
	{
		//we could just set the data-provide="tag" of the element inside HTML, but IE8 fails!
		var tag_input = $('#categories');
		if(! ( /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase())) ) 
		{
			tag_input.tag(
			  {
				placeholder:tag_input.attr('placeholder'),
				//enable typeahead by specifying the source array
				source: jQuery.parseJSON(data.categories)
			  }
			);
		}
		else {
			//display a textarea for old IE, because it doesn't support this plugin or another one I tried!
			tag_input.after('<textarea id="'+tag_input.attr('id')+'" name="'+tag_input.attr('name')+'" rows="3">'+tag_input.val()+'</textarea>').remove();
			//$('#form-field-tags').autosize({append: "\n"});
		}
		// Ajout d'un mot
		$("form").submit(enregistrer);	
	});	
});
