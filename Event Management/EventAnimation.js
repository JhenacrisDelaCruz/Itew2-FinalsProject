// ANIMATION FOR THE HEADER
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
  $('.seamTitle, .seamDesc, .typeOfEvent, .typeDesc, .wedTitle, .wedDesc, .debutTitle, .debutDesc, .corTitle, .corDesc, .privTitle, .privDesc, .kidTitle, .kidDesc, .why, .perfect, .safe, .safety, .serve, .service, .safeDesc, .safeTitle, .serveTitle, .serviceDesc, .Style1, .Style2, .Style3, .Style4, .Style5, .process, .easy').each(function() {
    var topDistance = $(this).offset().top;
    if ( (topDistance - scrollTop) < 600 ) {
      $(this).css('opacity', 1);
    } else {
      $(this).css('opacity', 0);
    }
  });
});



// ANIMATION FOR ADD-ONS SECTIONS
$(document).ready(function() {
  var currentIndex = 0;
  var images = $(".addOn1");
  var labels = $(".addOnsLabel");
  var circles = $(".circle");
  
  function showImage(index) {
    images.hide();
    labels.hide();
    images.eq(index).show();
    labels.eq(index).show();
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }
  
  var interval = setInterval(nextImage, 3000);
  showImage(currentIndex);
});


