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
  for (var key in navDict) {
    if (window.location.pathname.indexOf(key) === 0) {
      $('.subnav.subnav-' + navDict[key]).addClass('active');
      baseNav = false;
    }
  }

  if (baseNav) {
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
      console.log('No navigator');
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

  //subscribe to angular router to fire off events as needed.
  window.routesService.router.events.subscribe((val) => 
  { 
    //console.log(val);
    //angular routes https://angular.io/api/router/Router#setuplocationchangelistener
    if(val instanceof NavigationEnd) {
      makeDocIndex();
    }
  });
});


//creates right side navigation for documentation pages
//verify <documentation> element exists
function makeDocIndex() {
  if ($('documentation').length > 0) {
    var indices = [];
    console.log("HEADERS");
    $('.main-content').find('h1,h2,h3,h4,h5,h6').each(function (i, e) {
      var hIndex = parseInt(this.nodeName.substring(1)) - 1;
      // just found a levelUp event
      if (indices.length - 1 > hIndex) {
        indices = indices.slice(0, hIndex + 1);
      }
      // just found a levelDown event
      if (indices[hIndex] == undefined) {
        indices[hIndex] = 0;
      }
      // count + 1 at current level
      indices[hIndex]++;

      // display the full position in the hierarchy
      console.log((indices.join(".") + " " + this.innerHTML));
    });
  }
}