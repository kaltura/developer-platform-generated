(function() {
  var COOKIE_TIMEOUT_MS = 60 * 60 * 1000;
  var PROMPT_TIMEOUT_MS = COOKIE_TIMEOUT_MS - 2 * 60 * 1000;
  var STORAGE_KEY = 'LUCYBOT_RECIPE_CREDS';
  var user = window.kalturaUser = {};
  var promptTimeout = null;
  var logoutTimeout = null;

  function loggedInTemplate() {
    var template = '<li class="dropdown auth-link" id="KalturaPartnerIDDropdown">'
      + '<a class="dropdown-toggle" data-toggle="dropdown">'
      +   '<span class="hidden-md">' + (user.name ? user.name + ' - ' : '') + '</span>'
      +   '<span>' + (user.partnerId || '[Using Custom KS]') + '</span>'
      +   '<i class="fa fa-right fa-caret-down"></i>'
      + '</a>'
      + '<ul class="dropdown-menu">';

    if (window.lucybot.env.target_api === 'ovp') {
      template += '<li><a data-toggle="modal" data-target="#KalturaSecretsModal">View secrets</a></li>'
        +   '<li><a data-toggle="modal" data-target="#KalturaPartnerIDModal">Switch accounts</a></li>';
    }

    template += '<li><a onclick="setKalturaUser()">Sign Out</a></li>'
      + '</ul></li>';

    return template;
  }

  var LOGGED_OUT_HTML =
      '<li class="navbar-link auth-link"><a class="btn btn-success" onclick="lucybot.startLogin()">Sign In</a></li>';

  function setPartnerChoices(choices) {
    window.kalturaPartners = choices;
    var partnerChoicesHTML = partnerChoicesTemplate(choices);
    window.jquery('#KalturaPartnerIDDropdown').find('ul.dropdown-menu').html(partnerChoicesHTML);
    window.jquery('#KalturaPartnerIDModal').find('ul.dropdown-menu').html(partnerChoicesHTML);
  }

  function partnerChoicesTemplate(partners) {
    return partners.map(function(partner) {
      return '<li><a onclick="setKalturaPartnerID(' + partner.id + ')">' + partner.name + ' (' + partner.id + ')</a></li>'
    }).join('\n');
  }

  var setCookie = function(creds) {
    var val = creds ? encodeURIComponent(JSON.stringify(creds)) : '';
    var now = new Date();
    var expires = new Date(now.getTime() + COOKIE_TIMEOUT_MS);
    var cookie = STORAGE_KEY + '=' + val + '; expires=' + expires.toUTCString() + '; Path=/';
    document.cookie = cookie;
    if (promptTimeout) clearTimeout(promptTimeout);
    if (logoutTimeout) clearTimeout(logoutTimeout);
    if (creds) {
      promptTimeout = setTimeout(function() {
        window.jquery('#KalturaContinueSessionModal').modal('show');
      }, PROMPT_TIMEOUT_MS);
      logoutTimeout = setTimeout(function() {
        setKalturaUser();
      }, COOKIE_TIMEOUT_MS);
    }
  }

  var updateViewsForLogin = function(creds) {
    window.jquery('#KalturaSignInModal .alert-danger').hide();
    window.jquery('#KalturaNav ul.nav li.auth-link').remove();
    if (!creds) {
      window.jquery('#KalturaNav ul.nav').append(LOGGED_OUT_HTML);
      window.jquery('#KalturaSidebar .logged-in').hide();
      window.jquery('#KalturaSidebar .not-logged-in').show();
      window.jquery('input[name="KalturaEmail"]').val('');
      window.jquery('input[name="KalturaPassword"]').val('');
      window.jquery('input[name="OTP"]').val('');
      window.jquery('input[name="KalturaSession"]').val('');
    } else {
      window.jquery('#KalturaNav ul.nav').append(loggedInTemplate());
      window.jquery('#KalturaSidebar .not-logged-in').hide();
      window.jquery('#KalturaSidebar .logged-in').show();
      window.jquery('#KalturaSidebar .partnerId').text(creds.partnerId || '');
      window.jquery('.kalturaUserSecret').text(creds.userSecret || '');
      window.jquery('.kalturaAdminSecret').text(creds.secret || '');
      window.jquery('#KalturaPartnerIDModal .kaltura-loading').hide();
      window.jquery('#KalturaPartnerIDModal').modal('hide');
    }
  }

  window.setKalturaUser = function(creds) {
    function clearUser() {
      window.kalturaUser = user = {};
      if (window.secretService) window.secretService.clearSecrets();
      setCookie();
    }
    if (!creds) {
      clearUser();
      updateViewsForLogin(null);
      return;
    }
    window.kalturaUser = user = creds;

    let fn = creds.partnerId ? window.setUpKalturaClient : window.setKalturaSession;
    fn(creds, function(err, newCreds) {
      if (err) {
        clearUser();
        window.jquery('#KalturaSignInModal .alert-danger').show();
        return
      }
      window.jquery('#KalturaSignInModal').modal('hide');
      updateViewsForLogin(creds);
      setCookie(creds);
      window.secretService.setSecrets(creds);
    })
  }

  window.maybeContinueSession = function() {
    if (window.lucybot.env.target_api === 'ott') {
      var cookies = document.cookie.split(';').map(function(c) {return c.trim()});
      var credCookie = cookies.filter(function(c) {
        return c.indexOf(STORAGE_KEY) === 0;
      })[0];

      if (credCookie && credCookie.substring(STORAGE_KEY.length + 1)) {
        var creds = JSON.parse(decodeURIComponent(credCookie.substring(STORAGE_KEY.length + 1)));
        setKalturaUser(creds);
        return true;
      }
      else {
        setKalturaUser();
        return false;
      }
      
    }
    
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
        window.loginByKs(user);
        return true;
      }
    }
    if (ksMatch) {
      setKalturaUser({ks: ksMatch});
      return true;
    } else {
      setKalturaUser();
      return false;
    }
  };

  window.loginByKs = function(user) {
    
    if (window.lucybot.env.target_api === 'ott') {
      window.jquery.ajax({
        url: 'https://' + window.lucybot.openapiService.original.host + window.lucybot.openapiService.original.basePath + '/service/multirequest',
        contentType: "application/json",
        dataType: 'json',
        method: "POST",
        data: JSON.stringify(
          {  
            "0":{  
               "service":"session",
               "action":"get",
               "ks": user.ks
            },
            "1":{  
               "service":"ottUser",
               "action":"get",
               "ks":"{1:result:ks}"
            },
            "format":1
         })
      })
      .done(function(response) {
        if (!response.result[0].error && !response.result[1].error) {
          var creds = {
            email: response.result[1].email,
            user: response.result[1].username,
            name: response.result[1].username,
            partnerId: response.result[0].partnerId,
            ks: response.result[0].ks
          }
          setKalturaUser(creds);
        }
        else {
          window.jquery('#KalturaSignInModal .alert-danger').show();
          return;
        }
      })
      .fail(function(xhr) {
        window.jquery('#KalturaSignInModal .alert-danger').show();
        return;
      })
      .always(function() {
        return;
      });

      return;
    }

    if (user.partnerId) {
      window.jquery.ajax({
        url: '/auth/loginByKs',
        method: 'POST',
        data: JSON.stringify({ks: user.ks, partnerId: user.partnerId}),
        headers: {'Content-Type': 'application/json'},
      })
      .done(function(response) {
        setPartnerChoices(response);
        setKalturaUser(user);
      })
    } else {
      setPartnerChoices([]);
      setKalturaUser(user);
    }
  }

  window.lucybot.startLogin = function() {
    window.jquery('#KalturaSignInModal').modal('show');
  }

  window.startKalturaLogin = function() {
    window.jquery('#KalturaSignInModal .alert-danger').hide();
    var creds = {}
    creds.ks = window.jquery('input[name="KalturaSession"]').val();
    if (creds.ks) {
      window.loginByKs(creds);
      return;
    }

    window.jquery('#KalturaSignInModal #KalturaSignInButton').html('<i class="fa fa-spin fa-refresh"></i>').attr('disabled', 'disabled');
    creds.email = window.jquery('input[name="KalturaEmail"]').val();
    creds.password = window.jquery('input[name="KalturaPassword"]').val();
    creds.otp = window.jquery('input[name="OTP"]').val();
    creds.partnerId = window.jquery('input[name="KalturaPartnerId"]').val();

    if (window.lucybot.env.target_api === 'ott') {
      window.jquery.ajax({
        url: 'https://' + window.lucybot.openapiService.original.host + window.lucybot.openapiService.original.basePath + '/service/ottuser/action/login',
        contentType: "application/json",
        dataType: 'json',
        method: "POST",
        data: JSON.stringify({
          partnerId: creds.partnerId,
          username: creds.email,
          password: creds.password,
          otp: creds.otp
        })
      })
      .done(function(response) {
        window.jquery('#KalturaSignInModal').modal('hide');
        if (window.lucybot.env.target_api === 'ott') {
          creds.ks = response.result.loginSession.ks;
          creds.name = response.result.user.username;
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
        setPartnerChoices(response);
        window.kalturaUser = user = creds;
      })
      .fail(function(xhr) {
        window.lucybot.tracker('login_error', {
          email: creds.email,
          error: xhr.responseText,
        })
        window.jquery('#KalturaSignInModal .alert-danger').show();
      })
      .always(function() {
        return;
      });


      return;
    }

    window.lucybot.tracker('login_submit', {
      email: creds.email
    });

    window.jquery.ajax({
      url: '/auth/login',
      method: 'POST',
      data: JSON.stringify({email: creds.email, password: creds.password, partnerId: creds.partnerId, otp: creds.otp}),
      headers: {'Content-Type': 'application/json'},
    })
    .done(function(response) {
      window.jquery('#KalturaSignInModal').modal('hide');
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
      setPartnerChoices(response);
      window.kalturaUser = user = creds;
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
    window.jquery('#KalturaPartnerIDDropdown a.dropdown-toggle').html('<i class="fa fa-spin fa-refresh"></i>');
    window.jquery('#KalturaPartnerIDModal .kaltura-loading').show();
    window.jquery.ajax({
      url: '/auth/selectPartner',
      method: 'POST',
      data: JSON.stringify({
        email: user.email,
        partnerId: user.partnerId,
        password: user.password,
        otp: user.otp,
      }),
      headers: {'Content-Type': 'application/json'},
    })
    .done(function(data) {
      var creds = {
        secret: data.adminSecret,
        userSecret: data.secret,
        userId: user.email,
        partnerId: user.partnerId,
        name: data.name,
        email: user.email,
        password: user.password,
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
