// Functions
function getRandomInt(len) {
  return Math.floor(Math.random() * len);
}

const bgImages = ['imgs/1.jpg','imgs/2.jpg','imgs/3.jpg','imgs/4.jpg'];

setInterval(function(){
  $('header').css('background-image', 'url(' + bgImages[getRandomInt(bgImages.length)] + ')');
}, 2500);

//Change Nav background when scroll
$(window).scroll(function () {
  var nav = $('nav');
  var scroll = $(window).scrollTop();
  if (scroll >= 200) {
    nav.addClass('scrolled');
  } else {
    nav.removeClass('scrolled');
  }
});

// Menu icon click trigger
$('nav ul li.menu a').on('click', function(){
  $('nav ul').toggleClass('activate');
});

// Use document click to check if clicked outside nav
// $('body').on('click', function(e){
//   if($(e.target).is('nav ul li a, nav')){
//   }else{
//     console.log('Clicked outside!');
//   }
// });

// Mobile dropdown toggle
$('nav ul li a').not('nav ul li.menu a').on('click', function(){
  if($(this).parent().hasClass('expanded')){
    $(this).parent().removeClass('expanded');
  }else {
    $(this).parent().siblings().removeClass('expanded');
    $(this).parent().addClass('expanded');
  }
});

$('.logo img').on('click', function(){
  window.location.href = 'https://mcaweb.matc.edu/tuangs/webdev114/final/';
});


