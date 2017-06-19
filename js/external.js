(function() {
  var COOKIE_TIMEOUT_MS = 900000;
  var STORAGE_KEY = 'LUCYBOT_RECIPE_CREDS';
  var user = window.kalturaUser = {};

  function loggedInTemplate() {
    return '<li class="navbar-link"><a onclick="setKalturaUser()">' +
        '<span class="hidden-md">' + (user.name || '') + ' - </span>' +
        '<span>' + (user.partnerId || '') + '&nbsp;</span>' +
        '<span class="text-primary">[sign out]</span></a></li>';
  }

  var LOGGED_OUT_HTML =
          '<li class="navbar-link">'
        +   '<a href="https://vpaas.kaltura.com/register.php?utm_source=developertools&utm_campaign=login&utm_medium=website">Sign Up</a>'
        + '</li>'
        + '<li class="navbar-link"><a onclick="lucybot.startLogin()">Sign In</a></li>';

  var setCookie = function(creds) {
    var val = creds ? encodeURIComponent(JSON.stringify(creds)) : '';
    var now = new Date();
    var expires = new Date(now.getTime() + COOKIE_TIMEOUT_MS);
    var cookie = STORAGE_KEY + '=' + val + '; expires=' + expires.toUTCString() + '; Path=/';
    document.cookie = cookie;
  }

  var updateViewsForLogin = function(creds) {
    window.jquery('#KalturaSignInModal .alert-danger').hide();
    if (!creds) {
      window.jquery('#KalturaAuthLinks').html(LOGGED_OUT_HTML);
      window.jquery('#KalturaSidebar .logged-in').hide();
      window.jquery('#KalturaSidebar .not-logged-in').show();
      window.jquery('input[name="KalturaEmail"]').val('');
      window.jquery('input[name="KalturaPassword"]').val('');
      window.jquery('input[name="KalturaSession"]').val('');
    } else {
      window.jquery('#KalturaAuthLinks').html(loggedInTemplate());
      window.jquery('#KalturaSidebar .not-logged-in').hide();
      window.jquery('#KalturaSidebar .logged-in').show();
      window.jquery('#KalturaSidebar .partnerId').text(creds.partnerId || '');
      window.jquery('#KalturaSidebar .userSecret').text(creds.userSecret || '');
      window.jquery('#KalturaSidebar .adminSecret').text(creds.secret || '');
      window.jquery('#KalturaPartnerIDModal .kaltura-loading').hide();
      window.jquery('#KalturaPartnerIDModal').modal('hide');
    }
  }

  window.setKalturaUser = function(creds) {
    function clearUser() {
      user = {};
      if (window.secretService) window.secretService.clearSecrets();
      setCookie();
    }
    if (!creds) {
      clearUser();
      updateViewsForLogin(null);
      return;
    }
    user = creds;
    window.setUpKalturaClient(creds, function(err, newCreds) {
      if (err) {
        clearUser();
        window.jquery('#KalturaSignInModal .alert-danger').show();
        return;
      }
      window.jquery('#KalturaSignInModal').modal('hide');

      updateViewsForLogin(creds);
      setCookie(creds);
      if (window.secretService) window.secretService.setSecrets(creds);
    })
  }

  var maybeContinueSession = function() {
    var ksMatch = window.location.href.substring(window.location.href.indexOf('?')).match(new RegExp('[?&]ks=([^&]+)'));
    if (ksMatch) ksMatch = window.decodeURIComponent(ksMatch[1]);
    var cookies = document.cookie.split(';').map(function(c) {return c.trim()});
    var credCookie = cookies.filter(function(c) {
      return c.indexOf(STORAGE_KEY) === 0;
    })[0];
    if (credCookie) {
      var stored = credCookie.substring(STORAGE_KEY.length + 1) || '{}';
      var user;
      try {
        user = JSON.parse(decodeURIComponent(stored));
      } catch(e) {}
      if (user && typeof user === 'object' && Object.keys(user).length) {
        if (ksMatch) user.ks = ksMatch;
        setKalturaUser(user);
        return;
      }
    }
    if (ksMatch) {
      setKalturaUser({ks: ksMatch});
    } else {
      setKalturaUser();
    }
  };

  window.lucybot.startLogin = function() {
    window.jquery('#KalturaSignInModal').modal('show');
  }

  window.jquery(document).ready(function() {
    maybeContinueSession();
  })

  window.startKalturaLogin = function() {
    window.jquery('#KalturaSignInModal .alert-danger').hide();
    var creds = {}
    creds.ks = window.jquery('input[name="KalturaSession"]').val();
    if (creds.ks) {
      setKalturaUser(creds);
      return;
    }

    window.jquery('#KalturaSignInModal #KalturaSignInButton').html('<i class="fa fa-spin fa-refresh"></i>').attr('disabled', 'disabled');
    creds.email = window.jquery('input[name="KalturaEmail"]').val();
    creds.password = window.jquery('input[name="KalturaPassword"]').val();
    creds.partnerId = window.jquery('input[name="KalturaPartnerId"]').val();

    window.lucybot.tracker('login_submit', {
      email: creds.email,
    });
    var url = window.lucybot.env.target_api === 'ott' ? '/auth/ottLogin' : '/auth/login';
    window.jquery.ajax({
      url: url,
      method: 'POST',
      data: JSON.stringify({email: creds.email, password: creds.password, partnerId: creds.partnerId}),
      headers: {'Content-Type': 'application/json'},
    })
    .done(function(response) {
      window.jquery('#KalturaSignInModal').modal('hide');
      if (window.lucybot.env.target_api === 'ott') {
        creds.ks = response.login_session.ks;
        creds.name = response.user.email;
        setKalturaUser(creds);
        return;
      }
      window.jquery('#KalturaPartnerIDModal .kaltura-loading').hide();
      window.jquery('#KalturaPartnerIDModal').modal('show');
      if (window.ga) {
        ga('set', 'userId', creds.email);
        ga('send', {
          hitType: 'event',
          eventCategory: 'login',
          eventAction: 'login',
          eventLabel: 'partnerId',
          eventValue: creds.partnerId,
        });
      }
      if (window.mixpanel) {
        mixpanel.identify(creds.email);
        mixpanel.people.set({
          '$email': creds.email,
        })
      }
      window.lucybot.tracker('login_success', {
        email: creds.email,
      });
      var partnerChoicesHTML = response.map(function(partner) {
        return '<li><a onclick="setKalturaPartnerID(' + partner.id + ')">' + partner.name + ' (' + partner.id + ')</a></li>'
      }).join('\n');
      window.jquery('#KalturaPartnerIDModal').find('ul.dropdown-menu').html(partnerChoicesHTML);
      user = creds;
    })
    .fail(function(xhr) {
      window.lucybot.tracker('login_error', {
        email: creds.email,
        error: xhr.responseText,
      })
      window.jquery('#KalturaSignInModal .alert-danger').show();
    })
    .always(function() {
      window.jquery('#KalturaSignInModal #KalturaSignInButton').html('Log In').removeAttr('disabled');
    })
  }

  window.setKalturaPartnerID = function(id) {
    user.partnerId = id;
    window.jquery('#KalturaPartnerIDModal .kaltura-loading').show();
    window.jquery.ajax({
      url: '/auth/selectPartner',
      method: 'POST',
      data: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'},
    })
    .done(function(data) {
      var creds = {
        secret: data.adminSecret,
        userSecret: data.secret,
        userId: user.email,
        partnerId: user.partnerId,
        name: data.name,
      }
      setKalturaUser(creds);
    })
    .fail(function(xhr) {
      window.lucybot.tracker('login_error', {
        partnerId: user.partnerId,
        email: user.email,
        error: xhr.responseText,
      })
      window.jquery('#KalturaPartnerIDModal .kaltura-loading').hide();
      window.jquery('#KalturaPartnerIDModal').modal('hide');
      window.jquery('#KalturaSignInModal').modal('show');
      window.jquery('#KalturaSignInModal .alert-danger').show();
    });
  }
})();

;
window.checkResponse = function(data, status) {
  if (!status) return {type: 'danger', message: "Unknown Error"};
  var msg = {type: 'success', message: "Success"};
  if (data === null) return msg;
  if (data instanceof Document) {
    var $data = window.jquery(data);
    if ($data.find('error').length) {
      var code = $data.find('code').text();
      var message = $data.find('error message').text();
      msg = {type: 'danger', message: code + ': ' + message};
    }
  } else if (typeof data === 'object') {
    if (data.result && data.result.error) {
      msg = {type: 'danger', message: data.result.error.code + ': ' + data.result.error.message};
    } else {
      var err = data.code && data.message;
      if (err) msg = {type: 'danger', message: data.code + ': ' + data.message};
      if (window.RECIPE && data.objectType === 'KalturaUiConfListResponse') {
        data.objects = data.objects.filter(function(uiConf) {
          return (uiConf.html5Url || '').indexOf('/v2') !== -1 || uiConf.objType === KalturaUiConfObjType.KRECORD;
        });
        if (!data.objects.length) return {type: 'danger', message: 'No v2 uiConfs found.'}
      }
    }
  }
  if (msg.message.indexOf('SERVICE_FORBIDDEN') !== -1) {
    // FIXME: show login modal
  }
  return msg;
}


;
window.KC = null;

function setKalturaSession(creds, cb) {
  window.lucybot.tracker('kaltura_session', {
    partnerId: creds.partnerId,
  });
  KC.setKs(creds.ks);
  var filter = {
    objTypeEqual: 1, // KalturaUiConfObjType.PLAYER
  }
  KalturaUiConfService.listAction(filter).execute(KC, function(success, results) {
    var uiConfs = results.objects || [];
    if (window.RECIPE_NAME === 'captions') {
      uiConfs = uiConfs.filter(function(uiConf) {
        return uiConf.confFile.indexOf('Plugin id="closedCaptions') !== -1;
      })
    }
    uiConfs = uiConfs.filter(function(uiConf) {
      return uiConf.tags &&
             uiConf.tags.indexOf('html5studio') !== -1 &&
             (uiConf.html5Url || '').indexOf('/v2') !== -1;
    })
    if (uiConfs.length === 0 && window.RECIPE_NAME) {
      if (RECIPE_NAME === 'dynamic_thumbnails') {
        alert('This recipe requires an HTML5 enabled uiConf. Please use the KMC to create one.');
      } else if (RECIPE_NAME === 'captions') {
        alert('This recipe requires a uiConf with captions enabled. Please use the KMC to create one.');
      }
      uiConfs = results.objects || [];
    }
    if (uiConfs.length) {
      var answers = window.lucybot.openapiService.globalParameters;
      answers.uiConf = answers.uiConf || uiConfs[0].id;
    }
    cb(null, creds);
  });
}

window.setUpKalturaClient = function(creds, cb) {
  var config = new KalturaConfiguration(creds.partnerId);
  config.serviceUrl = "https://www.kaltura.com/";
  window.KC = new KalturaClient(config);
  KC.setKs(creds.ks);
  if (window.lucybot.env.target_api === 'ott') return cb(null, creds);
  function checkFailure(success, data) {
    if (!success || (data.code && data.message)) {
      var trackObj = data || {};
      console.log('Kaltura Error', success, data);
      window.lucybot.tracker('kaltura_session_error', trackObj);
      cb(data);
      return true;
    }
  }
  if (creds.ks) {
    KalturaSessionService.get(creds.ks).execute(KC, function(success, sessionDetails) {
      if (checkFailure(success, sessionDetails)) return;
      creds.partnerId = sessionDetails.partnerId;
      creds.userId = sessionDetails.userId;
      KalturaPartnerService.get(creds.partnerId).execute(KC, function(success, secrets) {
        if (checkFailure(success, secrets)) return;
        creds.secret = secrets.adminSecret;
        creds.userSecret = secrets.secret;
        creds.name = secrets.name;
        setKalturaSession(creds, cb);
      }, creds.partnerId)
    })
  } else {
    KalturaSessionService.start(
          creds.secret,
          creds.userId,
          2, /* KSessionType.ADMIN */
          creds.partnerId).execute(window.KC, function(success, ks) {
      if (checkFailure(success, ks)) return;
      creds.ks = ks;
      setKalturaSession(creds, cb);
    });
  }
}


;
window.lucybot.formatDatetime = function(date) {
  return date.getTime() / 1000;
}

;
window.showKalturaSidebar = function() {
  window.jquery('#KalturaSidebar .sidebar-content').show();
  window.jquery('#KalturaSidebar .hide-sidebar').show();
  window.jquery('#KalturaSidebar .show-sidebar').hide();
  window.jquery('#KalturaSidebar').css('width', '300px');
  window.jquery('app .container-fluid').css('margin-left', '330px')
}

window.hideKalturaSidebar = function() {
  window.jquery('#KalturaSidebar .sidebar-content').hide();
  window.jquery('#KalturaSidebar .hide-sidebar').hide();
  window.jquery('#KalturaSidebar .show-sidebar').show();
  window.jquery('#KalturaSidebar').css('width', '54px');
  window.jquery('app .container-fluid').css('margin-left', '79px')
}

var BLOG_URL = 'https://blog.kaltura.com/?json=get_category_posts&slug=technology&count=5&status=publish&page=1';

window.jquery(document).ready(function() {

  function postTemplate(post) {
    return '<p><a href="' + post.url + '" target="_blank">' + post.title + '</a></p>';
  }

  window.jquery.getJSON(BLOG_URL)
  .done(function(data) {
    window.jquery('#KalturaBlogContent').html(data.posts.map(postTemplate).join('\n'));
  })
  .fail(function(xhr) {
    console.log('blog failure', xhr);
  })
})

;
