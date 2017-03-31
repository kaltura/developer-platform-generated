const express = require('express');
const request = require('request');
const pug = require('pug');
const router = module.exports = new express.Router();

const DISCOURSE_HOST = process.env.DISCOURSE_HOST || 'https://forum.kaltura.org';
const API_KEY = process.env.DISCOURSE_API_KEY;
function discourseURL(path) {
  return DISCOURSE_HOST + path + '?api_key=' + API_KEY + '&api_username=system';
}

const newDiscussionTemplate = pug.compileFile(__dirname + '/../views/new_discussion.pug');
const discussionTemplate = pug.compileFile(__dirname + '/../views/discussion.pug');

router.use('/:slug', (req, res, next) => {
  let slug = req.slug = req.params.slug.toLowerCase().replace(/_/g, '');
  request.get(discourseURL('/tags/' + slug + '.json'), {json: true}, (err, resp, body) => {
    if (err) return res.status(500).send("Error");
    if (resp.statusCode >= 400 || body.errors) return next();
    let topic = body.topic_list.topics[0];
    if (!topic) return next();
    request.get(discourseURL('/t/' + topic.id + '.json'), {json: true}, (err, resp, body) => {
      if (err) return res.status(500).send(err);
      if (resp.statusCode >= 400 || body.errors) return res.status(resp.statusCode).send(JSON.stringify(body.errors));
      res.send(discussionTemplate({discussion: body, host: DISCOURSE_HOST}))
    })
  });
})

router.get('/:slug', (req, res) => {
  return res.send(newDiscussionTemplate({slug: req.params.slug, title: encodeURIComponent(req.query.title)}));
});

router.get('/:slug/create', (req, res) => {
  request.post(discourseURL('/posts'), {
    json: true,
    body: {
      tags: [req.slug],
      category: process.env.DISCOURSE_CATEGORY_ID,
      title: `${req.query.title} Documentation`,
      raw: `Discussion for ${req.query.title} documentation`,
    }
  }, (err, resp, body) => {
    if (err || resp.statusCode >= 300) {
	return res.status(500).send("ERROR: HTTP request returned with  "+resp.statusCode);
    }
    res.redirect(DISCOURSE_HOST + '/t/' + body.topic_id);
  })
});
