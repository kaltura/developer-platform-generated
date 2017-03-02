var router = module.exports = require('express').Router();

var request = require('request');

router.post('/access_token', function(req, res) {
  request({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token',
    headers: {'Accept': 'application/json'},
    json: true,
    qs: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.query.code,
    },
  }, function(err, response, body) {
      if (err) res.status(500).send(err);
      else res.json(body);
  });
});
