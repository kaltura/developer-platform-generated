window.lucybot.formatDatetime = function (date) {
  return date.getTime() / 1000;
}

$(window).on('load', function () {
  console.log('init...');
  $('input.g-search-box').on('input', function () {
    window.globalSearch($(this).val());
  });
  if (window.location.pathname.indexOf('/api-docs') === 0) {
    $('.subnav.subnav-apis').addClass('active');
  } else if (window.location.pathname.indexOf('/services') === 0) {
    $('.subnav.subnav-services').addClass('active');
  } else {
    $('.subnav.subnav-guides').addClass('active');
  }

  $('.side-menu-toggle').on('click', function () {
    window.toggleSideMenu();
  });

  $('.code-tabs>span').on('click', function (evt) {
    evt.preventDefault();
    const lang = $(this).attr('lang');
    $('div.code').hide();
    $('div.code.' + lang).show();
    // tabs
    $('div.code-container > div.code-tabs > span').addClass('inactive');
    if (!$(this).hasClass('active')) {
      $('.code-tabs>span').removeClass('active');
      $(this).addClass('active');
    }
    $(this).removeClass('inactive');
  });

  function copyText(text) {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
    }, function (err) {
      console.error('Could not copy text: ', err);
    });
  }

  $('.btn-copy').on('click', function (evt) {
    evt.preventDefault();
    var lang = $('.code-tabs').find('.active')[0].lang;
    var code = $('code.' + lang)[0].innerText;
    $('code.' + lang)[0].focus();
    copyText(code);
  });
});
