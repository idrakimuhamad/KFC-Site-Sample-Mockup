function closeNav() {
  $('.kfc__navigation-main-links').addClass('slideOutUp');
  $('.kfc__navigation-secondary-links').addClass('slideOutLeft');
  $('.kfc__navigation-footer-container').addClass('slideOutDown');
  setTimeout(function() {
    $('.kfc__navigation-wrap').removeClass('reveal');
    $('.kfc__navigation-main-links').removeClass('slideOutUp');
    $('.kfc__navigation-secondary-links').removeClass('slideOutLeft');
    $('.kfc__navigation-footer-container').removeClass('slideOutDown');
    $('.menu-toggle.expand').removeClass('expand');
  }, 1000);
}

function setAnimationDelay(selector) {
  var list = $(selector);
  if (list.length) {
    // $.each(list, function(i, m) {
    //   $(m).css({ 'animation-delay': i/100 * 10 + 's'});
    // });
  }
}

$(document).ready(function() {
  $('#loading').hide();

  setAnimationDelay('.kfc__menu-categories');
  setAnimationDelay('.kfc__menu-subcategories');

  $('.kfc__featured-slider').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  });

  $('.kfc__navigation-menu').on('click', function(e) {
    e.preventDefault();
    var navWrap = $('.kfc__navigation-wrap');
    if (!navWrap.is('.reveal')) {
      $('.kfc__navigation-wrap').addClass('reveal');
      $(this).find('.menu-toggle').addClass('expand');
    } else {
      closeNav();
    }
  });

  $(document).pjax('[data-pjax] a, a[data-pjax]', '.kfc__main-content', {
    fragment: '.kfc__main-content'
  });

  $(document).on('pjax:send', function() {
    var menuToggle = $('.menu-toggle');
    $('#loading').show();
    $('.kfc__main-content').hide();
    if (menuToggle.is('.expand')) {
      closeNav();
    }
  });

  $(document).on('pjax:complete', function() {
    setAnimationDelay('.kfc__menu-categories');
    setAnimationDelay('.kfc__menu-subcategories');

    setTimeout(function() {
      $('#loading').addClass('fadeOut');
    }, 1500);
    setTimeout(function() {
      $('#loading').hide();
      $('.kfc__main-content').show();
    }, 2000);
  });
});
