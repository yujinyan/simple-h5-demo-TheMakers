var bgs = [];
var images = [];
var loaded = 0;

/* remove animation on the first section, add it dynamically after preload finishes */
$('#page-1 img').removeClass('fadeInUp');

/* preload page background image */
$('.section').not('.preload').each(function() {
    var bg = $(this).css('background-image');
    var original = bg;
    $(this).css('background-image','');
    if (bg.match('"')) {
        bg = bg.replace('url("','').replace('")','');
    } else {
        bg = bg.replace('url(','').replace(')','');
    };
    var bg_image  = new Image();
    bg_image.src = bg;
    bgs.push(bg_image);
    var that = $(this);
    bg_image.addEventListener('load', function(e) {
        afterLoad(e);
        that.css('background-image', original);
    });
});

/* preload images */
$('img').not('.preload img').each(function() {
    var img = $(this).attr('src');
    var original = img;
    $(this).attr('src','');
    img = img.replace('url("','').replace('")','');
    var image  = new Image();
    image.src = img;
    images.push(image);
    var that = $(this);
    image.addEventListener('load', function(e) {
        afterLoad(e);
        that.attr('src', original);
    });
});

function afterLoad(e) {
    ++loaded;
    var loadPercent = Math.floor(loaded/(bgs.length+images.length)*100) + '%';
    $('#status').text(loadPercent);
    if(loadPercent == '100%') {
        $('.preload').fadeOut('slow');
        setTimeout(function() {
            $('#page-1 img').addClass('fadeInUp');
        }, 100);    
    }
}



