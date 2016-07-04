function closeNav() {
  $('.kfc__navigation-main-links').addClass('slideOutUp');
  $('.kfc__navigation-secondary-links').addClass('slideOutLeft');
  $('.kfc__navigation-footer-container').addClass('slideOutDown');
  setTimeout(function() {
    $('.kfc__navigation-wrap').removeClass('reveal');
    $('.kfc__navigation-main-links').removeClass('slideOutUp');
    $('.kfc__navigation-secondary-links').removeClass('slideOutLeft');
    $('.kfc__navigation-footer-container').removeClass('slideOutDown');
    $('body').removeClass('no-scroll');
  }, 1000);
}

function toggleStores() {
  var storeSide = $('.kfc__stores-search');
  if (!storeSide.is('.reveal')) {
    $('body, html').addClass('no-scroll');
    storeSide.addClass('reveal');
  } else {
    storeSide.addClass('fadeOut');
    storeSide.find('.kfc__stores-search-inner').addClass('slideOutLeft');
    setTimeout(function() {
      storeSide.removeClass('fadeOut').find('.kfc__stores-search-inner').removeClass('slideOutLeft');
      storeSide.removeClass('reveal');
      $('body, html').removeClass('no-scroll');
    }, 1000);
  }
}

function toggleMenus() {
  var menuList = $('.kfc__menu-list');
  if (!menuList.is('.reveal')) {
    $('body, html').addClass('no-scroll');
    menuList.addClass('reveal');
    // $.fn.fullpage.destroy();
  } else {
    // $.fn.fullpage.reBuild();
    menuList.addClass('fadeOut');
    menuList.find('.kfc__menu-list-inner').addClass('slideOutLeft');
    setTimeout(function() {
      menuList.removeClass('fadeOut').find('.kfc__menu-list-inner').removeClass('slideOutLeft');
      menuList.removeClass('reveal');
      $('body, html').removeClass('no-scroll');
    }, 1000);
  }
}

function toggleLogin() {
  var login = $('#login-screen');
  if (!login.is('.reveal')) {
    $('body, html').addClass('no-scroll');
    login.addClass('reveal');
  } else {
    login.addClass('slideOutDown');
    setTimeout(function() {
      login.removeClass('slideOutDown');
      login.removeClass('reveal');
      $('body, html').removeClass('no-scroll');
    }, 1000);
  }
}

function initFullScreen() {
  if ($('.kfc__index-banner').length) {
    $('.kfc__index-banner').fullpage({
      navigation: true,
      css3: true,
      scrollingSpeed: 700,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,
      afterLoad: function(link, index) {
        var loadedSection = $(this);
        loadedSection.find('h2')
                      .addClass('reveal')
                      .addClass('fadeInDown')
                    .end()
                    .find('a.btn.animated')
                      .addClass('reveal')
                      .addClass('fadeInUp');
      },
      onLeave: function(index, nextIndex, direction){
        var leavingSection = $(this);
        if ($('.kfc__menu-list').is('.reveal') ||
            $('.kfc__stores-search').is('.reveal') ||
            $('.kfc__navigation-wrap').is('.reveal')) {
          return false;
        } else {
          leavingSection.find('h2.reveal')
                        .removeClass('fadeInDown, reveal')
                      .end()
                      .find('a.btn.reveal')
                        .removeClass('fadeInUp, reveal');
        }
      }
    });
  }
}

$(document).ready(function() {
  $('#loading').hide();

  $('.kfc__featured-slider').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  });

  initFullScreen();

  $('.kfc__stores-link, .kfc__stores-search .close').on('click', function(e) {
    e.preventDefault();
    toggleStores();
  });

  $('.kfc__stores-search').on('click', function(e) {
    e.preventDefault();
    toggleStores();
  }).children().click(function(e) {
    return false;
  });

  $('.kfc__menus-link, .kfc__menu-list .close, .kfc__menu-overlay').on('click', function(e) {
    e.preventDefault();
    toggleMenus();
  });

  $('.kfc__navigation .kfc__navigation-link').on('click', function(e) {
    e.preventDefault();
    var navWrap = $('.kfc__navigation-wrap');
    if (!navWrap.is('.reveal')) {
      $('body').addClass('no-scroll');
      $('.kfc__navigation-wrap').addClass('reveal');
    }
  });

  $('.kfc__navigation-wrap .close').on('click', function(e) {
    e.preventDefault();
    closeNav();
  });

  $('.login a, #login-screen .close').on('click', function(e) {
    e.preventDefault();
    toggleLogin();
  });

  $('.index-expand-button').on('click', function(e) {
    e.preventDefault();
    var href = e.target.href;
    $('.expand-effect').addClass('grow')
                      .find('.inner')
                        .addClass('inner-grow-width')
                        .delay(500)
                        .queue(function() {
                          $(this).addClass('inner-grow-height').dequeue();
                        });

    setTimeout(function() {
      location.href = href;
    }, 1000);
  });

  $('.start-order').on('click', function(e) {
    e.preventDefault();
    $('.kfc-delivery-first').toggleClass('reveal');
  });

  $('.order-button').on('click', function(e) {
    e.preventDefault();
    $('.kfc-delivery-second').toggleClass('reveal');
    setTimeout(function() {
       $('.kfc-delivery-first').removeClass('reveal');
    }, 1000);
  });

  $('.ordered-item .checkout a').on('click', function(e) {
    e.preventDefault();
    $('.kfc-delivery-third').toggleClass('reveal');
    setTimeout(function() {
       $('.kfc-delivery-second').removeClass('reveal');
    }, 1000);
  });

  $('.delivery-login-inner .login-button').on('click', function(e) {
    e.preventDefault();
    $('.kfc-delivery-third').addClass('slideOutDown');
    $('.kfc-delivery-fourth').toggleClass('reveal');
    setTimeout(function() {
       $('.kfc-delivery-third').removeClass('reveal');
    }, 1000);
  });

  $('.kfc-delivery-fourth .payment-option').on('click', function(e) {
    e.preventDefault();
    $('.kfc-delivery-fifth').toggleClass('reveal');
    setTimeout(function() {
       $('.kfc-delivery-fourth').removeClass('reveal');
    }, 1000);
  });

  $('.order-again').on('click', function(e) {
    e.preventDefault();
    $('.kfc-delivery-first').toggleClass('reveal');
    setTimeout(function() {
       $('.kfc-delivery-fifth').removeClass('reveal');
    }, 1000);
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
