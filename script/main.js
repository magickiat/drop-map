var isAdd = false;
var divCount = 1;

$(function () {
    $("#btnAdd").button();
});



$('#btnAdd').click(function () {
    if (!isAdd) {
        isAdd = true;
        $('#show-area').css('cursor', 'pointer');
        $('body').css('cursor', 'no-drop');
    } else {
        isAdd = false;
        $('#show-area').css('cursor', 'default');
    }
});

$('#btnClear').click(function () {
    console.log('Clear...');

    isAdd = false;

    $.each($('.containerDiv'), function (index, value) {
        $(value).remove();
    })

    //$('#show-area').html('');
});

$('#btnSave').click(function () {
    console.log('Save...');

    isAdd = false;


    //พิกัดเริ่มต้นของ show area
    var offset = $('#show-area').offset();

    $.each($('.containerDiv'), function (index, value) {
        var div = $(value);
        var x = div.offset().left - offset.left;
        var y = div.offset().top - offset.top;

        // find value in inner div (id of inner div is in id of outter div separate by dash '-')

        var innerId = div.attr('id').split('-')[1];
        var innerDiv = $('#' + innerId);

        var value = innerDiv.text();
        var width = innerDiv.width();
        var height = innerDiv.height();

        console.log(div.attr('id') + '\t' + '\t(' + x + ',' + y + ')\t(width: ' + width + ', height: ' + height + ')\t' + value);

    });
});

$('#btnLoad').click(function () {
    console.log('Load...');

    isAdd = false;

    $('#btnClear').click();

    var data = [{
            id: 1,
            x: 1,
            y: 1,
            width: 76,
            height: 50,
            text: 'Hello 1'
        },
        {
            id: 2,
            x: 200,
            y: 100,
            width: 80,
            height: 80,
            text: 'Hello 2'
        },
        {
            id: 3,
            x: 400,
            y: 200,
            width: 134,
            height: 134,
            text: 'Hello 3'
        }
    ];

    $.each(data, function (index, value) {
        newDiv(value.id, value.x, value.y, value.width, value.height, value.text);
    });
});

// create new draggable div
function newDiv(id, x, y, w, h, text) {

    // สร้าง div ใหม่
    var divId = 'containerDiv-' + id;
    var div = $('<div id="' + divId + '" class="containerDiv"><img src="img/search.png" onclick="view(\'' + id + '\')"/><img src="img/close.png" onclick="deleteDiv(\'' + divId + '\')"/><div id="' + id + '" class="draggable" >' + text + '</div></div>');
    $('body').append(div);

    // set draggable
    $(div).draggable();
    $('#' + id).resizable();

    //พิกัดเริ่มต้นของ show area
    var offset = $('#show-area').offset();

    var top = y + offset.top;
    var left = x + offset.left;

    // set position
    div.css({
        top: top,
        left: left,
        position: 'absolute'
    });

    // set size
    $('#' + id).css({
        width: w,
        height: h,
    });

    // set event สำหรับแก้ไขค่า
    $(div).dblclick(function () {
        edit(id);
    });


}



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

        var id = 'id' + new Date().getTime();
        newDiv(id, event.pageX - offset.left, event.pageY - offset.top, 100, 100, 'Default');

        isAdd = false;
        $('#show-area').css('cursor', 'default');
        $('body').css('cursor', 'default');
    }

});

function edit(divId) {
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

function deleteDiv(id) {
    alert('delete id: ' + id);
    $('#' + id).remove();
}