//Not 100% sure how this works BUT
//Calls the roster page from the URL using ajax.php
//sends the post to getStats with excess spaces removed

function ajaxCall(){
    var clickBtnValue = $('.getButton').attr('name');
	var linkValue = $('#link').val();
	var ajaxurl = 'ajax.php';
    $('#error').html("");
    data = {'action': clickBtnValue, 'urlValue': linkValue};
    $.post(ajaxurl, data, function (response){
        var spacesRemoved = $.trim(response);
        getStats(spacesRemoved);
    });
}
