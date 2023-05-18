//ANIMATION FOR HEADER
$(function() {
  var shrinkHeader = 100;
  $(window).scroll(function() {
    var scroll = getCurrentScroll();
    if (scroll >= shrinkHeader) {
      $('header').addClass('shrink');
    } else {
      $('header').removeClass('shrink');
    }
  });

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
});


//ANIMATION FOR FADING-IN AND FADE-OUT
$(window).scroll(function() {
  var scrollTop = $(this).scrollTop();
  $('.Events, .FirmDesc, .TestimonialTitle, .TestimonialsDesc, .StyleTitle, .StyleDesc, .Style1, .Style2, .Style3').each(function() {
    var topDistance = $(this).offset().top;
    if ( (topDistance - scrollTop) < 600 ) {
      $(this).css('opacity', 1);
    } else {
      $(this).css('opacity', 0);
    }
  });
});

