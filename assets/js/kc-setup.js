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

if (!maybeContinueSession() && window.location.href.indexOf('signIn=true') !== -1) {
  window.lucybot.startLogin();
}

