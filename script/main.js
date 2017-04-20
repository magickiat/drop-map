var isAdd = false;
var divCount = 1;

$(function () {

});



$('#btnAdd').click(
    function () {
        if (!isAdd) {
            isAdd = true;
        } else {
            isAdd = false;
        }

        $('#btnAdd').prop("disabled", isAdd);

    });




$(document).click(function (event) {

    if (isAdd) {
        console.log(event.pageX + ' ' + event.pageY);

        var offset = $('#show-area').offset();
        if (event.pageX < offset.left) {
            console.log('event.pageX less than border');
            return;
        }
        if (event.pageY < offset.top) {
            console.log('event.pageY less than border');
            return;
        }

        var divId = 'tmpInput' + (divCount++);
        var div = $('<div><img src="img/search.png" onclick="view(\'' + divId + '\')"/><img src="img/close.png" onclick="deleteDiv(\'' + divId + '\')"/><div id="' + divId + '" class="draggable" >Hellooooooo</div></div>');



        $('#show-area').append(div);

        // set draggable
        $(div).draggable();

        // set event สำหรับแก้ไขค่า
        $(div).dblclick(function () {
            // alert("Handler for .dblclick() called." + (div.attr('id')));
            edit(div, divId);
        });

        div.css({
            top: event.pageY,
            left: event.pageX,
            position: 'absolute'
        });

        isAdd = false;
        $('#btnAdd').prop("disabled", isAdd);
    }

});

function edit(obj, divId) {
    var target = $('#' + divId);

    // target.removeAttr('onclick');

    var originalText = target.text();
    var id = target.attr('id');
    console.log(id + ' ' + originalText);

    target.html('<input type="text" value="' + originalText + '" onblur="setText(\'' + id + '\', this.value)" draggable="false"/>');
}

function setText(id, value) {
    console.log(id + ' ' + value);
    $('#' + id).html('');
    $('#' + id).text(value);

}

function setSelectedDiv(id) {
    console.log('selected id ' + id);
}

function view(id) {
    alert('view detail id = ' + id);
}

function deleteDiv(id){
    alert('delete id: ' + id);
}