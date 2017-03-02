var Router = module.exports = require('express').Router();

var Request = require('request');
var jwt = require('jsonwebtoken');

var kc = require('../lib/KalturaClient');
var ktypes = require('../lib/KalturaTypes');
var vo = require ('../lib/KalturaVO.js');

// Dummy credentials to initialize the client.
var config = {
  partner_id: 102,
  admin_secret: '92ed864443d6cfadee508167016ea309',
  user_id: null,
  service_url: process.env.KALTURA_SERVICE_URL || 'https://www.kaltura.com/',
}

Router.use(require('body-parser').json());

Router.post('/selectPartner', function(req, res) {
  var kaltura_conf = new kc.KalturaConfiguration(req.body.partnerId);
  var client = new kc.KalturaClient(kaltura_conf);
  client.user.loginByLoginId(function(ks){
    if (!ks) return res.send("Error logging in");
    client.setKs(ks);
    var type = ktypes.KalturaSessionType.ADMIN;
    client.partner.getSecrets(function(secrets) {
      if (!secrets) return res.status(500).end();
      if (secrets.code && secrets.message) return res.status(500).send(secrets.message);
      res.json(secrets);
    }, req.body.partnerId, req.body.email, req.body.password);
  })
})

Router.post('/login', function(req, res) {
  var kaltura_conf = new kc.KalturaConfiguration(req.body.partnerId);
  var client = new kc.KalturaClient(kaltura_conf);
  var type = ktypes.KalturaSessionType.ADMIN;
  client.user.loginByLoginId(function(ks) {
    if (!ks) return res.send("Error logging in");
    client.setKs(ks);
    var pager = new vo.KalturaFilterPager();
    pager.pageSize = 500;
    pager.pageIndex = 1;
    client.partner.listPartnersForUser(function(partners) {
      res.json(partners.objects);
    },null,pager)
  }, req.body.email, req.body.password)
})

var COPY_FIELDS = [
  'firstName', 'lastName', 'country', 'state',
];
var MAP_FIELDS = [
  {from: 'company', to: 'description'},
  {from: 'email', to: 'adminEmail'},
]

Router.post('/shatest', function(req, res) {
  console.log('req.body', req.body);
  res.end();
})

Router.post('/signup', function(req, res) {
  var kaltura_conf = new kc.KalturaConfiguration(config.partner_id);
  kaltura_conf.serviceUrl = config.service_url;
  var client = new kc.KalturaClient(kaltura_conf);
  var type = ktypes.KalturaSessionType.ADMIN;

  var expiry = null;
  var privileges = null;
  client.session.start(function(ks) {
    var partner = new vo.KalturaPartner();
    COPY_FIELDS.forEach(function(f) {
      if (req.body[f]) partner[f] = req.body[f];
    });
    MAP_FIELDS.forEach(function(f) {
      if (req.body[f.from]) partner[f.to] = req.body[f.from];
    })
    partner.name = req.body.firstName + ' ' + req.body.lastName;
    partner.appearInSearch = null;
    partner.partnerPackage = 100;
    if (process.env.KALTURA_SSO_SECRET && process.env.KALTURA_SSO_PAYLOAD) {
      var cms_password = jwt.sign({ lucybot: process.env.KALTURA_SSO_PAYLOAD }, process.env.KALTURA_SSO_SECRET);
    }else{
      var cms_password = 'testit';
    }
    var template_partner_id = null;
    var silent = null;
    client.partner.register(function(results) {
      if (!results) return res.status(500).end();
      if (results.code && results.message) return res.status(500).send(results.message);
      res.json(results);
    }, partner, cms_password, template_partner_id, silent);
  }, config.admin_secret, config.user_id, type, config.partner_id, expiry, privileges);

  if (process.env.SSO_SYNC_URL && process.env.KALTURA_SSO_SECRET && process.env.KALTURA_SSO_PAYLOAD) {
    delete req.body.usage;
    var requestify = require('requestify');

    requestify.post(process.env.SSO_SYNC_URL, {
	    name: req.body.firstName + ' ' + req.body.lastName,
	    company: req.body.company,
	    email: req.body.email,
	    country: req.body.country,
	    state: req.body.state,
	    contactme: req.body.help,
	    system: 'Code_Recipes',
	    token: jwt.sign({ lucybot: process.env.KALTURA_SSO_PAYLOAD }, process.env.KALTURA_SSO_SECRET) 
    })
    .then(function(response) {
    //Get the response body (JSON parsed or jQuery object for XMLs)
	response.getBody();
    });
  }
});
