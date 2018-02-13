(function() {
  var COOKIE_TIMEOUT_MS = 1800000;
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
"use strict";

jQuery(function(){
  jQuery('.the_buttons.examples .a_button').click(function(e){
        e.preventDefault();
        var parent = jQuery(this).closest('body');
        var target = jQuery(this).attr('target');

        parent.find('.example').hide();
        parent.find('.example.'+target).show();
        parent.find('.the_buttons.examples .a_button.active').removeClass('active');
        parent.find('.the_buttons.examples .a_button[target="'+target+'"]').addClass('active');
  });


  jQuery('.the_buttons.examples li:first-child .a_button').click();
});

;
// jQuery.exLink 
// Author: YupItsZac
// Github: https://github.com/YupItsZac/jQuery.exLink
// Web: http://www.yupitszac.com
// Demo: http://www.yupitszac.com/demo/jquery-exlink
// Support: @YupItsZac - Twitter, or fb.me/yupitszac
// Version 2.3.0 November 20, 2015



var exLink = (function() {
 
    var opts = {};    

    initialize = function(options) {

        var defaults = {
            parentElementPath: 'body',
            protocols: ['http', 'https'],
            filetypes: ['pdf', 'xls', 'docx', 'doc', 'ppt', 'pptx'],
            hostCompare: false,
            noFollow: false,
            fancyBoxIgnore: true,
            navigateCallback: null,
            navigateState: null,
            gaTracking: false,
            gaTrackLabel: 'External Links',
            gaTrackOld: false,
            linkWarning: true,
            linkWarningBody: 'You are about to leave this website and navigate to the link below. Would you like to continue?',
            fileWarning: true,
            fileWarningBody: 'You are about to open the file below. Do you wish to continue?',
            dialogConfirm: '#006600',
            dialogCancel: '#CC0000',
            dialogConfirmText: '#fff',
            dialogCancelText: '#fff',
            dialogCancelButton: 'Cancel',
            dialogConfirmButton: 'Continue',
            modalDisplayBG: true,
            modalWidth: "320px",
            modalHeight: "240px",
            externalColor: '',
            documentColor: '',
            clickedColor: '',
            newWindow: false,
            widthWindow: "500",
            heightWindow: "400;",
            titleWindow: 'exLink by YupItsZac.com'
        }


       opts = $.extend({}, defaults, options);

       $(opts.parentElementPath).on('click','.exLink, .docuLink',function(event){
            event.preventDefault();

            if(event.handled != true) {
                catchClick(event);
            }

            event.handled = true;
        });  

        var self = this;

        if(opts.hostCompare) {
            targetByHost();
        } else {
            targetByProtocol();
        }

        $('.exLink').css('color', opts.externalColor);
        $('.docuLink').css('color', opts.documentColor);

    };

    targetByProtocol = function() {

        var self = this;

        jQuery.each(opts.protocols, function(key, value) {
            if(opts.noFollow) {
                if(opts.fancyBoxIgnore) {
                    $('a[href^="'+value+'://"]').not('.docuLink, .iframe').addClass("exLink").attr('rel', 'nofollow');
                } else {
                    $('a[href^="'+value+'://"]').not('.docuLink').addClass("exLink").attr('rel', 'nofollow');
                }
            } else {
                if(opts.fancyBoxIgnore) {
                    $('a[href^="'+value+'://"]').not('.docuLink, .iframe').addClass("exLink");
                } else {
                    $('a[href^="'+value+'://"]').not('.docuLink').addClass("exLink");
                }
            }
        });

        identifyDocuments();
    };

    targetByHost = function() {

        identifyDocuments();


        var self = this;

        var hostname = new RegExp(location.host);

        $('a').each(function() {

	    if(hostname.test($(this).attr('href')) === false && this.className != 'a_button' && this.className != 'a_button active') {
                if(opts.noFollow) {
                    if(opts.fancyBoxignore) {
                        $(this).not('.docuLink, .iframe').addClass('exLink').attr('rel', 'nofollow');
                    } else {
                        $(this).not('.docuLink').addClass('exLink').attr('rel', 'nofollow');
                    }
                } else {
                    if(opts.fancyBoxIgnore) {
                        $(this).not('.docuLink, .iframe').addClass('exLink');
                    } else {
                        $(this).not('.docuLink').addClass('exLink');
                    }
                }
            }
        });
    };

    identifyDocuments = function() {

        jQuery.each(opts.filetypes, function(key, value) {
            $('a[href$="'+value+'"]').not('.exLink').addClass('docuLink').css('color', opts.documentColor);
        });
    };

    catchClick = function(obj) {

        if($(obj.target).is('.exLink')) {
            if(opts.linkWarning) {

                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                showLinkWarning(href);
                if ($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 1, true);
                }
            } else {
                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                window.open(href, '_blank');
                if ($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 1, false);
                }
                
            }
        } else {
            if(opts.fileWarning) {

                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                showDocWarning(href);
                
                if($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 1, true);
                }

            } else {
                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }
                window.open(href, '_blank');

                if($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 2, false);
                }
            }
        }
   
        if(opts.clickedColor) {
            $(obj.target).css('color', opts.clickedColor);
        }

        window.lastObj = obj;
     
    };

    showLinkWarning = function(href) {

        if(opts.modalDisplayBG) {
            $('body').append('<div class="modalBG"></div>');
            $('.modalBG').fadeIn("slow");
        }

        $('body').append('<div class="modal-dialog">'+opts.linkWarningBody+'<br><br><p><center><b>'+href+'</b></center></p><br><br><div class="exLinkButton exLinkCancel" onclick="exLink.closeModal();">'+opts.dialogCancelButton+'</div><div class="exLinkButton exLinkContinue" onclick="exLink.navigate(&quot;'+href+'&quot;);">'+opts.dialogConfirmButton+'</div></div>');
        $('.modal-dialog').fadeIn("slow");

        $('.exLinkCancel').css("background-color",opts.dialogCancel);
        $('.exLinkContinue').css('background-color', opts.dialogConfirm);
        $('.exLinkCancel').css('color', opts.dialogCancelText);
        $('.exLinkContinue').css('color', opts.dialogConfirmText);

        $('.modal-dialog').css('width', opts.modalWidth);
        $('.modal-dialog').css('height', opts.modalHeight);
    };

    showDocWarning = function(href) {
        if(opts.modalDisplayBG) {
            $('body').append('<div class="modalBG"></div>');
            $('.modalBG').fadeIn("slow");
        }

        $('body').append('<div class="modal-dialog">'+opts.fileWarningBody+'<br><br><p><center><b>'+href+'</b></center></p><br><br><div class="exLinkButton exLinkCancel" onclick="exLink.closeModal();">'+opts.dialogCancelButton+'</div><div class="exLinkButton exLinkContinue" onclick="exLink.navigate(&quot;'+href+'&quot;);">'+opts.dialogConfirmButton+'</div></div>');
        $('.modal-dialog').fadeIn("slow");

        $('.exLinkCancel').css("background-color",opts.dialogCancel);
        $('.exLinkContinue').css('background-color', opts.dialogConfirm);
        $('.exLinkCancel').css('color', opts.dialogCancelText);
        $('.exLinkContinue').css('color', opts.dialogConfirmText);

        $('.modal-dialog').css('width', opts.modalWidth);
        $('.modal-dialog').css('height', opts.modalHeight);
    };

    closeModal = function() {

        $('.modalBG').remove();
        $('.modal-dialog').remove();
    };

    navigateLocation = function(href) {

        if(opts.gaTracking) {

            var hname = window.location.hostname;

            if(opts.gaTrackOld) {
                var track = _gaq.push(['_trackEvent', opts.gaTrackLabel, hname, href]);
            } else {
                ga('send', 'event', opts.gaTrackLabel, hname, href);
            }
        }

        if(opts.newWindow) {
            window.open(href, opts.titleWindow, 'height='+opts.heightWindow+', width='+opts.widthWindow);
            if($.isFunction(opts.navigateState)) {
                opts.navigateState(href, 1);
            }
        } else {
            window.open(href, '_blank');
            if($.isFunction(opts.navigateState)) {
                opts.navigateState(href, 2);
            }
        }

        $('.modalBG, .modal-dialog').remove();  
    };      
 
    //Public stuffs
    //These are the functions that are public facing.
    //Anything not mapped here will not be accessible form console or the browser.
    return {
        init: initialize,
        closeModal: closeModal,
        navigate: navigateLocation
    };


})();


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
/*! Lity - v1.6.6 - 2016-04-22
* http://sorgalla.com/lity/
* Copyright (c) 2016 Jan Sorgalla; Licensed MIT */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=b(a,require("jquery")):a.lity=b(a,a.jQuery||a.Zepto)}("undefined"!=typeof window?window:this,function(a,b){"use strict";function c(){o[p>0?"addClass":"removeClass"]("lity-active")}function d(a){var c=b.Deferred();return w?(a.one(w,c.resolve),setTimeout(c.resolve,500)):c.resolve(),c.promise()}function e(a,c,d){if(1===arguments.length)return b.extend({},a);if("string"==typeof c){if("undefined"==typeof d)return"undefined"==typeof a[c]?null:a[c];a[c]=d}else b.extend(a,c);return this}function f(a){for(var b,c=decodeURI(a).split("&"),d={},e=0,f=c.length;f>e;e++)c[e]&&(b=c[e].split("="),d[b[0]]=b[1]);return d}function g(a,c){return a+(a.indexOf("?")>-1?"&":"?")+b.param(c)}function h(a){return b('<span class="lity-error"/>').append(a)}function i(a){if(!q.test(a))return!1;var c=b('<img src="'+a+'">'),d=b.Deferred(),e=function(){d.reject(h("Failed loading image"))};return c.on("load",function(){return 0===this.naturalWidth?e():void d.resolve(c)}).on("error",e),d.promise()}function j(a){var c;try{c=b(a)}catch(d){return!1}if(!c.length)return!1;var e=b('<span style="display:none !important" class="lity-inline-placeholder"/>');return c.after(e).on("lity:ready",function(a,b){b.one("lity:remove",function(){e.before(c.addClass("lity-hide")).remove()})})}function k(a){var c,d=a;return c=r.exec(a),c&&(d=g("https://www.youtube"+(c[2]||"")+".com/embed/"+c[4],b.extend({autoplay:1},f(c[5]||"")))),c=s.exec(a),c&&(d=g("https://player.vimeo.com/video/"+c[3],b.extend({autoplay:1},f(c[4]||"")))),c=t.exec(a),c&&(d=g("https://www.google."+c[3]+"/maps?"+c[6],{output:c[6].indexOf("layer=c")>0?"svembed":"embed"})),'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+d+'"></iframe></div>'}function l(a){function f(a){27===a.keyCode&&k()}function g(){var a=m.documentElement.clientHeight?m.documentElement.clientHeight:Math.round(n.height());q.css("max-height",Math.floor(a)+"px").trigger("lity:resize",[o])}function h(a,c){o&&(q=b(c),n.on("resize",g),g(),o.find(".lity-loader").each(function(){var a=b(this);d(a).always(function(){a.remove()})}),o.removeClass("lity-loading").find(".lity-content").empty().append(q),q.removeClass("lity-hide").trigger("lity:ready",[o,a]),t.resolve())}function i(a,d,e,g){t=b.Deferred(),p++,c(),o=b(e.template).addClass("lity-loading").appendTo("body"),e.esc&&n.on("keyup",f),setTimeout(function(){o.addClass("lity-opened lity-"+a).on("click","[data-lity-close]",function(a){b(a.target).is("[data-lity-close]")&&k()}).trigger("lity:open",[o,g]),b.when(d).always(b.proxy(h,null,g))},0)}function j(a,c,d){var e,f,g=b.extend({},u,s);if(c=b.extend({},v,r,c),c.handler&&g[c.handler])f=g[c.handler](a,l),e=c.handler;else{var h={};b.each(["inline","iframe"],function(a,b){g[b]&&(h[b]=g[b]),delete g[b]});var j=function(b,c){return c?(f=c(a,l),f?(e=b,!1):void 0):!0};b.each(g,j),e||b.each(h,j)}return f&&b.when(k()).done(b.proxy(i,null,e,f,c,d)),!!f}function k(){if(o){var a=b.Deferred();return t.done(function(){p--,c(),n.off("resize",g).off("keyup",f),q.trigger("lity:close",[o]),o.removeClass("lity-opened").addClass("lity-closed");var b=o,e=q;o=null,q=null,d(e.add(b)).always(function(){e.trigger("lity:remove",[b]),b.remove(),a.resolve()})}),a.promise()}}function l(a){if(!a.preventDefault)return l.open(a);var c=b(this),d=c.data("lity-target")||c.attr("href")||c.attr("src");if(d){var e=c.data("lity-options")||c.data("lity");j(d,e,c)&&(c.blur(),a.preventDefault())}}var o,q,r={},s={},t=b.Deferred().resolve();return l.handlers=b.proxy(e,l,s),l.options=b.proxy(e,l,r),l.open=function(a,b,c){return j(a,b,c),l},l.close=function(){return k(),l},l.options(a)}var m=a.document,n=b(a),o=b("html"),p=0,q=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,r=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,s=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,t=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,u={image:i,inline:j,iframe:k},v={esc:!0,handler:null,template:'<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>'},w=function(){var a=m.createElement("div"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return b[c];return!1}();return l.version="1.6.6",l.handlers=b.proxy(e,l,u),l.options=b.proxy(e,l,v),b(m).on("click","[data-lity]",l()),l});
;
window.lucybot.formatDatetime = function(date) {
  return date.getTime() / 1000;
}

;
// Generated by CoffeeScript 1.4.0
/*
#
# Opentip v2.4.6
#
# More info at [www.opentip.org](http://www.opentip.org)
# 
# Copyright (c) 2012, Matias Meno  
# Graphics by Tjandra Mayerhold
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
*/

var Opentip, firstAdapter, i, mouseMoved, mousePosition, mousePositionObservers, position, vendors, _i, _len, _ref,
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __hasProp = {}.hasOwnProperty;

Opentip = (function() {

  Opentip.prototype.STICKS_OUT_TOP = 1;

  Opentip.prototype.STICKS_OUT_BOTTOM = 2;

  Opentip.prototype.STICKS_OUT_LEFT = 1;

  Opentip.prototype.STICKS_OUT_RIGHT = 2;

  Opentip.prototype["class"] = {
    container: "opentip-container",
    opentip: "opentip",
    header: "ot-header",
    content: "ot-content",
    loadingIndicator: "ot-loading-indicator",
    close: "ot-close",
    goingToHide: "ot-going-to-hide",
    hidden: "ot-hidden",
    hiding: "ot-hiding",
    goingToShow: "ot-going-to-show",
    showing: "ot-showing",
    visible: "ot-visible",
    loading: "ot-loading",
    ajaxError: "ot-ajax-error",
    fixed: "ot-fixed",
    showEffectPrefix: "ot-show-effect-",
    hideEffectPrefix: "ot-hide-effect-",
    stylePrefix: "style-"
  };

  function Opentip(element, content, title, options) {
    var elementsOpentips, hideTrigger, methodToBind, optionSources, prop, styleName, _i, _j, _len, _len1, _ref, _ref1, _ref2, _tmpStyle,
      _this = this;
    this.id = ++Opentip.lastId;
    this.debug("Creating Opentip.");
    Opentip.tips.push(this);
    this.adapter = Opentip.adapter;
    elementsOpentips = this.adapter.data(element, "opentips") || [];
    elementsOpentips.push(this);
    this.adapter.data(element, "opentips", elementsOpentips);
    this.triggerElement = this.adapter.wrap(element);
    if (this.triggerElement.length > 1) {
      throw new Error("You can't call Opentip on multiple elements.");
    }
    if (this.triggerElement.length < 1) {
      throw new Error("Invalid element.");
    }
    this.loaded = false;
    this.loading = false;
    this.visible = false;
    this.waitingToShow = false;
    this.waitingToHide = false;
    this.currentPosition = {
      left: 0,
      top: 0
    };
    this.dimensions = {
      width: 100,
      height: 50
    };
    this.content = "";
    this.redraw = true;
    this.currentObservers = {
      showing: false,
      visible: false,
      hiding: false,
      hidden: false
    };
    options = this.adapter.clone(options);
    if (typeof content === "object") {
      options = content;
      content = title = void 0;
    } else if (typeof title === "object") {
      options = title;
      title = void 0;
    }
    if (title != null) {
      options.title = title;
    }
    if (content != null) {
      this.setContent(content);
    }
    if (options["extends"] == null) {
      if (options.style != null) {
        options["extends"] = options.style;
      } else {
        options["extends"] = Opentip.defaultStyle;
      }
    }
    optionSources = [options];
    _tmpStyle = options;
    while (_tmpStyle["extends"]) {
      styleName = _tmpStyle["extends"];
      _tmpStyle = Opentip.styles[styleName];
      if (_tmpStyle == null) {
        throw new Error("Invalid style: " + styleName);
      }
      optionSources.unshift(_tmpStyle);
      if (!((_tmpStyle["extends"] != null) || styleName === "standard")) {
        _tmpStyle["extends"] = "standard";
      }
    }
    options = (_ref = this.adapter).extend.apply(_ref, [{}].concat(__slice.call(optionSources)));
    options.hideTriggers = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = options.hideTriggers;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        hideTrigger = _ref1[_i];
        _results.push(hideTrigger);
      }
      return _results;
    })();
    if (options.hideTrigger && options.hideTriggers.length === 0) {
      options.hideTriggers.push(options.hideTrigger);
    }
    _ref1 = ["tipJoint", "targetJoint", "stem"];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      prop = _ref1[_i];
      if (options[prop] && typeof options[prop] === "string") {
        options[prop] = new Opentip.Joint(options[prop]);
      }
    }
    if (options.ajax && (options.ajax === true || !options.ajax)) {
      if (this.adapter.tagName(this.triggerElement) === "A") {
        options.ajax = this.adapter.attr(this.triggerElement, "href");
      } else {
        options.ajax = false;
      }
    }
    if (options.showOn === "click" && this.adapter.tagName(this.triggerElement) === "A") {
      this.adapter.observe(this.triggerElement, "click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        return e.stopped = true;
      });
    }
    if (options.target) {
      options.fixed = true;
    }
    if (options.stem === true) {
      options.stem = new Opentip.Joint(options.tipJoint);
    }
    if (options.target === true) {
      options.target = this.triggerElement;
    } else if (options.target) {
      options.target = this.adapter.wrap(options.target);
    }
    this.currentStem = options.stem;
    if (options.delay == null) {
      options.delay = options.showOn === "mouseover" ? 0.2 : 0;
    }
    if (options.targetJoint == null) {
      options.targetJoint = new Opentip.Joint(options.tipJoint).flip();
    }
    this.showTriggers = [];
    this.showTriggersWhenVisible = [];
    this.hideTriggers = [];
    if (options.showOn && options.showOn !== "creation") {
      this.showTriggers.push({
        element: this.triggerElement,
        event: options.showOn
      });
    }
    if (options.ajaxCache != null) {
      options.cache = options.ajaxCache;
      delete options.ajaxCache;
    }
    this.options = options;
    this.bound = {};
    _ref2 = ["prepareToShow", "prepareToHide", "show", "hide", "reposition"];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      methodToBind = _ref2[_j];
      this.bound[methodToBind] = (function(methodToBind) {
        return function() {
          return _this[methodToBind].apply(_this, arguments);
        };
      })(methodToBind);
    }
    this.adapter.domReady(function() {
      _this.activate();
      if (_this.options.showOn === "creation") {
        return _this.prepareToShow();
      }
    });
  }

  Opentip.prototype._setup = function() {
    var hideOn, hideTrigger, hideTriggerElement, i, _i, _j, _len, _len1, _ref, _ref1, _results;
    this.debug("Setting up the tooltip.");
    this._buildContainer();
    this.hideTriggers = [];
    _ref = this.options.hideTriggers;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      hideTrigger = _ref[i];
      hideTriggerElement = null;
      hideOn = this.options.hideOn instanceof Array ? this.options.hideOn[i] : this.options.hideOn;
      if (typeof hideTrigger === "string") {
        switch (hideTrigger) {
          case "trigger":
            hideOn = hideOn || "mouseout";
            hideTriggerElement = this.triggerElement;
            break;
          case "tip":
            hideOn = hideOn || "mouseover";
            hideTriggerElement = this.container;
            break;
          case "target":
            hideOn = hideOn || "mouseover";
            hideTriggerElement = this.options.target;
            break;
          case "closeButton":
            break;
          default:
            throw new Error("Unknown hide trigger: " + hideTrigger + ".");
        }
      } else {
        hideOn = hideOn || "mouseover";
        hideTriggerElement = this.adapter.wrap(hideTrigger);
      }
      if (hideTriggerElement) {
        this.hideTriggers.push({
          element: hideTriggerElement,
          event: hideOn,
          original: hideTrigger
        });
      }
    }
    _ref1 = this.hideTriggers;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      hideTrigger = _ref1[_j];
      _results.push(this.showTriggersWhenVisible.push({
        element: hideTrigger.element,
        event: "mouseover"
      }));
    }
    return _results;
  };

  Opentip.prototype._buildContainer = function() {
    this.container = this.adapter.create("<div id=\"opentip-" + this.id + "\" class=\"" + this["class"].container + " " + this["class"].hidden + " " + this["class"].stylePrefix + this.options.className + "\"></div>");
    this.adapter.css(this.container, {
      position: "absolute"
    });
    if (this.options.ajax) {
      this.adapter.addClass(this.container, this["class"].loading);
    }
    if (this.options.fixed) {
      this.adapter.addClass(this.container, this["class"].fixed);
    }
    if (this.options.showEffect) {
      this.adapter.addClass(this.container, "" + this["class"].showEffectPrefix + this.options.showEffect);
    }
    if (this.options.hideEffect) {
      return this.adapter.addClass(this.container, "" + this["class"].hideEffectPrefix + this.options.hideEffect);
    }
  };

  Opentip.prototype._buildElements = function() {
    var headerElement, titleElement;
    this.tooltipElement = this.adapter.create("<div class=\"" + this["class"].opentip + "\"><div class=\"" + this["class"].header + "\"></div><div class=\"" + this["class"].content + "\"></div></div>");
    this.backgroundCanvas = this.adapter.wrap(document.createElement("canvas"));
    this.adapter.css(this.backgroundCanvas, {
      position: "absolute"
    });
    if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
      G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas));
    }
    headerElement = this.adapter.find(this.tooltipElement, "." + this["class"].header);
    if (this.options.title) {
      titleElement = this.adapter.create("<h1></h1>");
      this.adapter.update(titleElement, this.options.title, this.options.escapeTitle);
      this.adapter.append(headerElement, titleElement);
    }
    if (this.options.ajax && !this.loaded) {
      this.adapter.append(this.tooltipElement, this.adapter.create("<div class=\"" + this["class"].loadingIndicator + "\"><span>↻</span></div>"));
    }
    if (__indexOf.call(this.options.hideTriggers, "closeButton") >= 0) {
      this.closeButtonElement = this.adapter.create("<a href=\"javascript:undefined;\" class=\"" + this["class"].close + "\"><span>Close</span></a>");
      this.adapter.append(headerElement, this.closeButtonElement);
    }
    this.adapter.append(this.container, this.backgroundCanvas);
    this.adapter.append(this.container, this.tooltipElement);
    this.adapter.append(document.body, this.container);
    this._newContent = true;
    return this.redraw = true;
  };

  Opentip.prototype.setContent = function(content) {
    this.content = content;
    this._newContent = true;
    if (typeof this.content === "function") {
      this._contentFunction = this.content;
      this.content = "";
    } else {
      this._contentFunction = null;
    }
    if (this.visible) {
      return this._updateElementContent();
    }
  };

  Opentip.prototype._updateElementContent = function() {
    var contentDiv;
    if (this._newContent || (!this.options.cache && this._contentFunction)) {
      contentDiv = this.adapter.find(this.container, "." + this["class"].content);
      if (contentDiv != null) {
        if (this._contentFunction) {
          this.debug("Executing content function.");
          this.content = this._contentFunction(this);
        }
        this.adapter.update(contentDiv, this.content, this.options.escapeContent);
      }
      this._newContent = false;
    }
    this._storeAndLockDimensions();
    return this.reposition();
  };

  Opentip.prototype._storeAndLockDimensions = function() {
    var prevDimension;
    if (!this.container) {
      return;
    }
    prevDimension = this.dimensions;
    this.adapter.css(this.container, {
      width: "auto",
      left: "0px",
      top: "0px"
    });
    this.dimensions = this.adapter.dimensions(this.container);
    this.dimensions.width += 1;
    this.adapter.css(this.container, {
      width: "" + this.dimensions.width + "px",
      top: "" + this.currentPosition.top + "px",
      left: "" + this.currentPosition.left + "px"
    });
    if (!this._dimensionsEqual(this.dimensions, prevDimension)) {
      this.redraw = true;
      return this._draw();
    }
  };

  Opentip.prototype.activate = function() {
    return this._setupObservers("hidden", "hiding");
  };

  Opentip.prototype.deactivate = function() {
    this.debug("Deactivating tooltip.");
    this.hide();
    return this._setupObservers("-showing", "-visible", "-hidden", "-hiding");
  };

  Opentip.prototype._setupObservers = function() {
    var observeOrStop, removeObserver, state, states, trigger, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2,
      _this = this;
    states = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = states.length; _i < _len; _i++) {
      state = states[_i];
      removeObserver = false;
      if (state.charAt(0) === "-") {
        removeObserver = true;
        state = state.substr(1);
      }
      if (this.currentObservers[state] === !removeObserver) {
        continue;
      }
      this.currentObservers[state] = !removeObserver;
      observeOrStop = function() {
        var args, _ref, _ref1;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (removeObserver) {
          return (_ref = _this.adapter).stopObserving.apply(_ref, args);
        } else {
          return (_ref1 = _this.adapter).observe.apply(_ref1, args);
        }
      };
      switch (state) {
        case "showing":
          _ref = this.hideTriggers;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            trigger = _ref[_j];
            observeOrStop(trigger.element, trigger.event, this.bound.prepareToHide);
          }
          observeOrStop((document.onresize != null ? document : window), "resize", this.bound.reposition);
          observeOrStop(window, "scroll", this.bound.reposition);
          break;
        case "visible":
          _ref1 = this.showTriggersWhenVisible;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            trigger = _ref1[_k];
            observeOrStop(trigger.element, trigger.event, this.bound.prepareToShow);
          }
          break;
        case "hiding":
          _ref2 = this.showTriggers;
          for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
            trigger = _ref2[_l];
            observeOrStop(trigger.element, trigger.event, this.bound.prepareToShow);
          }
          break;
        case "hidden":
          break;
        default:
          throw new Error("Unknown state: " + state);
      }
    }
    return null;
  };

  Opentip.prototype.prepareToShow = function() {
    this._abortHiding();
    this._abortShowing();
    if (this.visible) {
      return;
    }
    this.debug("Showing in " + this.options.delay + "s.");
    if (this.container == null) {
      this._setup();
    }
    if (this.options.group) {
      Opentip._abortShowingGroup(this.options.group, this);
    }
    this.preparingToShow = true;
    this._setupObservers("-hidden", "-hiding", "showing");
    this._followMousePosition();
    if (this.options.fixed && !this.options.target) {
      this.initialMousePosition = mousePosition;
    }
    this.reposition();
    return this._showTimeoutId = this.setTimeout(this.bound.show, this.options.delay || 0);
  };

  Opentip.prototype.show = function() {
    var _this = this;
    this._abortHiding();
    if (this.visible) {
      return;
    }
    this._clearTimeouts();
    if (!this._triggerElementExists()) {
      return this.deactivate();
    }
    this.debug("Showing now.");
    if (this.container == null) {
      this._setup();
    }
    if (this.options.group) {
      Opentip._hideGroup(this.options.group, this);
    }
    this.visible = true;
    this.preparingToShow = false;
    if (this.tooltipElement == null) {
      this._buildElements();
    }
    this._updateElementContent();
    if (this.options.ajax && (!this.loaded || !this.options.cache)) {
      this._loadAjax();
    }
    this._searchAndActivateCloseButtons();
    this._startEnsureTriggerElement();
    this.adapter.css(this.container, {
      zIndex: Opentip.lastZIndex++
    });
    this._setupObservers("-hidden", "-hiding", "-showing", "-visible", "showing", "visible");
    if (this.options.fixed && !this.options.target) {
      this.initialMousePosition = mousePosition;
    }
    this.reposition();
    this.adapter.removeClass(this.container, this["class"].hiding);
    this.adapter.removeClass(this.container, this["class"].hidden);
    this.adapter.addClass(this.container, this["class"].goingToShow);
    this.setCss3Style(this.container, {
      transitionDuration: "0s"
    });
    this.defer(function() {
      var delay;
      if (!_this.visible || _this.preparingToHide) {
        return;
      }
      _this.adapter.removeClass(_this.container, _this["class"].goingToShow);
      _this.adapter.addClass(_this.container, _this["class"].showing);
      delay = 0;
      if (_this.options.showEffect && _this.options.showEffectDuration) {
        delay = _this.options.showEffectDuration;
      }
      _this.setCss3Style(_this.container, {
        transitionDuration: "" + delay + "s"
      });
      _this._visibilityStateTimeoutId = _this.setTimeout(function() {
        _this.adapter.removeClass(_this.container, _this["class"].showing);
        return _this.adapter.addClass(_this.container, _this["class"].visible);
      }, delay);
      return _this._activateFirstInput();
    });
    return this._draw();
  };

  Opentip.prototype._abortShowing = function() {
    if (this.preparingToShow) {
      this.debug("Aborting showing.");
      this._clearTimeouts();
      this._stopFollowingMousePosition();
      this.preparingToShow = false;
      return this._setupObservers("-showing", "-visible", "hiding", "hidden");
    }
  };

  Opentip.prototype.prepareToHide = function() {
    this._abortShowing();
    this._abortHiding();
    if (!this.visible) {
      return;
    }
    this.debug("Hiding in " + this.options.hideDelay + "s");
    this.preparingToHide = true;
    this._setupObservers("-showing", "visible", "-hidden", "hiding");
    return this._hideTimeoutId = this.setTimeout(this.bound.hide, this.options.hideDelay);
  };

  Opentip.prototype.hide = function() {
    var _this = this;
    this._abortShowing();
    if (!this.visible) {
      return;
    }
    this._clearTimeouts();
    this.debug("Hiding!");
    this.visible = false;
    this.preparingToHide = false;
    this._stopEnsureTriggerElement();
    this._setupObservers("-showing", "-visible", "-hiding", "-hidden", "hiding", "hidden");
    if (!this.options.fixed) {
      this._stopFollowingMousePosition();
    }
    if (!this.container) {
      return;
    }
    this.adapter.removeClass(this.container, this["class"].visible);
    this.adapter.removeClass(this.container, this["class"].showing);
    this.adapter.addClass(this.container, this["class"].goingToHide);
    this.setCss3Style(this.container, {
      transitionDuration: "0s"
    });
    return this.defer(function() {
      var hideDelay;
      _this.adapter.removeClass(_this.container, _this["class"].goingToHide);
      _this.adapter.addClass(_this.container, _this["class"].hiding);
      hideDelay = 0;
      if (_this.options.hideEffect && _this.options.hideEffectDuration) {
        hideDelay = _this.options.hideEffectDuration;
      }
      _this.setCss3Style(_this.container, {
        transitionDuration: "" + hideDelay + "s"
      });
      return _this._visibilityStateTimeoutId = _this.setTimeout(function() {
        _this.adapter.removeClass(_this.container, _this["class"].hiding);
        _this.adapter.addClass(_this.container, _this["class"].hidden);
        _this.setCss3Style(_this.container, {
          transitionDuration: "0s"
        });
        if (_this.options.removeElementsOnHide) {
          _this.debug("Removing HTML elements.");
          _this.adapter.remove(_this.container);
          delete _this.container;
          return delete _this.tooltipElement;
        }
      }, hideDelay);
    });
  };

  Opentip.prototype._abortHiding = function() {
    if (this.preparingToHide) {
      this.debug("Aborting hiding.");
      this._clearTimeouts();
      this.preparingToHide = false;
      return this._setupObservers("-hiding", "showing", "visible");
    }
  };

  Opentip.prototype.reposition = function() {
    var position, stem, _ref,
      _this = this;
    position = this.getPosition();
    if (position == null) {
      return;
    }
    stem = this.options.stem;
    if (this.options.containInViewport) {
      _ref = this._ensureViewportContainment(position), position = _ref.position, stem = _ref.stem;
    }
    if (this._positionsEqual(position, this.currentPosition)) {
      return;
    }
    if (!(!this.options.stem || stem.eql(this.currentStem))) {
      this.redraw = true;
    }
    this.currentPosition = position;
    this.currentStem = stem;
    this._draw();
    this.adapter.css(this.container, {
      left: "" + position.left + "px",
      top: "" + position.top + "px"
    });
    return this.defer(function() {
      var rawContainer, redrawFix;
      rawContainer = _this.adapter.unwrap(_this.container);
      rawContainer.style.visibility = "hidden";
      redrawFix = rawContainer.offsetHeight;
      return rawContainer.style.visibility = "visible";
    });
  };

  Opentip.prototype.getPosition = function(tipJoint, targetJoint, stem) {
    var additionalHorizontal, additionalVertical, offsetDistance, position, stemLength, targetDimensions, targetPosition, unwrappedTarget, _ref;
    if (!this.container) {
      return;
    }
    if (tipJoint == null) {
      tipJoint = this.options.tipJoint;
    }
    if (targetJoint == null) {
      targetJoint = this.options.targetJoint;
    }
    position = {};
    if (this.options.target) {
      targetPosition = this.adapter.offset(this.options.target);
      targetDimensions = this.adapter.dimensions(this.options.target);
      position = targetPosition;
      if (targetJoint.right) {
        unwrappedTarget = this.adapter.unwrap(this.options.target);
        if (unwrappedTarget.getBoundingClientRect != null) {
          position.left = unwrappedTarget.getBoundingClientRect().right + ((_ref = window.pageXOffset) != null ? _ref : document.body.scrollLeft);
        } else {
          position.left += targetDimensions.width;
        }
      } else if (targetJoint.center) {
        position.left += Math.round(targetDimensions.width / 2);
      }
      if (targetJoint.bottom) {
        position.top += targetDimensions.height;
      } else if (targetJoint.middle) {
        position.top += Math.round(targetDimensions.height / 2);
      }
      if (this.options.borderWidth) {
        if (this.options.tipJoint.left) {
          position.left += this.options.borderWidth;
        }
        if (this.options.tipJoint.right) {
          position.left -= this.options.borderWidth;
        }
        if (this.options.tipJoint.top) {
          position.top += this.options.borderWidth;
        } else if (this.options.tipJoint.bottom) {
          position.top -= this.options.borderWidth;
        }
      }
    } else {
      if (this.initialMousePosition) {
        position = {
          top: this.initialMousePosition.y,
          left: this.initialMousePosition.x
        };
      } else {
        position = {
          top: mousePosition.y,
          left: mousePosition.x
        };
      }
    }
    if (this.options.autoOffset) {
      stemLength = this.options.stem ? this.options.stemLength : 0;
      offsetDistance = stemLength && this.options.fixed ? 2 : 10;
      additionalHorizontal = tipJoint.middle && !this.options.fixed ? 15 : 0;
      additionalVertical = tipJoint.center && !this.options.fixed ? 15 : 0;
      if (tipJoint.right) {
        position.left -= offsetDistance + additionalHorizontal;
      } else if (tipJoint.left) {
        position.left += offsetDistance + additionalHorizontal;
      }
      if (tipJoint.bottom) {
        position.top -= offsetDistance + additionalVertical;
      } else if (tipJoint.top) {
        position.top += offsetDistance + additionalVertical;
      }
      if (stemLength) {
        if (stem == null) {
          stem = this.options.stem;
        }
        if (stem.right) {
          position.left -= stemLength;
        } else if (stem.left) {
          position.left += stemLength;
        }
        if (stem.bottom) {
          position.top -= stemLength;
        } else if (stem.top) {
          position.top += stemLength;
        }
      }
    }
    position.left += this.options.offset[0];
    position.top += this.options.offset[1];
    if (tipJoint.right) {
      position.left -= this.dimensions.width;
    } else if (tipJoint.center) {
      position.left -= Math.round(this.dimensions.width / 2);
    }
    if (tipJoint.bottom) {
      position.top -= this.dimensions.height;
    } else if (tipJoint.middle) {
      position.top -= Math.round(this.dimensions.height / 2);
    }
    return position;
  };

  Opentip.prototype._ensureViewportContainment = function(position) {
    var needsRepositioning, newSticksOut, originals, revertedX, revertedY, scrollOffset, stem, sticksOut, targetJoint, tipJoint, viewportDimensions, viewportPosition;
    stem = this.options.stem;
    originals = {
      position: position,
      stem: stem
    };
    if (!(this.visible && position)) {
      return originals;
    }
    sticksOut = this._sticksOut(position);
    if (!(sticksOut[0] || sticksOut[1])) {
      return originals;
    }
    tipJoint = new Opentip.Joint(this.options.tipJoint);
    if (this.options.targetJoint) {
      targetJoint = new Opentip.Joint(this.options.targetJoint);
    }
    scrollOffset = this.adapter.scrollOffset();
    viewportDimensions = this.adapter.viewportDimensions();
    viewportPosition = [position.left - scrollOffset[0], position.top - scrollOffset[1]];
    needsRepositioning = false;
    if (viewportDimensions.width >= this.dimensions.width) {
      if (sticksOut[0]) {
        needsRepositioning = true;
        switch (sticksOut[0]) {
          case this.STICKS_OUT_LEFT:
            tipJoint.setHorizontal("left");
            if (this.options.targetJoint) {
              targetJoint.setHorizontal("right");
            }
            break;
          case this.STICKS_OUT_RIGHT:
            tipJoint.setHorizontal("right");
            if (this.options.targetJoint) {
              targetJoint.setHorizontal("left");
            }
        }
      }
    }
    if (viewportDimensions.height >= this.dimensions.height) {
      if (sticksOut[1]) {
        needsRepositioning = true;
        switch (sticksOut[1]) {
          case this.STICKS_OUT_TOP:
            tipJoint.setVertical("top");
            if (this.options.targetJoint) {
              targetJoint.setVertical("bottom");
            }
            break;
          case this.STICKS_OUT_BOTTOM:
            tipJoint.setVertical("bottom");
            if (this.options.targetJoint) {
              targetJoint.setVertical("top");
            }
        }
      }
    }
    if (!needsRepositioning) {
      return originals;
    }
    if (this.options.stem) {
      stem = tipJoint;
    }
    position = this.getPosition(tipJoint, targetJoint, stem);
    newSticksOut = this._sticksOut(position);
    revertedX = false;
    revertedY = false;
    if (newSticksOut[0] && (newSticksOut[0] !== sticksOut[0])) {
      revertedX = true;
      tipJoint.setHorizontal(this.options.tipJoint.horizontal);
      if (this.options.targetJoint) {
        targetJoint.setHorizontal(this.options.targetJoint.horizontal);
      }
    }
    if (newSticksOut[1] && (newSticksOut[1] !== sticksOut[1])) {
      revertedY = true;
      tipJoint.setVertical(this.options.tipJoint.vertical);
      if (this.options.targetJoint) {
        targetJoint.setVertical(this.options.targetJoint.vertical);
      }
    }
    if (revertedX && revertedY) {
      return originals;
    }
    if (revertedX || revertedY) {
      if (this.options.stem) {
        stem = tipJoint;
      }
      position = this.getPosition(tipJoint, targetJoint, stem);
    }
    return {
      position: position,
      stem: stem
    };
  };

  Opentip.prototype._sticksOut = function(position) {
    var positionOffset, scrollOffset, sticksOut, viewportDimensions;
    scrollOffset = this.adapter.scrollOffset();
    viewportDimensions = this.adapter.viewportDimensions();
    positionOffset = [position.left - scrollOffset[0], position.top - scrollOffset[1]];
    sticksOut = [false, false];
    if (positionOffset[0] < 0) {
      sticksOut[0] = this.STICKS_OUT_LEFT;
    } else if (positionOffset[0] + this.dimensions.width > viewportDimensions.width) {
      sticksOut[0] = this.STICKS_OUT_RIGHT;
    }
    if (positionOffset[1] < 0) {
      sticksOut[1] = this.STICKS_OUT_TOP;
    } else if (positionOffset[1] + this.dimensions.height > viewportDimensions.height) {
      sticksOut[1] = this.STICKS_OUT_BOTTOM;
    }
    return sticksOut;
  };

  Opentip.prototype._draw = function() {
    var backgroundCanvas, bulge, canvasDimensions, canvasPosition, closeButton, closeButtonInner, closeButtonOuter, ctx, drawCorner, drawLine, hb, position, stemBase, stemLength, _i, _len, _ref, _ref1, _ref2,
      _this = this;
    if (!(this.backgroundCanvas && this.redraw)) {
      return;
    }
    this.debug("Drawing background.");
    this.redraw = false;
    if (this.currentStem) {
      _ref = ["top", "right", "bottom", "left"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        position = _ref[_i];
        this.adapter.removeClass(this.container, "stem-" + position);
      }
      this.adapter.addClass(this.container, "stem-" + this.currentStem.horizontal);
      this.adapter.addClass(this.container, "stem-" + this.currentStem.vertical);
    }
    closeButtonInner = [0, 0];
    closeButtonOuter = [0, 0];
    if (__indexOf.call(this.options.hideTriggers, "closeButton") >= 0) {
      closeButton = new Opentip.Joint(((_ref1 = this.currentStem) != null ? _ref1.toString() : void 0) === "top right" ? "top left" : "top right");
      closeButtonInner = [this.options.closeButtonRadius + this.options.closeButtonOffset[0], this.options.closeButtonRadius + this.options.closeButtonOffset[1]];
      closeButtonOuter = [this.options.closeButtonRadius - this.options.closeButtonOffset[0], this.options.closeButtonRadius - this.options.closeButtonOffset[1]];
    }
    canvasDimensions = this.adapter.clone(this.dimensions);
    canvasPosition = [0, 0];
    if (this.options.borderWidth) {
      canvasDimensions.width += this.options.borderWidth * 2;
      canvasDimensions.height += this.options.borderWidth * 2;
      canvasPosition[0] -= this.options.borderWidth;
      canvasPosition[1] -= this.options.borderWidth;
    }
    if (this.options.shadow) {
      canvasDimensions.width += this.options.shadowBlur * 2;
      canvasDimensions.width += Math.max(0, this.options.shadowOffset[0] - this.options.shadowBlur * 2);
      canvasDimensions.height += this.options.shadowBlur * 2;
      canvasDimensions.height += Math.max(0, this.options.shadowOffset[1] - this.options.shadowBlur * 2);
      canvasPosition[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]);
      canvasPosition[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1]);
    }
    bulge = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    if (this.currentStem) {
      if (this.currentStem.left) {
        bulge.left = this.options.stemLength;
      } else if (this.currentStem.right) {
        bulge.right = this.options.stemLength;
      }
      if (this.currentStem.top) {
        bulge.top = this.options.stemLength;
      } else if (this.currentStem.bottom) {
        bulge.bottom = this.options.stemLength;
      }
    }
    if (closeButton) {
      if (closeButton.left) {
        bulge.left = Math.max(bulge.left, closeButtonOuter[0]);
      } else if (closeButton.right) {
        bulge.right = Math.max(bulge.right, closeButtonOuter[0]);
      }
      if (closeButton.top) {
        bulge.top = Math.max(bulge.top, closeButtonOuter[1]);
      } else if (closeButton.bottom) {
        bulge.bottom = Math.max(bulge.bottom, closeButtonOuter[1]);
      }
    }
    canvasDimensions.width += bulge.left + bulge.right;
    canvasDimensions.height += bulge.top + bulge.bottom;
    canvasPosition[0] -= bulge.left;
    canvasPosition[1] -= bulge.top;
    if (this.currentStem && this.options.borderWidth) {
      _ref2 = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth), stemLength = _ref2.stemLength, stemBase = _ref2.stemBase;
    }
    backgroundCanvas = this.adapter.unwrap(this.backgroundCanvas);
    backgroundCanvas.width = canvasDimensions.width;
    backgroundCanvas.height = canvasDimensions.height;
    this.adapter.css(this.backgroundCanvas, {
      width: "" + backgroundCanvas.width + "px",
      height: "" + backgroundCanvas.height + "px",
      left: "" + canvasPosition[0] + "px",
      top: "" + canvasPosition[1] + "px"
    });
    ctx = backgroundCanvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    ctx.beginPath();
    ctx.fillStyle = this._getColor(ctx, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal);
    ctx.lineJoin = "miter";
    ctx.miterLimit = 500;
    hb = this.options.borderWidth / 2;
    if (this.options.borderWidth) {
      ctx.strokeStyle = this.options.borderColor;
      ctx.lineWidth = this.options.borderWidth;
    } else {
      stemLength = this.options.stemLength;
      stemBase = this.options.stemBase;
    }
    if (stemBase == null) {
      stemBase = 0;
    }
    drawLine = function(length, stem, first) {
      if (first) {
        ctx.moveTo(Math.max(stemBase, _this.options.borderRadius, closeButtonInner[0]) + 1 - hb, -hb);
      }
      if (stem) {
        ctx.lineTo(length / 2 - stemBase / 2, -hb);
        ctx.lineTo(length / 2, -stemLength - hb);
        return ctx.lineTo(length / 2 + stemBase / 2, -hb);
      }
    };
    drawCorner = function(stem, closeButton, i) {
      var angle1, angle2, innerWidth, offset;
      if (stem) {
        ctx.lineTo(-stemBase + hb, 0 - hb);
        ctx.lineTo(stemLength + hb, -stemLength - hb);
        return ctx.lineTo(hb, stemBase - hb);
      } else if (closeButton) {
        offset = _this.options.closeButtonOffset;
        innerWidth = closeButtonInner[0];
        if (i % 2 !== 0) {
          offset = [offset[1], offset[0]];
          innerWidth = closeButtonInner[1];
        }
        angle1 = Math.acos(offset[1] / _this.options.closeButtonRadius);
        angle2 = Math.acos(offset[0] / _this.options.closeButtonRadius);
        ctx.lineTo(-innerWidth + hb, -hb);
        return ctx.arc(hb - offset[0], -hb + offset[1], _this.options.closeButtonRadius, -(Math.PI / 2 + angle1), angle2, false);
      } else {
        ctx.lineTo(-_this.options.borderRadius + hb, -hb);
        return ctx.quadraticCurveTo(hb, -hb, hb, _this.options.borderRadius - hb);
      }
    };
    ctx.translate(-canvasPosition[0], -canvasPosition[1]);
    ctx.save();
    (function() {
      var cornerStem, i, lineLength, lineStem, positionIdx, positionX, positionY, rotation, _j, _ref3, _results;
      _results = [];
      for (i = _j = 0, _ref3 = Opentip.positions.length / 2; 0 <= _ref3 ? _j < _ref3 : _j > _ref3; i = 0 <= _ref3 ? ++_j : --_j) {
        positionIdx = i * 2;
        positionX = i === 0 || i === 3 ? 0 : _this.dimensions.width;
        positionY = i < 2 ? 0 : _this.dimensions.height;
        rotation = (Math.PI / 2) * i;
        lineLength = i % 2 === 0 ? _this.dimensions.width : _this.dimensions.height;
        lineStem = new Opentip.Joint(Opentip.positions[positionIdx]);
        cornerStem = new Opentip.Joint(Opentip.positions[positionIdx + 1]);
        ctx.save();
        ctx.translate(positionX, positionY);
        ctx.rotate(rotation);
        drawLine(lineLength, lineStem.eql(_this.currentStem), i === 0);
        ctx.translate(lineLength, 0);
        drawCorner(cornerStem.eql(_this.currentStem), cornerStem.eql(closeButton), i);
        _results.push(ctx.restore());
      }
      return _results;
    })();
    ctx.closePath();
    ctx.save();
    if (this.options.shadow) {
      ctx.shadowColor = this.options.shadowColor;
      ctx.shadowBlur = this.options.shadowBlur;
      ctx.shadowOffsetX = this.options.shadowOffset[0];
      ctx.shadowOffsetY = this.options.shadowOffset[1];
    }
    ctx.fill();
    ctx.restore();
    if (this.options.borderWidth) {
      ctx.stroke();
    }
    ctx.restore();
    if (closeButton) {
      return (function() {
        var crossCenter, crossHeight, crossWidth, hcs, linkCenter;
        crossWidth = crossHeight = _this.options.closeButtonRadius * 2;
        if (closeButton.toString() === "top right") {
          linkCenter = [_this.dimensions.width - _this.options.closeButtonOffset[0], _this.options.closeButtonOffset[1]];
          crossCenter = [linkCenter[0] + hb, linkCenter[1] - hb];
        } else {
          linkCenter = [_this.options.closeButtonOffset[0], _this.options.closeButtonOffset[1]];
          crossCenter = [linkCenter[0] - hb, linkCenter[1] - hb];
        }
        ctx.translate(crossCenter[0], crossCenter[1]);
        hcs = _this.options.closeButtonCrossSize / 2;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = _this.options.closeButtonCrossColor;
        ctx.lineWidth = _this.options.closeButtonCrossLineWidth;
        ctx.lineCap = "round";
        ctx.moveTo(-hcs, -hcs);
        ctx.lineTo(hcs, hcs);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(hcs, -hcs);
        ctx.lineTo(-hcs, hcs);
        ctx.stroke();
        ctx.restore();
        return _this.adapter.css(_this.closeButtonElement, {
          left: "" + (linkCenter[0] - hcs - _this.options.closeButtonLinkOverscan) + "px",
          top: "" + (linkCenter[1] - hcs - _this.options.closeButtonLinkOverscan) + "px",
          width: "" + (_this.options.closeButtonCrossSize + _this.options.closeButtonLinkOverscan * 2) + "px",
          height: "" + (_this.options.closeButtonCrossSize + _this.options.closeButtonLinkOverscan * 2) + "px"
        });
      })();
    }
  };

  Opentip.prototype._getPathStemMeasures = function(outerStemBase, outerStemLength, borderWidth) {
    var angle, distanceBetweenTips, halfAngle, hb, rhombusSide, stemBase, stemLength;
    hb = borderWidth / 2;
    halfAngle = Math.atan((outerStemBase / 2) / outerStemLength);
    angle = halfAngle * 2;
    rhombusSide = hb / Math.sin(angle);
    distanceBetweenTips = 2 * rhombusSide * Math.cos(halfAngle);
    stemLength = hb + outerStemLength - distanceBetweenTips;
    if (stemLength < 0) {
      throw new Error("Sorry but your stemLength / stemBase ratio is strange.");
    }
    stemBase = (Math.tan(halfAngle) * stemLength) * 2;
    return {
      stemLength: stemLength,
      stemBase: stemBase
    };
  };

  Opentip.prototype._getColor = function(ctx, dimensions, color, horizontal) {
    var colorStop, gradient, i, _i, _len;
    if (horizontal == null) {
      horizontal = false;
    }
    if (typeof color === "string") {
      return color;
    }
    if (horizontal) {
      gradient = ctx.createLinearGradient(0, 0, dimensions.width, 0);
    } else {
      gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
    }
    for (i = _i = 0, _len = color.length; _i < _len; i = ++_i) {
      colorStop = color[i];
      gradient.addColorStop(colorStop[0], colorStop[1]);
    }
    return gradient;
  };

  Opentip.prototype._searchAndActivateCloseButtons = function() {
    var element, _i, _len, _ref;
    _ref = this.adapter.findAll(this.container, "." + this["class"].close);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      this.hideTriggers.push({
        element: this.adapter.wrap(element),
        event: "click"
      });
    }
    if (this.currentObservers.showing) {
      this._setupObservers("-showing", "showing");
    }
    if (this.currentObservers.visible) {
      return this._setupObservers("-visible", "visible");
    }
  };

  Opentip.prototype._activateFirstInput = function() {
    var input;
    input = this.adapter.unwrap(this.adapter.find(this.container, "input, textarea"));
    return input != null ? typeof input.focus === "function" ? input.focus() : void 0 : void 0;
  };

  Opentip.prototype._followMousePosition = function() {
    if (!this.options.fixed) {
      return Opentip._observeMousePosition(this.bound.reposition);
    }
  };

  Opentip.prototype._stopFollowingMousePosition = function() {
    if (!this.options.fixed) {
      return Opentip._stopObservingMousePosition(this.bound.reposition);
    }
  };

  Opentip.prototype._clearShowTimeout = function() {
    return clearTimeout(this._showTimeoutId);
  };

  Opentip.prototype._clearHideTimeout = function() {
    return clearTimeout(this._hideTimeoutId);
  };

  Opentip.prototype._clearTimeouts = function() {
    clearTimeout(this._visibilityStateTimeoutId);
    this._clearShowTimeout();
    return this._clearHideTimeout();
  };

  Opentip.prototype._triggerElementExists = function() {
    var el;
    el = this.adapter.unwrap(this.triggerElement);
    while (el.parentNode) {
      if (el.parentNode.tagName === "BODY") {
        return true;
      }
      el = el.parentNode;
    }
    return false;
  };

  Opentip.prototype._loadAjax = function() {
    var _this = this;
    if (this.loading) {
      return;
    }
    this.loaded = false;
    this.loading = true;
    this.adapter.addClass(this.container, this["class"].loading);
    this.setContent("");
    this.debug("Loading content from " + this.options.ajax);
    return this.adapter.ajax({
      url: this.options.ajax,
      method: this.options.ajaxMethod,
      onSuccess: function(responseText) {
        _this.debug("Loading successful.");
        _this.adapter.removeClass(_this.container, _this["class"].loading);
        return _this.setContent(responseText);
      },
      onError: function(error) {
        var message;
        message = _this.options.ajaxErrorMessage;
        _this.debug(message, error);
        _this.setContent(message);
        return _this.adapter.addClass(_this.container, _this["class"].ajaxError);
      },
      onComplete: function() {
        _this.adapter.removeClass(_this.container, _this["class"].loading);
        _this.loading = false;
        _this.loaded = true;
        _this._searchAndActivateCloseButtons();
        _this._activateFirstInput();
        return _this.reposition();
      }
    });
  };

  Opentip.prototype._ensureTriggerElement = function() {
    if (!this._triggerElementExists()) {
      this.deactivate();
      return this._stopEnsureTriggerElement();
    }
  };

  Opentip.prototype._ensureTriggerElementInterval = 1000;

  Opentip.prototype._startEnsureTriggerElement = function() {
    var _this = this;
    return this._ensureTriggerElementTimeoutId = setInterval((function() {
      return _this._ensureTriggerElement();
    }), this._ensureTriggerElementInterval);
  };

  Opentip.prototype._stopEnsureTriggerElement = function() {
    return clearInterval(this._ensureTriggerElementTimeoutId);
  };

  return Opentip;

})();

vendors = ["khtml", "ms", "o", "moz", "webkit"];

Opentip.prototype.setCss3Style = function(element, styles) {
  var prop, value, vendor, vendorProp, _results;
  element = this.adapter.unwrap(element);
  _results = [];
  for (prop in styles) {
    if (!__hasProp.call(styles, prop)) continue;
    value = styles[prop];
    if (element.style[prop] != null) {
      _results.push(element.style[prop] = value);
    } else {
      _results.push((function() {
        var _i, _len, _results1;
        _results1 = [];
        for (_i = 0, _len = vendors.length; _i < _len; _i++) {
          vendor = vendors[_i];
          vendorProp = "" + (this.ucfirst(vendor)) + (this.ucfirst(prop));
          if (element.style[vendorProp] != null) {
            _results1.push(element.style[vendorProp] = value);
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      }).call(this));
    }
  }
  return _results;
};

Opentip.prototype.defer = function(func) {
  return setTimeout(func, 0);
};

Opentip.prototype.setTimeout = function(func, seconds) {
  return setTimeout(func, seconds ? seconds * 1000 : 0);
};

Opentip.prototype.ucfirst = function(string) {
  if (string == null) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

Opentip.prototype.dasherize = function(string) {
  return string.replace(/([A-Z])/g, function(_, character) {
    return "-" + (character.toLowerCase());
  });
};

mousePositionObservers = [];

mousePosition = {
  x: 0,
  y: 0
};

mouseMoved = function(e) {
  var observer, _i, _len, _results;
  mousePosition = Opentip.adapter.mousePosition(e);
  _results = [];
  for (_i = 0, _len = mousePositionObservers.length; _i < _len; _i++) {
    observer = mousePositionObservers[_i];
    _results.push(observer());
  }
  return _results;
};

Opentip.followMousePosition = function() {
  return Opentip.adapter.observe(document.body, "mousemove", mouseMoved);
};

Opentip._observeMousePosition = function(observer) {
  return mousePositionObservers.push(observer);
};

Opentip._stopObservingMousePosition = function(removeObserver) {
  var observer;
  return mousePositionObservers = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = mousePositionObservers.length; _i < _len; _i++) {
      observer = mousePositionObservers[_i];
      if (observer !== removeObserver) {
        _results.push(observer);
      }
    }
    return _results;
  })();
};

Opentip.Joint = (function() {

  function Joint(pointerString) {
    if (pointerString == null) {
      return;
    }
    if (pointerString instanceof Opentip.Joint) {
      pointerString = pointerString.toString();
    }
    this.set(pointerString);
    this;

  }

  Joint.prototype.set = function(string) {
    string = string.toLowerCase();
    this.setHorizontal(string);
    this.setVertical(string);
    return this;
  };

  Joint.prototype.setHorizontal = function(string) {
    var i, valid, _i, _j, _len, _len1, _results;
    valid = ["left", "center", "right"];
    for (_i = 0, _len = valid.length; _i < _len; _i++) {
      i = valid[_i];
      if (~string.indexOf(i)) {
        this.horizontal = i.toLowerCase();
      }
    }
    if (this.horizontal == null) {
      this.horizontal = "center";
    }
    _results = [];
    for (_j = 0, _len1 = valid.length; _j < _len1; _j++) {
      i = valid[_j];
      _results.push(this[i] = this.horizontal === i ? i : void 0);
    }
    return _results;
  };

  Joint.prototype.setVertical = function(string) {
    var i, valid, _i, _j, _len, _len1, _results;
    valid = ["top", "middle", "bottom"];
    for (_i = 0, _len = valid.length; _i < _len; _i++) {
      i = valid[_i];
      if (~string.indexOf(i)) {
        this.vertical = i.toLowerCase();
      }
    }
    if (this.vertical == null) {
      this.vertical = "middle";
    }
    _results = [];
    for (_j = 0, _len1 = valid.length; _j < _len1; _j++) {
      i = valid[_j];
      _results.push(this[i] = this.vertical === i ? i : void 0);
    }
    return _results;
  };

  Joint.prototype.eql = function(pointer) {
    return (pointer != null) && this.horizontal === pointer.horizontal && this.vertical === pointer.vertical;
  };

  Joint.prototype.flip = function() {
    var flippedIndex, positionIdx;
    positionIdx = Opentip.position[this.toString(true)];
    flippedIndex = (positionIdx + 4) % 8;
    this.set(Opentip.positions[flippedIndex]);
    return this;
  };

  Joint.prototype.toString = function(camelized) {
    var horizontal, vertical;
    if (camelized == null) {
      camelized = false;
    }
    vertical = this.vertical === "middle" ? "" : this.vertical;
    horizontal = this.horizontal === "center" ? "" : this.horizontal;
    if (vertical && horizontal) {
      if (camelized) {
        horizontal = Opentip.prototype.ucfirst(horizontal);
      } else {
        horizontal = " " + horizontal;
      }
    }
    return "" + vertical + horizontal;
  };

  return Joint;

})();

Opentip.prototype._positionsEqual = function(posA, posB) {
  return (posA != null) && (posB != null) && posA.left === posB.left && posA.top === posB.top;
};

Opentip.prototype._dimensionsEqual = function(dimA, dimB) {
  return (dimA != null) && (dimB != null) && dimA.width === dimB.width && dimA.height === dimB.height;
};

Opentip.prototype.debug = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (Opentip.debug && ((typeof console !== "undefined" && console !== null ? console.debug : void 0) != null)) {
    args.unshift("#" + this.id + " |");
    return console.debug.apply(console, args);
  }
};

Opentip.findElements = function() {
  var adapter, content, element, optionName, optionValue, options, _i, _len, _ref, _results;
  adapter = Opentip.adapter;
  _ref = adapter.findAll(document.body, "[data-ot]");
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    element = _ref[_i];
    options = {};
    content = adapter.data(element, "ot");
    if (content === "" || content === "true" || content === "yes") {
      content = adapter.attr(element, "title");
      adapter.attr(element, "title", "");
    }
    content = content || "";
    for (optionName in Opentip.styles.standard) {
      optionValue = adapter.data(element, "ot" + (Opentip.prototype.ucfirst(optionName)));
      if (optionValue != null) {
        if (optionValue === "yes" || optionValue === "true" || optionValue === "on") {
          optionValue = true;
        } else if (optionValue === "no" || optionValue === "false" || optionValue === "off") {
          optionValue = false;
        }
        options[optionName] = optionValue;
      }
    }
    _results.push(new Opentip(element, content, options));
  }
  return _results;
};

Opentip.version = "2.4.6";

Opentip.debug = false;

Opentip.lastId = 0;

Opentip.lastZIndex = 100;

Opentip.tips = [];

Opentip._abortShowingGroup = function(group, originatingOpentip) {
  var opentip, _i, _len, _ref, _results;
  _ref = Opentip.tips;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    opentip = _ref[_i];
    if (opentip !== originatingOpentip && opentip.options.group === group) {
      _results.push(opentip._abortShowing());
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

Opentip._hideGroup = function(group, originatingOpentip) {
  var opentip, _i, _len, _ref, _results;
  _ref = Opentip.tips;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    opentip = _ref[_i];
    if (opentip !== originatingOpentip && opentip.options.group === group) {
      _results.push(opentip.hide());
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

Opentip.adapters = {};

Opentip.adapter = null;

firstAdapter = true;

Opentip.addAdapter = function(adapter) {
  Opentip.adapters[adapter.name] = adapter;
  if (firstAdapter) {
    Opentip.adapter = adapter;
    adapter.domReady(Opentip.findElements);
    adapter.domReady(Opentip.followMousePosition);
    return firstAdapter = false;
  }
};

Opentip.positions = ["top", "topRight", "right", "bottomRight", "bottom", "bottomLeft", "left", "topLeft"];

Opentip.position = {};

_ref = Opentip.positions;
for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
  position = _ref[i];
  Opentip.position[position] = i;
}

Opentip.styles = {
  standard: {
    "extends": null,
    title: void 0,
    escapeTitle: true,
    escapeContent: false,
    className: "standard",
    stem: true,
    delay: null,
    hideDelay: 0.1,
    fixed: false,
    showOn: "click, mouseover",
    hideTrigger: "closeButton",
    hideTriggers: [],
    hideOn: null,
    removeElementsOnHide: false,
    offset: [0, 0],
    containInViewport: true,
    autoOffset: true,
    showEffect: "appear",
    hideEffect: "fade",
    showEffectDuration: 0.3,
    hideEffectDuration: 0.2,
    stemLength: 5,
    stemBase: 8,
    tipJoint: "top left",
    target: true,
    targetJoint: null,
    cache: true,
    ajax: false,
    ajaxMethod: "GET",
    ajaxErrorMessage: "There was a problem downloading the content.",
    group: null,
    style: null,
    background: "#333",
    backgroundGradientHorizontal: false,
    closeButtonOffset: [5, 5],
    closeButtonRadius: 7,
    closeButtonCrossSize: 4,
    closeButtonCrossColor: "#f7a600",
    closeButtonCrossLineWidth: 1.5,
    closeButtonLinkOverscan: 6,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: null,
    shadow: true,
    shadowBlur: 10,
    shadowOffset: [3, 3],
    shadowColor: "rgba(0, 0, 0, 0.1)"
  },
  glass: {
    "extends": "standard",
    className: "glass",
    background: [[0, "rgba(252, 252, 252, 0.8)"], [0.5, "rgba(255, 255, 255, 0.8)"], [0.5, "rgba(250, 250, 250, 0.9)"], [1, "rgba(245, 245, 245, 0.9)"]],
    borderColor: "#eee",
    closeButtonCrossColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 15,
    closeButtonRadius: 10,
    closeButtonOffset: [8, 8]
  },
  dark: {
    "extends": "standard",
    className: "dark",
    borderRadius: 13,
    borderColor: "#444",
    closeButtonCrossColor: "rgba(240, 240, 240, 1)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: [2, 2],
    background: [[0, "rgba(30, 30, 30, 0.7)"], [0.5, "rgba(30, 30, 30, 0.8)"], [0.5, "rgba(10, 10, 10, 0.8)"], [1, "rgba(10, 10, 10, 0.9)"]]
  },
  alert: {
    "extends": "standard",
    className: "alert",
    borderRadius: 1,
    borderColor: "#AE0D11",
    closeButtonCrossColor: "rgba(255, 255, 255, 1)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: [2, 2],
    background: [[0, "rgba(203, 15, 19, 0.7)"], [0.5, "rgba(203, 15, 19, 0.8)"], [0.5, "rgba(189, 14, 18, 0.8)"], [1, "rgba(179, 14, 17, 0.9)"]]
  }
};

Opentip.defaultStyle = "standard";

if (typeof module !== "undefined" && module !== null) {
  module.exports = Opentip;
} else {
  window.Opentip = Opentip;
}


// Generated by CoffeeScript 1.4.0
var __slice = [].slice;

(function($) {
  var Adapter;
  $.fn.opentip = function(content, title, options) {
    return new Opentip(this, content, title, options);
  };
  Adapter = (function() {

    function Adapter() {}

    Adapter.prototype.name = "jquery";

    Adapter.prototype.domReady = function(callback) {
      return $(callback);
    };

    Adapter.prototype.create = function(html) {
      return $(html);
    };

    Adapter.prototype.wrap = function(element) {
      element = $(element);
      if (element.length > 1) {
        throw new Error("Multiple elements provided.");
      }
      return element;
    };

    Adapter.prototype.unwrap = function(element) {
      return $(element)[0];
    };

    Adapter.prototype.tagName = function(element) {
      return this.unwrap(element).tagName;
    };

    Adapter.prototype.attr = function() {
      var args, element, _ref;
      element = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = $(element)).attr.apply(_ref, args);
    };

    Adapter.prototype.data = function() {
      var args, element, _ref;
      element = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = $(element)).data.apply(_ref, args);
    };

    Adapter.prototype.find = function(element, selector) {
      return $(element).find(selector).get(0);
    };

    Adapter.prototype.findAll = function(element, selector) {
      return $(element).find(selector);
    };

    Adapter.prototype.update = function(element, content, escape) {
      element = $(element);
      if (escape) {
        return element.text(content);
      } else {
        return element.html(content);
      }
    };

    Adapter.prototype.append = function(element, child) {
      return $(element).append(child);
    };

    Adapter.prototype.remove = function(element) {
      return $(element).remove();
    };

    Adapter.prototype.addClass = function(element, className) {
      return $(element).addClass(className);
    };

    Adapter.prototype.removeClass = function(element, className) {
      return $(element).removeClass(className);
    };

    Adapter.prototype.css = function(element, properties) {
      return $(element).css(properties);
    };

    Adapter.prototype.dimensions = function(element) {
      return {
        width: $(element).outerWidth(),
        height: $(element).outerHeight()
      };
    };

    Adapter.prototype.scrollOffset = function() {
      return [window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    };

    Adapter.prototype.viewportDimensions = function() {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
    };

    Adapter.prototype.mousePosition = function(e) {
      if (e == null) {
        return null;
      }
      return {
        x: e.pageX,
        y: e.pageY
      };
    };

    Adapter.prototype.offset = function(element) {
      var offset;
      offset = $(element).offset();
      return {
        left: offset.left,
        top: offset.top
      };
    };

    Adapter.prototype.observe = function(element, eventName, observer) {
      return $(element).bind(eventName, observer);
    };

    Adapter.prototype.stopObserving = function(element, eventName, observer) {
      return $(element).unbind(eventName, observer);
    };

    Adapter.prototype.ajax = function(options) {
      var _ref, _ref1;
      if (options.url == null) {
        throw new Error("No url provided");
      }
      return $.ajax({
        url: options.url,
        type: (_ref = (_ref1 = options.method) != null ? _ref1.toUpperCase() : void 0) != null ? _ref : "GET"
      }).done(function(content) {
        return typeof options.onSuccess === "function" ? options.onSuccess(content) : void 0;
      }).fail(function(request) {
        return typeof options.onError === "function" ? options.onError("Server responded with status " + request.status) : void 0;
      }).always(function() {
        return typeof options.onComplete === "function" ? options.onComplete() : void 0;
      });
    };

    Adapter.prototype.clone = function(object) {
      return $.extend({}, object);
    };

    Adapter.prototype.extend = function() {
      var sources, target;
      target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return $.extend.apply($, [target].concat(__slice.call(sources)));
    };

    return Adapter;

  })();
  return Opentip.addAdapter(new Adapter);
})(jQuery);

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
function show_hide_div(t){var e=document.getElementById(t);hasClass(e,"heading-close")?(addClass(e,"heading-open"),removeClass(e,"heading-close")):(addClass(e,"heading-close"),removeClass(e,"heading-open"));for(var i=0,n=document.getElementById(t).getElementsByClassName("sidenav-grp-links");i<n.length;i++)"hidden"==n[i].style.visibility?(n[i].style.visibility="visible",n[i].style.display="block"):(n[i].style.visibility="hidden",n[i].style.display="none")}function hasClass(t,e){return t.classList?t.classList.contains(e):!!t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))}function addClass(t,e){t.classList?t.classList.add(e):hasClass(t,e)||(t.className+=" "+e)}function removeClass(t,e){if(t.classList)t.classList.remove(e);else if(hasClass(t,e)){var i=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(i," ")}}!function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="/",e(0)}([function(t,e,i){i(4),i(5),i(6),i(7),i(8),i(9),i(1),i(10),i(11),i(12),i(13),i(14),i(15),i(16),t.exports=i(17)},function(t,e,i){"use strict";function n(t){p.env()&&(g(t.design)&&m.on("__wf_design",t.design),g(t.preview)&&m.on("__wf_preview",t.preview)),g(t.destroy)&&m.on("__wf_destroy",t.destroy),t.ready&&g(t.ready)&&s(t)}function s(t){return x?void t.ready():void(w.contains(f,t.ready)||f.push(t.ready))}function o(t){g(t.design)&&m.off("__wf_design",t.design),g(t.preview)&&m.off("__wf_preview",t.preview),g(t.destroy)&&m.off("__wf_destroy",t.destroy),t.ready&&g(t.ready)&&a(t)}function a(t){f=w.filter(f,function(e){return e!==t.ready})}function r(t,e){var i=[],n={};return n.up=w.throttle(function(t){w.each(i,function(e){e(t)})}),t&&e&&t.on(e,n.up),n.on=function(t){"function"==typeof t&&(w.contains(i,t)||i.push(t))},n.off=function(t){return arguments.length?void(i=w.filter(i,function(e){return e!==t})):void(i=[])},n}function c(t){g(t)&&t()}function l(){k=!1,w.each(d,n)}function u(){S&&(S.reject(),m.off("load",S.resolve)),S=new v.Deferred,m.on("load",S.resolve)}var p={},d={},f=[],h=window.Webflow||[],v=window.jQuery,m=v(window),y=v(document),g=v.isFunction,w=p._=i(18),b=i(3)&&v.tram,x=!1,k=!1,A=window.Modernizr;b.config.hideBackface=!1,b.config.keepInherited=!0,p.define=function(t,e,i){d[t]&&o(d[t]);var s=d[t]=e(v,w,i)||{};return n(s),s},p.require=function(t){return d[t]},p.push=function(t){return x?void(g(t)&&t()):void h.push(t)},p.env=function(t){var e=window.__wf_design,i="undefined"!=typeof e;return t?"design"===t?i&&e:"preview"===t?i&&!e:"slug"===t?i&&window.__wf_slug:"editor"===t?window.WebflowEditor:"test"===t?window.__wf_test:"frame"===t?window!==window.top:void 0:i};var B=navigator.userAgent.toLowerCase(),_=navigator.appVersion.toLowerCase(),T=p.env.touch="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,C=p.env.chrome=/chrome/.test(B)&&/Google/.test(navigator.vendor)&&parseInt(_.match(/chrome\/(\d+)\./)[1],10),L=p.env.ios=A&&A.ios;p.env.safari=/safari/.test(B)&&!C&&!L;var O;T&&y.on("touchstart mousedown",function(t){O=t.target}),p.validClick=T?function(t){return t===O||v.contains(t,O)}:function(){return!0};var z="resize.webflow orientationchange.webflow load.webflow",E="scroll.webflow "+z;if(p.resize=r(m,z),p.scroll=r(m,E),p.redraw=r(),p.location=function(t){window.location=t},p.app=p.env()?{}:null,p.app){var M=new Event("__wf_redraw");p.app.redrawElement=function(t,e){e.dispatchEvent(M)},p.location=function(t){window.dispatchEvent(new CustomEvent("__wf_location",{detail:t}))}}p.ready=function(){x=!0,k?l():w.each(f,c),w.each(h,c),p.resize.up()};var S;p.load=function(t){S.then(t)},p.destroy=function(t){t=t||{},k=!0,m.triggerHandler("__wf_destroy"),null!=t.domready&&(x=t.domready),w.each(d,o),p.resize.off(),p.scroll.off(),p.redraw.off(),f=[],h=[],"pending"===S.state()&&u()},v(p.ready),u(),t.exports=window.Webflow=p},function(t,e){"use strict";var i=window.jQuery,n={},s=[],o=".w-ix",a={reset:function(t,e){e.__wf_intro=null},intro:function(t,e){e.__wf_intro||(e.__wf_intro=!0,i(e).triggerHandler(n.types.INTRO))},outro:function(t,e){e.__wf_intro&&(e.__wf_intro=null,i(e).triggerHandler(n.types.OUTRO))}};n.triggers={},n.types={INTRO:"w-ix-intro"+o,OUTRO:"w-ix-outro"+o},n.init=function(){for(var t=s.length,e=0;t>e;e++){var o=s[e];o[0](0,o[1])}s=[],i.extend(n.triggers,a)},n.async=function(){for(var t in a){var e=a[t];a.hasOwnProperty(t)&&(n.triggers[t]=function(t,i){s.push([e,i])})}},n.async(),t.exports=n},function(t,e){window.tram=function(t){function e(t,e){var i=new q.Bare;return i.init(t,e)}function i(t){return t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})}function n(t){var e=parseInt(t.slice(1),16),i=e>>16&255,n=e>>8&255,s=255&e;return[i,n,s]}function s(t,e,i){return"#"+(1<<24|t<<16|e<<8|i).toString(16).slice(1)}function o(){}function a(t,e){K("Type warning: Expected: ["+t+"] Got: ["+typeof e+"] "+e)}function r(t,e,i){K("Units do not match ["+t+"]: "+e+", "+i)}function c(t,e,i){if(void 0!==e&&(i=e),void 0===t)return i;var n=i;return J.test(t)||!V.test(t)?n=parseInt(t,10):V.test(t)&&(n=1e3*parseFloat(t)),0>n&&(n=0),n===n?n:i}function l(t){for(var e=-1,i=t?t.length:0,n=[];++e<i;){var s=t[e];s&&n.push(s)}return n}var u=function(t,e,i){function n(t){return"object"==typeof t}function s(t){return"function"==typeof t}function o(){}function a(r,c){function l(){var t=new u;return s(t.init)&&t.init.apply(t,arguments),t}function u(){}c===i&&(c=r,r=Object),l.Bare=u;var p,d=o[t]=r[t],f=u[t]=l[t]=new o;return f.constructor=l,l.mixin=function(e){return u[t]=l[t]=a(l,e)[t],l},l.open=function(t){if(p={},s(t)?p=t.call(l,f,d,l,r):n(t)&&(p=t),n(p))for(var i in p)e.call(p,i)&&(f[i]=p[i]);return s(f.init)||(f.init=r),l},l.open(c)}return a}("prototype",{}.hasOwnProperty),p={ease:["ease",function(t,e,i,n){var s=(t/=n)*t,o=s*t;return e+i*(-2.75*o*s+11*s*s+-15.5*o+8*s+.25*t)}],"ease-in":["ease-in",function(t,e,i,n){var s=(t/=n)*t,o=s*t;return e+i*(-1*o*s+3*s*s+-3*o+2*s)}],"ease-out":["ease-out",function(t,e,i,n){var s=(t/=n)*t,o=s*t;return e+i*(.3*o*s+-1.6*s*s+2.2*o+-1.8*s+1.9*t)}],"ease-in-out":["ease-in-out",function(t,e,i,n){var s=(t/=n)*t,o=s*t;return e+i*(2*o*s+-5*s*s+2*o+2*s)}],linear:["linear",function(t,e,i,n){return i*t/n+e}],"ease-in-quad":["cubic-bezier(0.550, 0.085, 0.680, 0.530)",function(t,e,i,n){return i*(t/=n)*t+e}],"ease-out-quad":["cubic-bezier(0.250, 0.460, 0.450, 0.940)",function(t,e,i,n){return-i*(t/=n)*(t-2)+e}],"ease-in-out-quad":["cubic-bezier(0.455, 0.030, 0.515, 0.955)",function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e}],"ease-in-cubic":["cubic-bezier(0.550, 0.055, 0.675, 0.190)",function(t,e,i,n){return i*(t/=n)*t*t+e}],"ease-out-cubic":["cubic-bezier(0.215, 0.610, 0.355, 1)",function(t,e,i,n){return i*((t=t/n-1)*t*t+1)+e}],"ease-in-out-cubic":["cubic-bezier(0.645, 0.045, 0.355, 1)",function(t,e,i,n){return(t/=n/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e}],"ease-in-quart":["cubic-bezier(0.895, 0.030, 0.685, 0.220)",function(t,e,i,n){return i*(t/=n)*t*t*t+e}],"ease-out-quart":["cubic-bezier(0.165, 0.840, 0.440, 1)",function(t,e,i,n){return-i*((t=t/n-1)*t*t*t-1)+e}],"ease-in-out-quart":["cubic-bezier(0.770, 0, 0.175, 1)",function(t,e,i,n){return(t/=n/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e}],"ease-in-quint":["cubic-bezier(0.755, 0.050, 0.855, 0.060)",function(t,e,i,n){return i*(t/=n)*t*t*t*t+e}],"ease-out-quint":["cubic-bezier(0.230, 1, 0.320, 1)",function(t,e,i,n){return i*((t=t/n-1)*t*t*t*t+1)+e}],"ease-in-out-quint":["cubic-bezier(0.860, 0, 0.070, 1)",function(t,e,i,n){return(t/=n/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e}],"ease-in-sine":["cubic-bezier(0.470, 0, 0.745, 0.715)",function(t,e,i,n){return-i*Math.cos(t/n*(Math.PI/2))+i+e}],"ease-out-sine":["cubic-bezier(0.390, 0.575, 0.565, 1)",function(t,e,i,n){return i*Math.sin(t/n*(Math.PI/2))+e}],"ease-in-out-sine":["cubic-bezier(0.445, 0.050, 0.550, 0.950)",function(t,e,i,n){return-i/2*(Math.cos(Math.PI*t/n)-1)+e}],"ease-in-expo":["cubic-bezier(0.950, 0.050, 0.795, 0.035)",function(t,e,i,n){return 0===t?e:i*Math.pow(2,10*(t/n-1))+e}],"ease-out-expo":["cubic-bezier(0.190, 1, 0.220, 1)",function(t,e,i,n){return t===n?e+i:i*(-Math.pow(2,-10*t/n)+1)+e}],"ease-in-out-expo":["cubic-bezier(1, 0, 0, 1)",function(t,e,i,n){return 0===t?e:t===n?e+i:(t/=n/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(-Math.pow(2,-10*--t)+2)+e}],"ease-in-circ":["cubic-bezier(0.600, 0.040, 0.980, 0.335)",function(t,e,i,n){return-i*(Math.sqrt(1-(t/=n)*t)-1)+e}],"ease-out-circ":["cubic-bezier(0.075, 0.820, 0.165, 1)",function(t,e,i,n){return i*Math.sqrt(1-(t=t/n-1)*t)+e}],"ease-in-out-circ":["cubic-bezier(0.785, 0.135, 0.150, 0.860)",function(t,e,i,n){return(t/=n/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e}],"ease-in-back":["cubic-bezier(0.600, -0.280, 0.735, 0.045)",function(t,e,i,n,s){return void 0===s&&(s=1.70158),i*(t/=n)*t*((s+1)*t-s)+e}],"ease-out-back":["cubic-bezier(0.175, 0.885, 0.320, 1.275)",function(t,e,i,n,s){return void 0===s&&(s=1.70158),i*((t=t/n-1)*t*((s+1)*t+s)+1)+e}],"ease-in-out-back":["cubic-bezier(0.680, -0.550, 0.265, 1.550)",function(t,e,i,n,s){return void 0===s&&(s=1.70158),(t/=n/2)<1?i/2*t*t*(((s*=1.525)+1)*t-s)+e:i/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+e}]},d={"ease-in-back":"cubic-bezier(0.600, 0, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1)","ease-in-out-back":"cubic-bezier(0.680, 0, 0.265, 1)"},f=document,h=window,v="bkwld-tram",m=/[\-\.0-9]/g,y=/[A-Z]/,g="number",w=/^(rgb|#)/,b=/(em|cm|mm|in|pt|pc|px)$/,x=/(em|cm|mm|in|pt|pc|px|%)$/,k=/(deg|rad|turn)$/,A="unitless",B=/(all|none) 0s ease 0s/,_=/^(width|height)$/,T=" ",C=f.createElement("a"),L=["Webkit","Moz","O","ms"],O=["-webkit-","-moz-","-o-","-ms-"],z=function(t){if(t in C.style)return{dom:t,css:t};var e,i,n="",s=t.split("-");for(e=0;e<s.length;e++)n+=s[e].charAt(0).toUpperCase()+s[e].slice(1);for(e=0;e<L.length;e++)if(i=L[e]+n,i in C.style)return{dom:i,css:O[e]+t}},E=e.support={bind:Function.prototype.bind,transform:z("transform"),transition:z("transition"),backface:z("backface-visibility"),timing:z("transition-timing-function")};if(E.transition){var M=E.timing.dom;if(C.style[M]=p["ease-in-back"][0],!C.style[M])for(var S in d)p[S][0]=d[S]}var j=e.frame=function(){var t=h.requestAnimationFrame||h.webkitRequestAnimationFrame||h.mozRequestAnimationFrame||h.oRequestAnimationFrame||h.msRequestAnimationFrame;return t&&E.bind?t.bind(h):function(t){h.setTimeout(t,16)}}(),I=e.now=function(){var t=h.performance,e=t&&(t.now||t.webkitNow||t.msNow||t.mozNow);return e&&E.bind?e.bind(t):Date.now||function(){return+new Date}}(),$=u(function(e){function n(t,e){var i=l((""+t).split(T)),n=i[0];e=e||{};var s=Y[n];if(!s)return K("Unsupported property: "+n);if(!e.weak||!this.props[n]){var o=s[0],a=this.props[n];return a||(a=this.props[n]=new o.Bare),a.init(this.$el,i,s,e),a}}function s(t,e,i){if(t){var s=typeof t;if(e||(this.timer&&this.timer.destroy(),this.queue=[],this.active=!1),"number"==s&&e)return this.timer=new W({duration:t,context:this,complete:r}),void(this.active=!0);if("string"==s&&e){switch(t){case"hide":f.call(this);break;case"stop":u.call(this);break;case"redraw":h.call(this);break;default:n.call(this,t,i&&i[1])}return r.call(this)}if("function"==s)return void t.call(this,this);if("object"==s){var o=0;w.call(this,t,function(t,e){t.span>o&&(o=t.span),t.stop(),t.animate(e)},function(t){"wait"in t&&(o=c(t.wait,0))}),g.call(this),o>0&&(this.timer=new W({duration:o,context:this}),this.active=!0,e&&(this.timer.complete=r));var a=this,l=!1,p={};j(function(){w.call(a,t,function(t){t.active&&(l=!0,p[t.name]=t.nextStyle)}),l&&a.$el.css(p)})}}}function o(t){t=c(t,0),this.active?this.queue.push({options:t}):(this.timer=new W({duration:t,context:this,complete:r}),this.active=!0)}function a(t){return this.active?(this.queue.push({options:t,args:arguments}),void(this.timer.complete=r)):K("No active transition timer. Use start() or wait() before then().")}function r(){if(this.timer&&this.timer.destroy(),this.active=!1,this.queue.length){var t=this.queue.shift();s.call(this,t.options,!0,t.args)}}function u(t){this.timer&&this.timer.destroy(),this.queue=[],this.active=!1;var e;"string"==typeof t?(e={},e[t]=1):e="object"==typeof t&&null!=t?t:this.props,w.call(this,e,b),g.call(this)}function p(t){u.call(this,t),w.call(this,t,x,k)}function d(t){"string"!=typeof t&&(t="block"),this.el.style.display=t}function f(){u.call(this),this.el.style.display="none"}function h(){this.el.offsetHeight}function m(){u.call(this),t.removeData(this.el,v),this.$el=this.el=null}function g(){var t,e,i=[];this.upstream&&i.push(this.upstream);for(t in this.props)e=this.props[t],e.active&&i.push(e.string);i=i.join(","),this.style!==i&&(this.style=i,this.el.style[E.transition.dom]=i)}function w(t,e,s){var o,a,r,c,l=e!==b,u={};for(o in t)r=t[o],o in Q?(u.transform||(u.transform={}),u.transform[o]=r):(y.test(o)&&(o=i(o)),o in Y?u[o]=r:(c||(c={}),c[o]=r));for(o in u){if(r=u[o],a=this.props[o],!a){if(!l)continue;a=n.call(this,o)}e.call(this,a,r)}s&&c&&s.call(this,c)}function b(t){t.stop()}function x(t,e){t.set(e)}function k(t){this.$el.css(t)}function A(t,i){e[t]=function(){return this.children?_.call(this,i,arguments):(this.el&&i.apply(this,arguments),this)}}function _(t,e){var i,n=this.children.length;for(i=0;n>i;i++)t.apply(this.children[i],e);return this}e.init=function(e){if(this.$el=t(e),this.el=this.$el[0],this.props={},this.queue=[],this.style="",this.active=!1,H.keepInherited&&!H.fallback){var i=Z(this.el,"transition");i&&!B.test(i)&&(this.upstream=i)}E.backface&&H.hideBackface&&G(this.el,E.backface.css,"hidden")},A("add",n),A("start",s),A("wait",o),A("then",a),A("next",r),A("stop",u),A("set",p),A("show",d),A("hide",f),A("redraw",h),A("destroy",m)}),q=u($,function(e){function i(e,i){var n=t.data(e,v)||t.data(e,v,new $.Bare);return n.el||n.init(e),i?n.start(i):n}e.init=function(e,n){var s=t(e);if(!s.length)return this;if(1===s.length)return i(s[0],n);var o=[];return s.each(function(t,e){o.push(i(e,n))}),this.children=o,this}}),D=u(function(t){function e(){var t=this.get();this.update("auto");var e=this.get();return this.update(t),e}function i(t,e,i){return void 0!==e&&(i=e),t in p?t:i}function n(t){var e=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(t);return(e?s(e[1],e[2],e[3]):t).replace(/#(\w)(\w)(\w)$/,"#$1$1$2$2$3$3")}var o={duration:500,ease:"ease",delay:0};t.init=function(t,e,n,s){this.$el=t,this.el=t[0];var a=e[0];n[2]&&(a=n[2]),U[a]&&(a=U[a]),this.name=a,this.type=n[1],this.duration=c(e[1],this.duration,o.duration),this.ease=i(e[2],this.ease,o.ease),this.delay=c(e[3],this.delay,o.delay),this.span=this.duration+this.delay,this.active=!1,this.nextStyle=null,this.auto=_.test(this.name),this.unit=s.unit||this.unit||H.defaultUnit,this.angle=s.angle||this.angle||H.defaultAngle,H.fallback||s.fallback?this.animate=this.fallback:(this.animate=this.transition,this.string=this.name+T+this.duration+"ms"+("ease"!=this.ease?T+p[this.ease][0]:"")+(this.delay?T+this.delay+"ms":""))},t.set=function(t){t=this.convert(t,this.type),this.update(t),this.redraw()},t.transition=function(t){this.active=!0,t=this.convert(t,this.type),this.auto&&("auto"==this.el.style[this.name]&&(this.update(this.get()),this.redraw()),"auto"==t&&(t=e.call(this))),this.nextStyle=t},t.fallback=function(t){var i=this.el.style[this.name]||this.convert(this.get(),this.type);t=this.convert(t,this.type),this.auto&&("auto"==i&&(i=this.convert(this.get(),this.type)),"auto"==t&&(t=e.call(this))),this.tween=new F({from:i,to:t,duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},t.get=function(){return Z(this.el,this.name)},t.update=function(t){G(this.el,this.name,t)},t.stop=function(){(this.active||this.nextStyle)&&(this.active=!1,this.nextStyle=null,G(this.el,this.name,this.get()));var t=this.tween;t&&t.context&&t.destroy()},t.convert=function(t,e){if("auto"==t&&this.auto)return t;var i,s="number"==typeof t,o="string"==typeof t;switch(e){case g:if(s)return t;if(o&&""===t.replace(m,""))return+t;i="number(unitless)";break;case w:if(o){if(""===t&&this.original)return this.original;if(e.test(t))return"#"==t.charAt(0)&&7==t.length?t:n(t)}i="hex or rgb string";break;case b:if(s)return t+this.unit;if(o&&e.test(t))return t;i="number(px) or string(unit)";break;case x:if(s)return t+this.unit;if(o&&e.test(t))return t;i="number(px) or string(unit or %)";break;case k:if(s)return t+this.angle;if(o&&e.test(t))return t;i="number(deg) or string(angle)";break;case A:if(s)return t;if(o&&x.test(t))return t;i="number(unitless) or string(unit or %)"}return a(i,t),t},t.redraw=function(){this.el.offsetHeight}}),R=u(D,function(t,e){t.init=function(){e.init.apply(this,arguments),this.original||(this.original=this.convert(this.get(),w))}}),P=u(D,function(t,e){t.init=function(){e.init.apply(this,arguments),this.animate=this.fallback},t.get=function(){return this.$el[this.name]()},t.update=function(t){this.$el[this.name](t)}}),N=u(D,function(t,e){function i(t,e){var i,n,s,o,a;for(i in t)o=Q[i],s=o[0],n=o[1]||i,a=this.convert(t[i],s),e.call(this,n,a,s)}t.init=function(){e.init.apply(this,arguments),this.current||(this.current={},Q.perspective&&H.perspective&&(this.current.perspective=H.perspective,G(this.el,this.name,this.style(this.current)),this.redraw()))},t.set=function(t){i.call(this,t,function(t,e){this.current[t]=e}),G(this.el,this.name,this.style(this.current)),this.redraw()},t.transition=function(t){var e=this.values(t);this.tween=new X({current:this.current,values:e,duration:this.duration,delay:this.delay,ease:this.ease});var i,n={};for(i in this.current)n[i]=i in e?e[i]:this.current[i];this.active=!0,this.nextStyle=this.style(n)},t.fallback=function(t){var e=this.values(t);this.tween=new X({current:this.current,values:e,duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},t.update=function(){G(this.el,this.name,this.style(this.current))},t.style=function(t){var e,i="";for(e in t)i+=e+"("+t[e]+") ";return i},t.values=function(t){var e,n={};return i.call(this,t,function(t,i,s){n[t]=i,void 0===this.current[t]&&(e=0,~t.indexOf("scale")&&(e=1),this.current[t]=this.convert(e,s))}),n}}),F=u(function(e){function i(t){1===f.push(t)&&j(a)}function a(){var t,e,i,n=f.length;if(n)for(j(a),e=I(),t=n;t--;)i=f[t],i&&i.render(e)}function c(e){var i,n=t.inArray(e,f);n>=0&&(i=f.slice(n+1),f.length=n,i.length&&(f=f.concat(i)))}function l(t){return Math.round(t*h)/h}function u(t,e,i){return s(t[0]+i*(e[0]-t[0]),t[1]+i*(e[1]-t[1]),t[2]+i*(e[2]-t[2]))}var d={ease:p.ease[1],from:0,to:1};e.init=function(t){this.duration=t.duration||0,this.delay=t.delay||0;var e=t.ease||d.ease;p[e]&&(e=p[e][1]),"function"!=typeof e&&(e=d.ease),this.ease=e,this.update=t.update||o,this.complete=t.complete||o,this.context=t.context||this,this.name=t.name;var i=t.from,n=t.to;void 0===i&&(i=d.from),void 0===n&&(n=d.to),this.unit=t.unit||"","number"==typeof i&&"number"==typeof n?(this.begin=i,this.change=n-i):this.format(n,i),this.value=this.begin+this.unit,this.start=I(),t.autoplay!==!1&&this.play()},e.play=function(){this.active||(this.start||(this.start=I()),this.active=!0,i(this))},e.stop=function(){this.active&&(this.active=!1,c(this))},e.render=function(t){var e,i=t-this.start;if(this.delay){if(i<=this.delay)return;i-=this.delay}if(i<this.duration){var n=this.ease(i,0,1,this.duration);return e=this.startRGB?u(this.startRGB,this.endRGB,n):l(this.begin+n*this.change),this.value=e+this.unit,void this.update.call(this.context,this.value)}e=this.endHex||this.begin+this.change,this.value=e+this.unit,this.update.call(this.context,this.value),this.complete.call(this.context),this.destroy()},e.format=function(t,e){if(e+="",t+="","#"==t.charAt(0))return this.startRGB=n(e),this.endRGB=n(t),this.endHex=t,this.begin=0,void(this.change=1);if(!this.unit){var i=e.replace(m,""),s=t.replace(m,"");i!==s&&r("tween",e,t),this.unit=i}e=parseFloat(e),t=parseFloat(t),this.begin=this.value=e,this.change=t-e},e.destroy=function(){this.stop(),this.context=null,this.ease=this.update=this.complete=o};var f=[],h=1e3}),W=u(F,function(t){t.init=function(t){this.duration=t.duration||0,this.complete=t.complete||o,this.context=t.context,this.play()},t.render=function(t){var e=t-this.start;e<this.duration||(this.complete.call(this.context),this.destroy())}}),X=u(F,function(t,e){t.init=function(t){this.context=t.context,this.update=t.update,this.tweens=[],this.current=t.current;var e,i;for(e in t.values)i=t.values[e],this.current[e]!==i&&this.tweens.push(new F({name:e,from:this.current[e],to:i,duration:t.duration,delay:t.delay,ease:t.ease,autoplay:!1}));this.play()},t.render=function(t){var e,i,n=this.tweens.length,s=!1;for(e=n;e--;)i=this.tweens[e],i.context&&(i.render(t),this.current[i.name]=i.value,s=!0);return s?void(this.update&&this.update.call(this.context)):this.destroy()},t.destroy=function(){if(e.destroy.call(this),this.tweens){var t,i=this.tweens.length;for(t=i;t--;)this.tweens[t].destroy();this.tweens=null,this.current=null}}}),H=e.config={defaultUnit:"px",defaultAngle:"deg",keepInherited:!1,hideBackface:!1,perspective:"",fallback:!E.transition,agentTests:[]};e.fallback=function(t){if(!E.transition)return H.fallback=!0;H.agentTests.push("("+t+")");var e=new RegExp(H.agentTests.join("|"),"i");H.fallback=e.test(navigator.userAgent)},e.fallback("6.0.[2-5] Safari"),e.tween=function(t){return new F(t)},e.delay=function(t,e,i){return new W({complete:e,duration:t,context:i})},t.fn.tram=function(t){return e.call(null,this,t)};var G=t.style,Z=t.css,U={transform:E.transform&&E.transform.css},Y={color:[R,w],background:[R,w,"background-color"],"outline-color":[R,w],"border-color":[R,w],"border-top-color":[R,w],"border-right-color":[R,w],"border-bottom-color":[R,w],"border-left-color":[R,w],"border-width":[D,b],"border-top-width":[D,b],"border-right-width":[D,b],"border-bottom-width":[D,b],"border-left-width":[D,b],"border-spacing":[D,b],"letter-spacing":[D,b],margin:[D,b],"margin-top":[D,b],"margin-right":[D,b],"margin-bottom":[D,b],"margin-left":[D,b],padding:[D,b],"padding-top":[D,b],"padding-right":[D,b],"padding-bottom":[D,b],"padding-left":[D,b],"outline-width":[D,b],opacity:[D,g],top:[D,x],right:[D,x],bottom:[D,x],left:[D,x],"font-size":[D,x],"text-indent":[D,x],"word-spacing":[D,x],width:[D,x],"min-width":[D,x],"max-width":[D,x],height:[D,x],"min-height":[D,x],"max-height":[D,x],"line-height":[D,A],"scroll-top":[P,g,"scrollTop"],"scroll-left":[P,g,"scrollLeft"]},Q={};E.transform&&(Y.transform=[N],Q={x:[x,"translateX"],y:[x,"translateY"],rotate:[k],rotateX:[k],rotateY:[k],scale:[g],scaleX:[g],scaleY:[g],skew:[k],skewX:[k],skewY:[k]}),E.transform&&E.backface&&(Q.z=[x,"translateZ"],Q.rotateZ=[k],Q.scaleZ=[g],Q.perspective=[b]);var J=/ms/,V=/s|\./,K=function(){var t="warn",e=window.console;return e&&e[t]?function(i){e[t](i)}:o}();return t.tram=e}(window.jQuery)},function(t,e,i){"use strict";var n=i(1);n.define("brand",t.exports=function(t,e){var i={},s=t("html"),o=t("body");window.location,n.env();return i.ready=function(){var e=s.attr("data-wf-status");if(e){var i=t("<div></div>"),n=t("<a></a>");n.attr("href","http://webflow.com?utm_campaign=brandjs"),i.css({position:"fixed",bottom:0,right:0,borderTopLeftRadius:"5px",backgroundColor:"#2b3239",padding:"8px 12px 5px 15px",fontFamily:"Arial",fontSize:"10px",textTransform:"uppercase",opacity:"0",transition:"opacity 0.50s ease-in-out"}),n.css({color:"#AAADB0",textDecoration:"none"});var a=t("<img>");if(a.attr("src","https://daks2k3a4ib2z.cloudfront.net/54153e6a3d25f2755b1f14ed/5445a4b1944ecdaa4df86d3e_subdomain-brand.svg"),a.css({opacity:.9,width:"57px",verticalAlign:"middle",paddingLeft:"4px",paddingBottom:"3px"}),i.text("Built with"),i.append(a),n.append(i),o.append(n),/PhantomJS/.test(window.navigator.userAgent))return;i.css({opacity:"1.0"})}},i})},function(t,e,i){"use strict";var n=i(1),s=i(2);n.define("dropdown",t.exports=function(t,e){function i(){y=b&&n.env("design"),m=w.find(k),m.each(o)}function o(e,i){var n=t(i),s=t.data(i,k);s||(s=t.data(i,k,{open:!1,el:n,config:{}})),s.list=n.children(".w-dropdown-list"),s.toggle=n.children(".w-dropdown-toggle"),s.links=s.list.children(".w-dropdown-link"),s.outside=d(s),s.complete=f(s),s.leave=v(s),n.off(k),s.toggle.off(k),a(s),s.nav&&s.nav.off(k),s.nav=n.closest(".w-nav"),s.nav.on(B,r(s)),y?n.on("setting"+k,r(s)):(s.toggle.on("tap"+k,c(s)),s.config.hover&&s.toggle.on("mouseenter"+k,h(s)),n.on(B,r(s)),b&&u(s))}function a(t){t.config={hover:Boolean(t.el.attr("data-hover"))&&!x,delay:Number(t.el.attr("data-delay"))||0}}function r(t){return function(e,i){return i=i||{},"w-close"===e.type?u(t):"setting"===e.type?(a(t),i.open===!0&&l(t,!0),void(i.open===!1&&u(t,!0))):void 0}}function c(t){return e.debounce(function(){t.open?u(t):l(t)})}function l(t){t.open||(p(t),t.open=!0,t.list.addClass(A),t.toggle.addClass(A),_.intro(0,t.el[0]),n.redraw.up(),y||w.on("tap"+k,t.outside),t.hovering&&t.el.on("mouseleave"+k,t.leave),window.clearTimeout(t.delayId))}function u(t,e){if(t.open&&(!t.config.hover||!t.hovering)){t.open=!1;var i=t.config;return _.outro(0,t.el[0]),w.off("tap"+k,t.outside),t.el.off("mouseleave"+k,t.leave),window.clearTimeout(t.delayId),!i.delay||e?t.complete():void(t.delayId=window.setTimeout(t.complete,i.delay))}}function p(e){var i=e.el[0];m.each(function(e,n){var s=t(n);s.is(i)||s.has(i).length||s.triggerHandler(B)})}function d(i){return i.outside&&w.off("tap"+k,i.outside),e.debounce(function(e){if(i.open){var n=t(e.target);n.closest(".w-dropdown-toggle").length||i.el.is(n.closest(k))||u(i)}})}function f(t){return function(){t.list.removeClass(A),t.toggle.removeClass(A)}}function h(t){return function(){t.hovering=!0,l(t)}}function v(t){return function(){t.hovering=!1,u(t)}}var m,y,g={},w=t(document),b=n.env(),x=n.env.touch,k=".w-dropdown",A="w--open",B="w-close"+k,_=s.triggers;return g.ready=g.design=g.preview=i,g})},function(t,e,i){"use strict";var n=i(1);n.define("edit",t.exports=function(t,e,i){function s(){p||/\?edit/.test(v.hash)&&y()}function o(){p=!0,window.WebflowEditor=!0,f.off(m,s),t.ajax({url:u("https://editor-api.webflow.com/api/editor/view"),data:{siteId:h.attr("data-wf-site")},xhrFields:{withCredentials:!0},dataType:"json",crossDomain:!0,success:a})}function a(t){return t?void r(l(t.scriptPath),function(){window.WebflowEditor(t)}):void console.error("Could not load editor data")}function r(e,i){t.ajax({type:"GET",url:e,dataType:"script",cache:!0}).then(i,c)}function c(t,e,i){throw console.error("Could not load editor script: "+e),i}function l(t){return t.indexOf("//")>=0?t:u("https://editor-api.webflow.com"+t)}function u(t){return t.replace(/([^:])\/\//g,"$1/")}if(i=i||{},(n.env("test")||n.env("frame"))&&!i.fixture)return{exit:1};var p,d={},f=t(window),h=t(document.documentElement),v=document.location,m="hashchange",y=i.load||o;return localStorage&&localStorage.getItem&&localStorage.getItem("WebflowEditor")?y():v.search?(/[?&](edit)(?:[=&?]|$)/.test(v.search)||/\?edit$/.test(v.href))&&y():f.on(m,s).triggerHandler(m),d})},function(t,e,i){var n=i(1);n.define("forms",t.exports=function(t,e){function s(){y=t("html").attr("data-wf-site"),m=t(k+" form"),m.length&&m.each(o)}function o(e,i){var n=t(i),s=t.data(i,k);s||(s=t.data(i,k,{form:n})),r(s);var o=n.closest("div.w-form");s.done=o.find("> .w-form-done"),s.fail=o.find("> .w-form-fail");var a=s.action=n.attr("action");return s.handler=null,s.redirect=n.attr("data-redirect"),T.test(a)?void(s.handler=d):a?void 0:y?void(s.handler=p):void C()}function a(){g=!0,w.on("submit",k+" form",function(e){var i=t.data(this,k);i.handler&&(i.evt=e,i.handler(i))})}function r(t){var e=t.btn=t.form.find(':input[type="submit"]');t.wait=t.btn.attr("data-wait")||null,t.success=!1,e.prop("disabled",!1),t.label&&e.val(t.label)}function c(t){var e=t.btn,i=t.wait;e.prop("disabled",!0),i&&(t.label=e.val(),e.val(i))}function l(e,i){var n=null;return i=i||{},e.find(':input:not([type="submit"])').each(function(s,o){var a=t(o),r=a.attr("type"),c=a.attr("data-name")||a.attr("name")||"Field "+(s+1),l=a.val();if("checkbox"===r&&(l=a.is(":checked")),"radio"===r){if(null===i[c]||"string"==typeof i[c])return;l=e.find('input[name="'+a.attr("name")+'"]:checked').val()||null}"string"==typeof l&&(l=t.trim(l)),i[c]=l,n=n||u(a,c,l)}),n}function u(t,e,i){var n=null;return t.attr("required")?(i?(A.test(e)||A.test(t.attr("type")))&&(B.test(i)||(n="Please enter a valid email address for: "+e)):n="Please fill out the required field: "+e,n):null}function p(e){r(e);var i=e.form,s={name:i.attr("data-name")||i.attr("name")||"Untitled Form",source:b.href,test:n.env(),fields:{}};h(e);var o=l(i,s.fields);if(o)return _(o);if(c(e),!y)return void f(e);var a="https://webflow.com/api/v1/form/"+y;x&&a.indexOf("https://webflow.com")>=0&&(a=a.replace("https://webflow.com","http://formdata.webflow.com")),t.ajax({url:a,type:"POST",data:s,dataType:"json",crossDomain:!0}).done(function(){e.success=!0,f(e)}).fail(function(t,i,n){f(e)})}function d(i){r(i);var n=i.form,s={};if(/^https/.test(b.href)&&!/^https/.test(i.action))return void n.attr("method","post");h(i);var o=l(n,s);if(o)return _(o);c(i);var a;e.each(s,function(t,e){A.test(e)&&(s.EMAIL=t),/^((full[ _-]?)?name)$/i.test(e)&&(a=t),/^(first[ _-]?name)$/i.test(e)&&(s.FNAME=t),/^(last[ _-]?name)$/i.test(e)&&(s.LNAME=t)}),a&&!s.FNAME&&(a=a.split(" "),s.FNAME=a[0],s.LNAME=s.LNAME||a[1]);var u=i.action.replace("/post?","/post-json?")+"&c=?",p=u.indexOf("u=")+2;p=u.substring(p,u.indexOf("&",p));var d=u.indexOf("id=")+3;d=u.substring(d,u.indexOf("&",d)),s["b_"+p+"_"+d]="",t.ajax({url:u,data:s,dataType:"jsonp"}).done(function(t){i.success="success"===t.result||/already/.test(t.msg),i.success||console.info("MailChimp error: "+t.msg),f(i)}).fail(function(t,e,n){f(i)})}function f(t){var e=t.form,i=(e.closest("div.w-form"),t.redirect),s=t.success;return s&&i?void n.location(i):(t.done.toggle(s),t.fail.toggle(!s),e.toggle(!s),void r(t))}function h(t){t.evt&&t.evt.preventDefault(),t.evt=null}var v={};i(19);var m,y,g,w=t(document),b=window.location,x=window.XDomainRequest&&!window.atob,k=".w-form",A=/e(\-)?mail/i,B=/^\S+@\S+$/,_=window.alert,T=/list-manage[1-9]?.com/i,C=e.debounce(function(){_("Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.")},100);return v.ready=function(){s(),g||a()},v.preview=v.design=function(){s()},v})},function(t,e,i){"use strict";var n=i(1);n.define("gplus",t.exports=function(t,e){function i(){a.find(".w-widget-gplus").length&&s()}function s(){o=!0,t.getScript("https://apis.google.com/js/plusone.js")}var o,a=t(document),r={};return r.ready=function(){n.env()||o||i()},r})},function(t,e,i){"use strict";var n=i(1),s=i(2);n.define("ix",t.exports=function(t,e){function i(t){t&&(L={},e.each(t,function(t){L[t.slug]=t.value}),o())}function o(){var e=t("[data-ix]");e.length&&(e.each(c),e.each(a),O.length&&(n.scroll.on(l),setTimeout(l,1)),z.length&&n.load(u),E.length&&setTimeout(p,M),s.init(),n.redraw.up())}function a(i,o){var a=t(o),c=a.attr("data-ix"),l=L[c];if(l){var u=l.triggers;u&&(w.style(a,l.style),e.each(u,function(t){function e(){d(t,a,{group:"A"})}function i(){d(t,a,{group:"B"})}var o={},c=t.type,l=t.stepsB&&t.stepsB.length;if("load"===c)return void(t.preload&&!B?z.push(e):E.push(e));if("click"===c)return a.on("click"+x,function(e){n.validClick(e.currentTarget)&&("#"===a.attr("href")&&e.preventDefault(),d(t,a,{group:o.clicked?"B":"A"}),l&&(o.clicked=!o.clicked))}),void(C=C.add(a));if("hover"===c)return a.on("mouseenter"+x,e),a.on("mouseleave"+x,i),void(C=C.add(a));if("scroll"===c)return void O.push({el:a,trigger:t,state:{active:!1},offsetTop:r(t.offsetTop),offsetBot:r(t.offsetBot)});var u=S[c];if(u){var p=a.closest(u);return p.on(s.types.INTRO,e).on(s.types.OUTRO,i),void(C=C.add(p))}}))}}function r(t){if(!t)return 0;t=String(t);var e=parseInt(t,10);return e!==e?0:(t.indexOf("%")>0&&(e/=100,e>=1&&(e=.999)),e)}function c(e,i){t(i).off(x)}function l(){for(var t=b.scrollTop(),e=b.height(),i=O.length,n=0;i>n;n++){
var s=O[n],o=s.el,a=s.trigger,r=a.stepsB&&a.stepsB.length,c=s.state,l=o.offset().top,u=o.outerHeight(),p=s.offsetTop,f=s.offsetBot;1>p&&p>0&&(p*=e),1>f&&f>0&&(f*=e);var h=l+u-p>=t&&t+e>=l+f;h!==c.active&&(h!==!1||r)&&(c.active=h,d(a,o,{group:h?"A":"B"}))}}function u(){for(var t=z.length,e=0;t>e;e++)z[e]()}function p(){for(var t=E.length,e=0;t>e;e++)E[e]()}function d(e,i,n,s){function o(){return c?d(e,i,n,!0):("auto"===h.width&&p.set({width:"auto"}),"auto"===h.height&&p.set({height:"auto"}),void(a&&a()))}n=n||{};var a=n.done;if(!y||n.force){var r=n.group||"A",c=e["loop"+r],l=e["steps"+r];if(l&&l.length){if(l.length<2&&(c=!1),!s){var u=e.selector;u&&(i=e.descend?i.find(u):e.siblings?i.siblings(u):t(u),B&&i.attr("data-ix-affect",1)),_&&i.addClass("w-ix-emptyfix"),e.preserve3d&&i.css("transform-style","preserve-3d")}for(var p=k(i),h={},v=0;v<l.length;v++)f(p,l[v],h);h.start?p.then(o):o()}}}function f(t,e,i){var s="add",o="start";i.start&&(s=o="then");var a=e.transition;if(a){a=a.split(",");for(var r=0;r<a.length;r++){var c=a[r];t[s](c)}}var l=m(e)||{};if(null!=l.width&&(i.width=l.width),null!=l.height&&(i.height=l.height),null==a){i.start?t.then(function(){var e=this.queue;this.set(l),l.display&&(t.redraw(),n.redraw.up()),this.queue=e,this.next()}):(t.set(l),l.display&&(t.redraw(),n.redraw.up()));var u=l.wait;null!=u&&(t.wait(u),i.start=!0)}else{if(l.display){var p=l.display;delete l.display,i.start?t.then(function(){var t=this.queue;this.set({display:p}).redraw(),n.redraw.up(),this.queue=t,this.next()}):(t.set({display:p}).redraw(),n.redraw.up())}t[o](l),i.start=!0}}function h(t,e){var i=k(t);t.css("transition","");var n=t.css("transition");n===T&&(n=i.upstream=null),i.upstream=T,i.set(m(e)),i.upstream=n}function v(t,e){k(t).set(m(e))}function m(t){var e={},i=!1;for(var n in t)"transition"!==n&&(e[n]=t[n],i=!0);return i?e:null}var y,g,w={},b=t(window),x=".w-ix",k=t.tram,A=n.env,B=A(),_=A.chrome&&A.chrome<35,T="none 0s ease 0s",C=t(),L={},O=[],z=[],E=[],M=1,S={tabs:".w-tab-link, .w-tab-pane",dropdown:".w-dropdown",slider:".w-slide",navbar:".w-nav"};return w.init=function(t){setTimeout(function(){i(t)},1)},w.preview=function(){y=!1,M=100,setTimeout(function(){i(window.__wf_ix)},1)},w.design=function(){y=!0,w.destroy()},w.destroy=function(){g=!0,C.each(c),n.scroll.off(l),s.async(),O=[],z=[],E=[]},w.ready=function(){L&&g&&(g=!1,o())},w.run=d,w.style=B?h:v,w})},function(t,e,i){"use strict";function n(t,e,i){function n(t,e){return T=k(t)?t:[t],w||n.build(),T.length>1&&(w.items=w.empty,T.forEach(function(t){var e=m("thumbnail"),i=m("item").append(e);w.items=w.items.add(i),c(t.thumbnailUrl||t.url,function(t){t.prop("width")>t.prop("height")?f(t,"wide"):f(t,"tall"),e.append(f(t,"thumbnail-image"))})}),w.strip.empty().append(w.items),f(w.content,"group")),x(h(w.lightbox,"hide").focus()).add("opacity .3s").start({opacity:1}),f(w.html,"noscroll"),n.show(e||0)}function s(t){return function(e){this===e.target&&(e.stopPropagation(),e.preventDefault(),t())}}function o(t){t.preventDefault()}function a(t){var e=t.keyCode;27===e?n.hide():37===e?n.prev():39===e&&n.next()}function r(){w&&(h(w.html,"noscroll"),f(w.lightbox,"hide"),w.strip.empty(),w.view&&w.view.remove(),h(w.content,"group"),f(w.arrowLeft,"inactive"),f(w.arrowRight,"inactive"),g=w.view=void 0)}function c(t,e){var i=m("img","img");return i.one("load",function(){e(i)}),i.attr("src",t),i}function l(t){return function(){t.remove()}}function u(t,e,i){this.$element=t,this.className=e,this.delay=i||200,this.hide()}function p(t,e){return t.replace(_,(e?" .":" ")+B)}function d(t){return p(t,!0)}function f(t,e){return t.addClass(p(e))}function h(t,e){return t.removeClass(p(e))}function v(t,e,i){return t.toggleClass(p(e),i)}function m(t,n){return f(i(e.createElement(n||"div")),t)}function y(t,e){var i='<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+e+'"/>';return"data:image/svg+xml;charset=utf-8,"+encodeURI(i)}var g,w,b,x=i.tram,k=Array.isArray,A="w-lightbox",B=A+"-",_=/(^|\s+)/g,T=[];n.build=function(){return n.destroy(),w={html:i(e.documentElement),empty:i()},w.arrowLeft=m("control left inactive"),w.arrowRight=m("control right inactive"),w.close=m("control close"),w.spinner=m("spinner"),w.strip=m("strip"),b=new u(w.spinner,p("hide")),w.content=m("content").append(w.spinner,w.arrowLeft,w.arrowRight,w.close),w.container=m("container").append(w.content,w.strip),w.lightbox=m("backdrop hide").append(w.container),w.strip.on("tap",d("item"),z),w.content.on("swipe",E).on("tap",d("left"),C).on("tap",d("right"),L).on("tap",d("close"),O).on("tap",d("image, caption"),L),w.container.on("tap",d("view, strip"),O).on("dragstart",d("img"),o),w.lightbox.on("keydown",a).on("focusin",M),i("body").append(w.lightbox.prop("tabIndex",0)),n},n.destroy=function(){w&&(h(w.html,"noscroll"),w.lightbox.remove(),w=void 0)},n.show=function(t){if(t!==g){var e=T[t];if(!e)return n.hide();var s=g;g=t,b.show();var o=e.html&&y(e.width,e.height)||e.url;return c(o,function(n){function o(){return b.hide(),t!==g?void p.remove():(v(w.arrowLeft,"inactive",0>=t),v(w.arrowRight,"inactive",t>=T.length-1),w.view?(x(w.view).add("opacity .3s").start({opacity:0}).then(l(w.view)),x(p).add("opacity .3s").add("transform .3s").set({x:t>s?"80px":"-80px"}).start({opacity:1,x:0})):p.css("opacity",1),w.view=p,void(w.items&&f(h(w.items,"active").eq(t),"active")))}if(t===g){var a,r,c=m("figure","figure").append(f(n,"image")),u=m("frame").append(c),p=m("view").append(u);e.html&&(a=i(e.html),r=a.is("iframe"),r&&a.on("load",o),c.append(f(a,"embed"))),e.caption&&c.append(m("caption","figcaption").text(e.caption)),w.spinner.before(p),r||o()}}),n}},n.hide=function(){return x(w.lightbox).add("opacity .3s").start({opacity:0}).then(r),n},n.prev=function(){g>0&&n.show(g-1)},n.next=function(){g<T.length-1&&n.show(g+1)};var C=s(n.prev),L=s(n.next),O=s(n.hide),z=function(t){var e=i(this).index();t.preventDefault(),n.show(e)},E=function(t,e){t.preventDefault(),"left"===e.direction?n.next():"right"===e.direction&&n.prev()},M=function(){this.focus()};return u.prototype.show=function(){var t=this;t.timeoutId||(t.timeoutId=setTimeout(function(){t.$element.removeClass(t.className),delete t.timeoutId},t.delay))},u.prototype.hide=function(){var t=this;return t.timeoutId?(clearTimeout(t.timeoutId),void delete t.timeoutId):void t.$element.addClass(t.className)},function(){function i(){var e=t.innerHeight,i=t.innerWidth,n=".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:"+e+"px}.w-lightbox-view {width:"+i+"px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:"+.86*e+"px}.w-lightbox-image {max-width:"+i+"px;max-height:"+e+"px}.w-lightbox-group .w-lightbox-image {max-height:"+.86*e+"px}.w-lightbox-strip {padding: 0 "+.01*e+"px}.w-lightbox-item {width:"+.1*e+"px;padding:"+.02*e+"px "+.01*e+"px}.w-lightbox-thumbnail {height:"+.1*e+"px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:"+.96*e+"px}.w-lightbox-content {margin-top:"+.02*e+"px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:"+.84*e+"px}.w-lightbox-image {max-width:"+.96*i+"px;max-height:"+.96*e+"px}.w-lightbox-group .w-lightbox-image {max-width:"+.823*i+"px;max-height:"+.84*e+"px}}";r.textContent=n}var n=t.navigator.userAgent,s=/(iPhone|iPad|iPod);[^OS]*OS (\d)/,o=n.match(s),a=n.indexOf("Android ")>-1&&-1===n.indexOf("Chrome");if(a||o&&!(o[2]>7)){var r=e.createElement("style");e.head.appendChild(r),t.addEventListener("orientationchange",i,!0),i()}}(),n}var s=i(1);s.define("lightbox",t.exports=function(t,e){function i(){u=v&&s.env("design"),c=t(document.body),f.destroy(),p={},l=h.find(m),l.webflowLightBox()}function o(t){var e,i,n=t.el.children(".w-json").html();if(!n)return void(t.items=[]);try{n=JSON.parse(n)}catch(s){console.error("Malformed lightbox JSON configuration.",s)}r(n),e=n.group,e?(i=p[e],i||(i=p[e]=[]),t.items=i,n.items.length&&(t.index=i.length,i.push.apply(i,n.items))):t.items=n.items}function a(t){return function(){t.items.length&&f(t.items,t.index||0)}}function r(t){t.images&&(t.images.forEach(function(t){t.type="image"}),t.items=t.images),t.embed&&(t.embed.type="video",t.items=[t.embed]),t.groupId&&(t.group=t.groupId)}var c,l,u,p,d={},f=n(window,document,t),h=t(document),v=s.env(),m=".w-lightbox";return d.ready=d.design=d.preview=i,jQuery.fn.extend({webflowLightBox:function(){var e=this;t.each(e,function(e,i){var n=t.data(i,m);n||(n=t.data(i,m,{el:t(i),mode:"images",images:[],embed:""})),n.el.off(m),o(n),u?n.el.on("setting"+m,o.bind(null,n)):n.el.on("tap"+m,a(n)).on("click"+m,function(t){t.preventDefault()})})}}),d})},function(t,e,i){"use strict";var n=i(1);n.define("links",t.exports=function(t,e){function i(){r=d&&n.env("design"),l=n.env("slug")||f.pathname||"",n.scroll.off(o),c=[];for(var t=document.links,e=0;e<t.length;++e)s(t[e]);c.length&&(n.scroll.on(o),o())}function s(e){var i=r&&e.getAttribute("href-disabled")||e.getAttribute("href");if(h.href=i,!(i.indexOf(":")>=0)){var n=t(e);if(0===i.indexOf("#")&&m.test(i)){var s=t(i);return void(s.length&&c.push({link:n,sec:s,active:!1}))}if("#"!==i){var o=h.href===f.href||i===l||y.test(i)&&g.test(l);a(n,v,o)}}}function o(){var t=p.scrollTop(),i=p.height();e.each(c,function(e){var n=e.link,s=e.sec,o=s.offset().top,c=s.outerHeight(),l=.5*i,u=s.is(":visible")&&o+c-l>=t&&t+i>=o+l;e.active!==u&&(e.active=u,a(n,v,u),r&&(n[0].__wf_current=u))})}function a(t,e,i){var n=t.hasClass(e);i&&n||(i||n)&&(i?t.addClass(e):t.removeClass(e))}var r,c,l,u={},p=t(window),d=n.env(),f=window.location,h=document.createElement("a"),v="w--current",m=/^#[a-zA-Z][\w:.-]*$/,y=/index\.(html|php)$/,g=/\/$/;return u.ready=u.design=u.preview=i,u})},function(t,e,i){"use strict";var n=i(1);n.define("maps",t.exports=function(t,e){function i(){p.length&&n.app&&p.each(n.app.redrawElement)}function s(){function e(){window._wf_maps_loaded=function(){},h=window.google,p.each(r),o(),a()}p=f.find(v),p.length&&(null===h?(t.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=_wf_maps_loaded"),window._wf_maps_loaded=e):e())}function o(){n.resize.off(c),n.redraw.off(c)}function a(){n.resize.on(c),n.redraw.on(c)}function r(e,i){var n=t(i).data();u(i,n)}function c(){p.each(l)}function l(t,e){var i=u(e);h.maps.event.trigger(i.map,"resize"),i.setMapPosition()}function u(e,i){var s=t.data(e,m);if(s)return s;var o=t(e);s=t.data(e,m,{latLng:"51.511214,-0.119824",tooltip:"",style:"roadmap",zoom:12,marker:new h.maps.Marker({draggable:!1}),infowindow:new h.maps.InfoWindow({disableAutoPan:!0})});var a=i.widgetLatlng||s.latLng;s.latLng=a;var r=a.split(","),c=new h.maps.LatLng(r[0],r[1]);s.latLngObj=c;var l=!n.env.touch||!i.disableTouch;s.map=new h.maps.Map(e,{center:s.latLngObj,zoom:s.zoom,maxZoom:18,mapTypeControl:!1,panControl:!1,streetViewControl:!1,scrollwheel:!i.disableScroll,draggable:l,zoomControl:!0,zoomControlOptions:{style:h.maps.ZoomControlStyle.SMALL},mapTypeId:s.style}),s.marker.setMap(s.map),s.setMapPosition=function(){s.map.setCenter(s.latLngObj);var t=0,e=0,i=o.css(["paddingTop","paddingRight","paddingBottom","paddingLeft"]);t-=parseInt(i.paddingLeft,10),t+=parseInt(i.paddingRight,10),e-=parseInt(i.paddingTop,10),e+=parseInt(i.paddingBottom,10),(t||e)&&s.map.panBy(t,e),o.css("position","")},h.maps.event.addListener(s.map,"tilesloaded",function(){h.maps.event.clearListeners(s.map,"tilesloaded"),s.setMapPosition()}),s.setMapPosition(),s.marker.setPosition(s.latLngObj),s.infowindow.setPosition(s.latLngObj);var u=i.widgetTooltip;u&&(s.tooltip=u,s.infowindow.setContent(u),s.infowindowOpen||(s.infowindow.open(s.map,s.marker),s.infowindowOpen=!0));var p=i.widgetStyle;p&&s.map.setMapTypeId(p);var d=i.widgetZoom;return null!=d&&(s.zoom=d,s.map.setZoom(+d)),h.maps.event.addListener(s.marker,"click",function(){window.open("https://maps.google.com/?z="+s.zoom+"&daddr="+s.latLng)}),s}var p,d={},f=t(document),h=null,v=".w-widget-map";d.ready=function(){n.env()||s()},d.preview=function(){p=f.find(v),n.resize.off(i),p.length&&(n.resize.on(i),i())},d.design=function(t){p=f.find(v),n.resize.off(i),p.length&&e.defer(i)},d.destroy=o;var m="w-widget-map";return d})},function(t,e,i){"use strict";var n=i(1),s=i(2);n.define("navbar",t.exports=function(t,e){function i(){B=O&&n.env("design"),k=t(document.body),A=L.find(E),A.length&&(A.each(c),o(),a())}function o(){n.resize.off(r)}function a(){n.resize.on(r)}function r(){A.each(y)}function c(e,i){var n=t(i),s=t.data(i,E);s||(s=t.data(i,E,{open:!1,el:n,config:{}})),s.menu=n.find(".w-nav-menu"),s.links=s.menu.find(".w-nav-link"),s.dropdowns=s.menu.find(".w-dropdown"),s.button=n.find(".w-nav-button"),s.container=n.find(".w-container"),s.outside=m(s),s.el.off(E),s.button.off(E),s.menu.off(E),p(s),B?(l(s),s.el.on("setting"+E,d(s))):(u(s),s.button.on("tap"+E,h(s)),s.menu.on("click"+E,"a",v(s))),y(e,i)}function l(t){t.overlay&&(x(t,!0),t.overlay.remove(),t.overlay=null)}function u(e){e.overlay||(e.overlay=t(z).appendTo(e.el),e.parent=e.menu.parent(),x(e,!0))}function p(t){var i={},n=t.config||{},s=i.animation=t.el.attr("data-animation")||"default";i.animOver=/^over/.test(s),i.animDirect=/left$/.test(s)?-1:1,n.animation!==s&&t.open&&e.defer(f,t),i.easing=t.el.attr("data-easing")||"ease",i.easing2=t.el.attr("data-easing2")||"ease";var o=t.el.attr("data-duration");i.duration=null!=o?+o:400,i.docHeight=t.el.attr("data-doc-height"),t.config=i}function d(t){return function(i,n){n=n||{};var s=C.width();p(t),n.open===!0&&w(t,!0),n.open===!1&&x(t,!0),t.open&&e.defer(function(){s!==C.width()&&f(t)})}}function f(t){t.open&&(x(t,!0),w(t,!0))}function h(t){return e.debounce(function(e){t.open?x(t):w(t)})}function v(e){return function(i){var s=t(this),o=s.attr("href");return n.validClick(i.currentTarget)?void(o&&0===o.indexOf("#")&&e.open&&x(e)):void i.preventDefault()}}function m(i){return i.outside&&L.off("tap"+E,i.outside),e.debounce(function(e){if(i.open){var n=t(e.target).closest(".w-nav-menu");i.menu.is(n)||x(i)}})}function y(e,i){var n=t.data(i,E),s=n.collapsed="none"!==n.button.css("display");if(!n.open||s||B||x(n,!0),n.container.length){var o=g(n);n.links.each(o),n.dropdowns.each(o)}n.open&&b(n)}function g(e){var i=e.container.css($);return"none"===i&&(i=""),function(e,n){n=t(n),n.css($,""),"none"===n.css($)&&n.css($,i)}}function w(t,e){if(!t.open){t.open=!0,t.menu.addClass(S),t.links.addClass(j),t.button.addClass(M);var i=t.config,s=i.animation;"none"!==s&&T.support.transform||(e=!0);var o=b(t),a=t.menu.outerHeight(!0),r=t.menu.outerWidth(!0),c=t.el.height(),l=t.el[0];if(y(0,l),I.intro(0,l),n.redraw.up(),B||L.on("tap"+E,t.outside),!e){var u="transform "+i.duration+"ms "+i.easing;if(t.overlay&&t.overlay.show().append(t.menu),i.animOver)return T(t.menu).add(u).set({x:i.animDirect*r,height:o}).start({x:0}),void(t.overlay&&t.overlay.width(r));var p=c+a;T(t.menu).add(u).set({y:-p}).start({y:0})}}}function b(t){var e=t.config,i=e.docHeight?L.height():k.height();return e.animOver?t.menu.height(i):"fixed"!==t.el.css("position")&&(i-=t.el.height()),t.overlay&&t.overlay.height(i),i}function x(t,e){function i(){t.menu.height(""),T(t.menu).set({x:0,y:0}),t.menu.removeClass(S),t.links.removeClass(j),t.overlay&&t.overlay.children().length&&(t.menu.appendTo(t.parent),t.overlay.attr("style","").hide()),t.el.triggerHandler("w-close")}if(t.open){t.open=!1,t.button.removeClass(M);var n=t.config;"none"!==n.animation&&T.support.transform||(e=!0);n.animation;if(I.outro(0,t.el[0]),L.off("tap"+E,t.outside),e)return T(t.menu).stop(),void i();var s="transform "+n.duration+"ms "+n.easing2,o=t.menu.outerHeight(!0),a=t.menu.outerWidth(!0),r=t.el.height();if(n.animOver)return void T(t.menu).add(s).start({x:a*n.animDirect}).then(i);var c=r+o;T(t.menu).add(s).start({y:-c}).then(i)}}var k,A,B,_={},T=t.tram,C=t(window),L=t(document),O=n.env(),z='<div class="w-nav-overlay" data-wf-ignore />',E=".w-nav",M="w--open",S="w--nav-menu-open",j="w--nav-link-open",I=s.triggers;_.ready=_.design=_.preview=i,_.destroy=o;var $="max-width";return _})},function(t,e,i){"use strict";var n=i(1);n.define("scroll",t.exports=function(t,e){function i(){try{return!!u.frameElement}catch(t){return!0}}function s(){p.hash&&o(p.hash.substring(1));var e=p.href.split("#")[0];l.on("click","a",function(i){if(!(n.env("design")||window.$.mobile&&t(i.currentTarget).hasClass("ui-link"))){if("#"===this.getAttribute("href"))return void i.preventDefault();var s=this.href.split("#"),a=s[0]===e?s[1]:null;a&&o(a,i)}})}function o(e,i){if(f.test(e)){var s=t("#"+e);if(s.length){if(i&&(i.preventDefault(),i.stopPropagation()),p.hash!==e&&d&&d.pushState&&(!n.env.chrome||"file:"!==p.protocol)){var o=d.state&&d.state.hash;o!==e&&d.pushState({hash:e},"","#"+e)}var r=n.env("editor")?".w-editor-body":"body",c=t("header, "+r+" > .header, "+r+" > .w-nav:not([data-no-scroll])"),l="fixed"===c.css("position")?c.outerHeight():0;u.setTimeout(function(){a(s,l)},i?0:300)}}}function a(e,i){var n=t(u).scrollTop(),s=e.offset().top-i;if("mid"===e.data("scroll")){var o=t(u).height()-i,a=e.outerHeight();o>a&&(s-=Math.round((o-a)/2))}var c=1;t("body").add(e).each(function(e){var i=parseFloat(t(this).attr("data-scroll-time"),10);!isNaN(i)&&(0===i||i>0)&&(c=i)}),Date.now||(Date.now=function(){return(new Date).getTime()});var l=Date.now(),p=u.requestAnimationFrame||u.mozRequestAnimationFrame||u.webkitRequestAnimationFrame||function(t){u.setTimeout(t,15)},d=(472.143*Math.log(Math.abs(n-s)+125)-2e3)*c,f=function(){var t=Date.now()-l;u.scroll(0,r(n,s,t,d)),d>=t&&p(f)};f()}function r(t,e,i,n){return i>n?e:t+(e-t)*c(i/n)}function c(t){return.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1}var l=t(document),u=window,p=u.location,d=i()?null:u.history,f=/^[a-zA-Z0-9][\w:.-]*$/;return{ready:s}})},function(t,e,i){"use strict";var n=i(1),s=i(2);n.define("slider",t.exports=function(t,e){function i(){k=L.find(z),k.length&&(k.filter(":visible").each(c),_=null,B||(o(),a()))}function o(){n.resize.off(r),n.redraw.off(T.redraw)}function a(){n.resize.on(r),n.redraw.on(T.redraw)}function r(){k.filter(":visible").each(y)}function c(e,i){var n=t(i),s=t.data(i,z);return s||(s=t.data(i,z,{index:0,depth:1,el:n,config:{}})),s.mask=n.children(".w-slider-mask"),s.left=n.children(".w-slider-arrow-left"),s.right=n.children(".w-slider-arrow-right"),s.nav=n.children(".w-slider-nav"),s.slides=s.mask.children(".w-slide"),s.slides.each(M.reset),_&&(s.maskWidth=0),C.support.transform?(s.el.off(z),s.left.off(z),s.right.off(z),s.nav.off(z),l(s),A?(s.el.on("setting"+z,v(s)),h(s),s.hasTimer=!1):(s.el.on("swipe"+z,v(s)),s.left.on("tap"+z,u(s)),s.right.on("tap"+z,p(s)),s.config.autoplay&&!s.hasTimer&&(s.hasTimer=!0,s.timerCount=1,f(s))),s.nav.on("tap"+z,"> div",v(s)),O||s.mask.contents().filter(function(){return 3===this.nodeType}).remove(),void y(e,i)):(s.left.hide(),s.right.hide(),s.nav.hide(),void(B=!0))}function l(t){var e={};e.crossOver=0,e.animation=t.el.attr("data-animation")||"slide","outin"===e.animation&&(e.animation="cross",e.crossOver=.5),e.easing=t.el.attr("data-easing")||"ease";var i=t.el.attr("data-duration");if(e.duration=null!=i?+i:500,+t.el.attr("data-infinite")&&(e.infinite=!0),+t.el.attr("data-disable-swipe")&&(e.disableSwipe=!0),+t.el.attr("data-hide-arrows")?e.hideArrows=!0:t.config.hideArrows&&(t.left.show(),t.right.show()),+t.el.attr("data-autoplay")){e.autoplay=!0,e.delay=+t.el.attr("data-delay")||2e3,e.timerMax=+t.el.attr("data-autoplay-limit");var n="mousedown"+z+" touchstart"+z;A||t.el.off(n).one(n,function(){h(t)})}var s=t.right.width();e.edge=s?s+40:100,t.config=e}function u(t){return function(e){m(t,{index:t.index-1,vector:-1})}}function p(t){return function(e){m(t,{index:t.index+1,vector:1})}}function d(n,s){var o=null;s===n.slides.length&&(i(),g(n)),e.each(n.anchors,function(e,i){t(e.els).each(function(e,n){t(n).index()===s&&(o=i)})}),null!=o&&m(n,{index:o,immediate:!0})}function f(t){h(t);var e=t.config,i=e.timerMax;i&&t.timerCount++>i||(t.timerId=window.setTimeout(function(){null==t.timerId||A||(p(t)(),f(t))},e.delay))}function h(t){window.clearTimeout(t.timerId),t.timerId=null}function v(e){return function(i,s){s=s||{};var o=e.config;if(A&&"setting"===i.type){if("prev"===s.select)return u(e)();if("next"===s.select)return p(e)();if(l(e),g(e),null==s.select)return;return void d(e,s.select)}if("swipe"!==i.type)e.nav.has(i.target).length&&m(e,{index:t(i.target).index()});else{if(o.disableSwipe)return;if(n.env("editor"))return;if("left"===s.direction)return p(e)();if("right"===s.direction)return u(e)()}}}function m(e,i){function n(){d=t(o[e.index].els),h=e.slides.not(d),"slide"!==v&&(p.visibility="hidden"),C(h).set(p)}i=i||{};var s=e.config,o=e.anchors;e.previous=e.index;var a=i.index,r={};0>a?(a=o.length-1,s.infinite&&(r.x=-e.endX,r.from=0,r.to=o[0].width)):a>=o.length&&(a=0,s.infinite&&(r.x=o[o.length-1].width,r.from=-o[o.length-1].x,r.to=r.from-r.x)),e.index=a;var c=e.nav.children().eq(e.index).addClass("w-active");e.nav.children().not(c).removeClass("w-active"),s.hideArrows&&(e.index===o.length-1?e.right.hide():e.right.show(),0===e.index?e.left.hide():e.left.show());var l=e.offsetX||0,u=e.offsetX=-o[e.index].x,p={x:u,opacity:1,visibility:""},d=t(o[e.index].els),f=t(o[e.previous]&&o[e.previous].els),h=e.slides.not(d),v=s.animation,m=s.easing,y=Math.round(s.duration),g=i.vector||(e.index>e.previous?1:-1),w="opacity "+y+"ms "+m,b="transform "+y+"ms "+m;if(A||(d.each(M.intro),h.each(M.outro)),i.immediate&&!_)return C(d).set(p),void n();if(e.index!==e.previous){if("cross"===v){var x=Math.round(y-y*s.crossOver),k=Math.round(y-x);return w="opacity "+x+"ms "+m,C(f).set({visibility:""}).add(w).start({opacity:0}),void C(d).set({visibility:"",x:u,opacity:0,zIndex:e.depth++}).add(w).wait(k).then({opacity:1}).then(n)}return"fade"===v?(C(f).set({visibility:""}).stop(),void C(d).set({visibility:"",x:u,opacity:0,zIndex:e.depth++}).add(w).start({opacity:1}).then(n)):"over"===v?(p={x:e.endX},C(f).set({visibility:""}).stop(),void C(d).set({visibility:"",zIndex:e.depth++,x:u+o[e.index].width*g}).add(b).start({x:u}).then(n)):void(s.infinite&&r.x?(C(e.slides.not(f)).set({visibility:"",x:r.x}).add(b).start({x:u}),C(f).set({visibility:"",x:r.from}).add(b).start({x:r.to}),e.shifted=f):(s.infinite&&e.shifted&&(C(e.shifted).set({visibility:"",x:l}),e.shifted=null),C(e.slides).set({visibility:""}).add(b).start({x:u})))}}function y(e,i){var n=t.data(i,z);return b(n)?g(n):void(A&&x(n)&&g(n))}function g(e){var i=1,n=0,s=0,o=0,a=e.maskWidth,r=a-e.config.edge;0>r&&(r=0),e.anchors=[{els:[],x:0,width:0}],e.slides.each(function(c,l){s-n>r&&(i++,n+=a,e.anchors[i-1]={els:[],x:s,width:0}),o=t(l).outerWidth(!0),s+=o,e.anchors[i-1].width+=o,e.anchors[i-1].els.push(l)}),e.endX=s,A&&(e.pages=null),e.nav.length&&e.pages!==i&&(e.pages=i,w(e));var c=e.index;c>=i&&(c=i-1),m(e,{immediate:!0,index:c})}function w(e){var i,n=[],s=e.el.attr("data-nav-spacing");s&&(s=parseFloat(s)+"px");for(var o=0;o<e.pages;o++)i=t(E),e.nav.hasClass("w-num")&&i.text(o+1),null!=s&&i.css({"margin-left":s,"margin-right":s}),n.push(i);e.nav.empty().append(n)}function b(t){var e=t.mask.width();return t.maskWidth!==e?(t.maskWidth=e,!0):!1}function x(e){var i=0;return e.slides.each(function(e,n){i+=t(n).outerWidth(!0)}),e.slidesWidth!==i?(e.slidesWidth=i,!0):!1}var k,A,B,_,T={},C=t.tram,L=t(document),O=n.env(),z=".w-slider",E='<div class="w-slider-dot" data-wf-ignore />',M=s.triggers;return T.ready=function(){i()},T.design=function(){A=!0,i()},T.preview=function(){A=!1,i()},T.redraw=function(){_=!0,i()},T.destroy=o,T})},function(t,e,i){"use strict";var n=i(1),s=i(2);n.define("tabs",t.exports=function(t,e){function i(){f=b&&n.env("design"),d=y.find(k),d.length&&(d.each(c),n.env("preview")&&d.each(r),h=null,o(),a())}function o(){n.redraw.off(v.redraw)}function a(){n.redraw.on(v.redraw)}function r(e,i){var n=(t(i),t.data(i,k));n&&(n.links&&n.links.each(_.reset),n.panes&&n.panes.each(_.reset))}function c(e,i){var n=t(i),s=t.data(i,k);if(s||(s=t.data(i,k,{el:n,config:{}})),s.current=null,s.menu=n.children(".w-tab-menu"),s.links=s.menu.children(".w-tab-link"),s.content=n.children(".w-tab-content"),s.panes=s.content.children(".w-tab-pane"),s.el.off(k),s.links.off(k),l(s),!f){s.links.on("click"+k,u(s));var o=s.links.filter("."+A),a=o.attr(x);a&&p(s,{tab:a,immediate:!0})}}function l(t){var e={};t.config||{};e.easing=t.el.attr("data-easing")||"ease";var i=+t.el.attr("data-duration-in");i=e.intro=i===i?i:0;var n=+t.el.attr("data-duration-out");n=e.outro=n===n?n:0,e.immediate=!i&&!n,t.config=e}function u(t){return function(e){var i=e.currentTarget.getAttribute(x);i&&p(t,{tab:i})}}function p(e,i){function s(){return p.removeClass(B).removeAttr("style"),u.addClass(B).each(_.intro),n.redraw.up(),o.intro?void m(u).set({opacity:0}).redraw().add("opacity "+o.intro+"ms "+a,{fallback:w}).start({opacity:1}):m(u).set({opacity:1})}i=i||{};var o=e.config,a=o.easing,r=i.tab;if(r!==e.current){e.current=r,e.links.each(function(e,i){var n=t(i);i.getAttribute(x)===r?n.addClass(A).each(_.intro):n.hasClass(A)&&n.removeClass(A).each(_.outro)});var c=[],l=[];e.panes.each(function(e,i){var n=t(i);i.getAttribute(x)===r?c.push(i):n.hasClass(B)&&l.push(i)});var u=t(c),p=t(l);return i.immediate||o.immediate?(u.addClass(B).each(_.intro),p.removeClass(B),void(h||n.redraw.up())):void(p.length&&o.outro?(p.each(_.outro),m(p).add("opacity "+o.outro+"ms "+a,{fallback:w}).start({opacity:0}).then(s)):s())}}var d,f,h,v={},m=t.tram,y=(t(window),t(document)),g=n.env,w=g.safari,b=g(),x="data-w-tab",k=".w-tabs",A="w--current",B="w--tab-active",_=s.triggers;return v.ready=v.design=v.preview=i,v.redraw=function(){h=!0,i()},v.destroy=function(){d=y.find(k),d.length&&(d.each(r),o())},v})},function(t,e,i){"use strict";var n=i(1);n.define("touch",t.exports=function(t,e){function i(t){function e(t){var e=t.touches;e&&e.length>1||(p=!0,d=!1,e?(f=!0,c=e[0].clientX,l=e[0].clientY):(c=t.clientX,l=t.clientY),u=c)}function i(t){if(p){if(f&&"mousemove"===t.type)return t.preventDefault(),void t.stopPropagation();var e=t.touches,i=e?e[0].clientX:t.clientX,s=e?e[0].clientY:t.clientY,r=i-u;u=i,Math.abs(r)>h&&a&&a()+""==""&&(n("swipe",t,{direction:r>0?"right":"left"}),o()),(Math.abs(i-c)>10||Math.abs(s-l)>10)&&(d=!0)}}function s(t){return p?(p=!1,f&&"mouseup"===t.type?(t.preventDefault(),t.stopPropagation(),void(f=!1)):void(d||n("tap",t))):void 0}function o(t){p=!1}function r(){t.removeEventListener("touchstart",e,!1),t.removeEventListener("touchmove",i,!1),t.removeEventListener("touchend",s,!1),t.removeEventListener("touchcancel",o,!1),t.removeEventListener("mousedown",e,!1),t.removeEventListener("mousemove",i,!1),t.removeEventListener("mouseup",s,!1),t.removeEventListener("mouseout",o,!1),t=null}var c,l,u,p=!1,d=!1,f=!1,h=Math.min(Math.round(.04*window.innerWidth),40);t.addEventListener("touchstart",e,!1),t.addEventListener("touchmove",i,!1),t.addEventListener("touchend",s,!1),t.addEventListener("touchcancel",o,!1),t.addEventListener("mousedown",e,!1),t.addEventListener("mousemove",i,!1),t.addEventListener("mouseup",s,!1),t.addEventListener("mouseout",o,!1),this.destroy=r}function n(e,i,n){var s=t.Event(e,{originalEvent:i});t(i.target).trigger(s,n)}var s={},o=!document.addEventListener,a=window.getSelection;return o&&(t.event.special.tap={bindType:"click",delegateType:"click"}),s.init=function(e){return o?null:(e="string"==typeof e?t(e).get(0):e,e?new i(e):null)},s.instance=s.init(document),s})},function(t,e,i){"use strict";var n=window.$,s=i(3)&&n.tram;t.exports=function(){var t={};t.VERSION="1.6.0-Webflow";var e={},i=Array.prototype,n=Object.prototype,o=Function.prototype,a=(i.push,i.slice),r=(i.concat,n.toString,n.hasOwnProperty),c=i.forEach,l=i.map,u=(i.reduce,i.reduceRight,i.filter),p=(i.every,i.some),d=i.indexOf,f=(i.lastIndexOf,Array.isArray,Object.keys),h=(o.bind,t.each=t.forEach=function(i,n,s){if(null==i)return i;if(c&&i.forEach===c)i.forEach(n,s);else if(i.length===+i.length){for(var o=0,a=i.length;a>o;o++)if(n.call(s,i[o],o,i)===e)return}else for(var r=t.keys(i),o=0,a=r.length;a>o;o++)if(n.call(s,i[r[o]],r[o],i)===e)return;return i});t.map=t.collect=function(t,e,i){var n=[];return null==t?n:l&&t.map===l?t.map(e,i):(h(t,function(t,s,o){n.push(e.call(i,t,s,o))}),n)},t.find=t.detect=function(t,e,i){var n;return v(t,function(t,s,o){return e.call(i,t,s,o)?(n=t,!0):void 0}),n},t.filter=t.select=function(t,e,i){var n=[];return null==t?n:u&&t.filter===u?t.filter(e,i):(h(t,function(t,s,o){e.call(i,t,s,o)&&n.push(t)}),n)};var v=t.some=t.any=function(i,n,s){n||(n=t.identity);var o=!1;return null==i?o:p&&i.some===p?i.some(n,s):(h(i,function(t,i,a){return o||(o=n.call(s,t,i,a))?e:void 0}),!!o)};t.contains=t.include=function(t,e){return null==t?!1:d&&t.indexOf===d?-1!=t.indexOf(e):v(t,function(t){return t===e})},t.delay=function(t,e){var i=a.call(arguments,2);return setTimeout(function(){return t.apply(null,i)},e)},t.defer=function(e){return t.delay.apply(t,[e,1].concat(a.call(arguments,1)))},t.throttle=function(t){var e,i,n;return function(){e||(e=!0,i=arguments,n=this,s.frame(function(){e=!1,t.apply(n,i)}))}},t.debounce=function(e,i,n){var s,o,a,r,c,l=function(){var u=t.now()-r;i>u?s=setTimeout(l,i-u):(s=null,n||(c=e.apply(a,o),a=o=null))};return function(){a=this,o=arguments,r=t.now();var u=n&&!s;return s||(s=setTimeout(l,i)),u&&(c=e.apply(a,o),a=o=null),c}},t.defaults=function(e){if(!t.isObject(e))return e;for(var i=1,n=arguments.length;n>i;i++){var s=arguments[i];for(var o in s)void 0===e[o]&&(e[o]=s[o])}return e},t.keys=function(e){if(!t.isObject(e))return[];if(f)return f(e);var i=[];for(var n in e)t.has(e,n)&&i.push(n);return i},t.has=function(t,e){return r.call(t,e)},t.isObject=function(t){return t===Object(t)},t.now=Date.now||function(){return(new Date).getTime()},t.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var m=/(.)^/,y={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},g=/\\|'|\r|\n|\u2028|\u2029/g,w=function(t){return"\\"+y[t]};return t.template=function(e,i,n){!i&&n&&(i=n),i=t.defaults({},i,t.templateSettings);var s=RegExp([(i.escape||m).source,(i.interpolate||m).source,(i.evaluate||m).source].join("|")+"|$","g"),o=0,a="__p+='";e.replace(s,function(t,i,n,s,r){return a+=e.slice(o,r).replace(g,w),o=r+t.length,i?a+="'+\n((__t=("+i+"))==null?'':_.escape(__t))+\n'":n?a+="'+\n((__t=("+n+"))==null?'':__t)+\n'":s&&(a+="';\n"+s+"\n__p+='"),t}),a+="';\n",i.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{var r=new Function(i.variable||"obj","_",a)}catch(c){throw c.source=a,c}var l=function(e){return r.call(this,e,t)},u=i.variable||"obj";return l.source="function("+u+"){\n"+a+"}",l},t}()},function(t,e){t.exports=function(t){if(!t.support.cors&&t.ajaxTransport&&window.XDomainRequest){var e=/^https?:\/\//i,i=/^get|post$/i,n=new RegExp("^"+location.protocol,"i");t.ajaxTransport("* text html xml json",function(s,o,a){if(s.crossDomain&&s.async&&i.test(s.type)&&e.test(s.url)&&n.test(s.url)){var r=null;return{send:function(e,i){var n="",a=(o.dataType||"").toLowerCase();r=new XDomainRequest,/^\d+$/.test(o.timeout)&&(r.timeout=o.timeout),r.ontimeout=function(){i(500,"timeout")},r.onload=function(){var e="Content-Length: "+r.responseText.length+"\r\nContent-Type: "+r.contentType,n={code:200,message:"success"},s={text:r.responseText};try{if("html"===a||/text\/html/i.test(r.contentType))s.html=r.responseText;else if("json"===a||"text"!==a&&/\/json/i.test(r.contentType))try{s.json=t.parseJSON(r.responseText)}catch(o){n.code=500,n.message="parseerror"}else if("xml"===a||"text"!==a&&/\/xml/i.test(r.contentType)){var c=new ActiveXObject("Microsoft.XMLDOM");c.async=!1;try{c.loadXML(r.responseText)}catch(o){c=void 0}if(!c||!c.documentElement||c.getElementsByTagName("parsererror").length)throw n.code=500,n.message="parseerror","Invalid XML: "+r.responseText;s.xml=c}}catch(l){throw l}finally{i(n.code,n.message,s,e);
}},r.onprogress=function(){},r.onerror=function(){i(500,"error",{text:r.responseText})},o.data&&(n="string"===t.type(o.data)?o.data:t.param(o.data)),r.open(s.type,s.url),r.send(n)},abort:function(){r&&r.abort()}}}})}}(window.jQuery)}]),Webflow.require("ix").init([{slug:"grp-1-open-close",name:"Grp 1 open / close",value:{style:{},triggers:[{type:"click",selector:".grp-1-links",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease-in 0ms"}],stepsB:[{display:"none",opacity:0,wait:500,transition:"opacity 500ms ease-out 0ms"}]}]}},{slug:"hide-on-load",name:"hide on load",value:{style:{display:"none",opacity:0},triggers:[]}},{slug:"grp-2-open-close",name:"Grp 2 Open  / Close",value:{style:{},triggers:[{type:"click",selector:".grp-2-links",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}]}]}},{slug:"grp-3-open-close",name:"Grp 3 open / close",value:{style:{},triggers:[{type:"click",selector:".grp-3-links",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}]}]}},{slug:"grp-4-open-close",name:"grp 4 open / close",value:{style:{},triggers:[{type:"click",selector:".grp-4-links",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}]}]}},{slug:"grp-5-open-close",name:"Grp 5 open / close",value:{style:{},triggers:[{type:"click",selector:".grp-5-links",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}]}]}},{slug:"grp-6-open-close",name:"Grp 6 open / close",value:{style:{},triggers:[{type:"click",selector:".grp-6-links",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}]}]}},{slug:"grp-7-open-close",name:"Grp 7 open / close",value:{style:{},triggers:[{type:"click",selector:".grp-7-links",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}]}]}},{slug:"bug-report-form-show-hide",name:"Bug Report Form Show / Hide",value:{style:{},triggers:[{type:"click",selector:".bug-form-wrapper",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"bug-form-hide-on-page-load",name:"Bug Form hide on page load",value:{style:{display:"none",opacity:0},triggers:[]}},{slug:"hide-on-page-load",name:"Hide on page load",value:{style:{display:"none",opacity:0},triggers:[]}},{slug:"page-contents-open-close",name:"Page Contents Open / Close",value:{style:{},triggers:[{type:"click",selector:".contents-body",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}]},{type:"click",selector:".drop-icon",stepsA:[{transition:"transform 500ms ease 0ms",rotateX:"0deg",rotateY:"0deg",rotateZ:"90deg"}],stepsB:[{transition:"transform 500ms ease 0ms",rotateX:"0deg",rotateY:"0deg",rotateZ:"0deg"}]}]}},{slug:"search-button",name:"Search Button",value:{style:{},triggers:[{type:"click",selector:".nav-links",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".search-input",stepsA:[{display:"inline-block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".search-close",stepsA:[{display:"inline-block"}],stepsB:[]},{type:"click",selector:".dropdown-wrapper",stepsA:[{display:"none"}],stepsB:[]}]}},{slug:"search-bar",name:"Search Bar",value:{style:{display:"none",opacity:0},triggers:[]}},{slug:"close-search",name:"Close Search",value:{style:{display:"none"},triggers:[{type:"click",selector:".search-input",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".nav-links",stepsA:[{display:"inline-block"}],stepsB:[]},{type:"click",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".dropdown-wrapper",stepsA:[{display:"inline-block"}],stepsB:[]}]}},{slug:"search-input-hide-on-load",name:"Search input hide on load",value:{style:{display:"none"},triggers:[]}},{slug:"scroll-to-apply",name:"Scroll to Apply",value:{style:{},triggers:[{type:"click",stepsA:[{}],stepsB:[]}]}},{slug:"dis",name:"dis",value:{style:{},triggers:[]}},{slug:"vpaas-signup-button",name:"VPaaS Signup Button",value:{style:{},triggers:[{type:"click",stepsA:[],stepsB:[]}]}},{slug:"show-pick-account-type",name:"Show Pick Account Type",value:{style:{},triggers:[{type:"click",stepsA:[],stepsB:[]}]}},{slug:"show-media-repurpose-div",name:"show media repurpose div",value:{style:{},triggers:[{type:"click",selector:".media-repurpose-div",stepsA:[{display:"block",opacity:1,transition:"opacity 200ms ease-in 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-media-repurposing-box",name:"close media repurposing box",value:{style:{},triggers:[{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:0,transition:"opacity 200ms ease-out 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"show-end-user-uploads-div",name:"Show end user uploads div",value:{style:{},triggers:[{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"block",opacity:1,transition:"opacity 200ms ease-in-out 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-end-user-uploads-div",name:"close end user uploads div",value:{style:{},triggers:[{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 200ms ease-in-out 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"open-mp-div",name:"Open MP div",value:{style:{},triggers:[{type:"click",selector:".media-publishing-div",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:.07,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-mp-div",name:"close MP div",value:{style:{},triggers:[{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"show-learning-div",name:"Show Learning Div",value:{style:{},triggers:[{type:"click",selector:".learning-div",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-learning-div",name:"Close learning div",value:{style:{},triggers:[{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"show-live-video-pub-div",name:"show live video pub div",value:{style:{},triggers:[{type:"click",selector:".live-video-pub-div",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-live-video-pub-div",name:"close live video pub div",value:{style:{},triggers:[{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"show-surveillance-div",name:"show surveillance div",value:{style:{},triggers:[{type:"click",selector:".surveillance-div",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-surveillance-block",name:"close surveillance block",value:{style:{},triggers:[{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"show-content-distrib-div",name:"show content distrib div",value:{style:{},triggers:[{type:"click",selector:".content-distrib-div",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-content-distrib-div",name:"close content distrib div",value:{style:{},triggers:[{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"show-in-video-product-div",name:"show in-video product div",value:{style:{},triggers:[{type:"click",selector:".in-product-video-div",stepsA:[{display:"block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"none"}],stepsB:[]},{type:"click",selector:".media-repurpose-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".end-user-uploads-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".media-publishing-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".learning-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".live-video-pub-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".surveillance-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".content-distrib-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]}]}},{slug:"close-in-product-video-div",name:"close in-product video div",value:{style:{},triggers:[{type:"click",selector:".in-product-video-div",stepsA:[{display:"none",opacity:0,transition:"opacity 500ms ease 0ms"}],stepsB:[]},{type:"click",selector:".get-you-started-div",stepsA:[{display:"block"}],stepsB:[]}]}},{slug:"show-temp-page-nav-column",name:"show temp page nav column",value:{style:{},triggers:[{type:"click",selector:".template-page-nav-column",stepsA:[{display:"inline-block",opacity:1,transition:"opacity 500ms ease 0ms"}],stepsB:[{display:"none"}]}]}}]);

;
