function enregistrer(){
	$.post('')
	window.close();
};

$(document).ready(function()
{
	$(".chosen").chosen();
	// Ajout d'un mot
	$("form").submit(enregistrer);	
});