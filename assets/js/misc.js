window.lucybot.formatDatetime = function (date) {
  return date.getTime() / 1000;
}

$(window).on('load', function () {
  console.log('init...');
  $('input.g-search-box').on('input', function () {
    window.globalSearch($(this).val());
  });
  

  //handle subnav
  let navDict = {
    "/api-docs": "apis",
    "/services": "services",
    "/playerhome": "playerhome",
    "/Client_Libraries": "client",
    "/workflows": "workflows",
    "/samples": "samples" 
  }

  var baseNav = true; 
  for(var key in navDict) {
    if(window.location.pathname.indexOf(key) === 0){
      $('.subnav.subnav-'+navDict[key]).addClass('active');  
      baseNav = false;
    }
  }

  if(baseNav) {
    $('.subnav.subnav-guides').addClass('active');
  }
  //END subnav

  $('.side-menu-toggle').on('click', function () {
    window.toggleSideMenu();
  });

  //make main nav buttons work on home page
  $('.nav-tabs-b>span').on('click', function (evt) {
    evt.preventDefault();
    if (!$(this).hasClass('active')) {
      $('.nav-tabs-b>span').removeClass('active');
      $(this).addClass('active');
    }
    // nav
    window.markdownNavigation($(this).attr('data-to'));
  });


  //code tabs for homepage
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
