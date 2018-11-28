var $picInput = $('#image_input');
var $div_cover = $('.right_div-cover');
var $container = $('.container');
var $l_cover_width = parseInt($('.left_div-cover').css('width'), 10);
var $r_cover_width = parseInt($div_cover.css('width'), 10);

$picInput.on('change', (e) => {
  var file = e.originalEvent.srcElement.files[0];
  var img = $('.left_div-cover img');
  var img2 = $('.right_div-left img');
  var reader = new FileReader();
  reader.onload = function() {
       img.attr('src',reader.result);
       img2.attr('src',reader.result);
       $div_cover.animate({
         left: "0%",
         marginRight: "30px"
       }, 1000);
       $container.animate({
         width: $l_cover_width + $r_cover_width + 20 + "px"
       }, 100);
  }
  reader.readAsDataURL(file);
});
