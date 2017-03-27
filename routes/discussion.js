const express = require('express');
const request = require('request');
const router = module.exports = new express.Router();

const DISCOURSE_HOST = process.env.DISCOURSE_HOST || 'https://forum.kaltura.org';
const API_KEY = process.env.DISCOURSE_API_KEY;
function discourseURL(path) {
  return DISCOURSE_HOST + path + '?api_key=' + API_KEY;
}

function createPage(slug, title) {
  title = encodeURIComponent(title);
  return `
<!DOCTYPE html>
<html>
<head></head>
<body>
  This discussion doesn't exist yet. <a href="/discussion/${slug}/create?title=${title}">Create it now</a>.
</body>
</html>
`
}

router.use('/:slug', (req, res, next) => {
  let slug = req.slug = req.params.slug.toLowerCase().replace(/_/g, '');
  request.get(discourseURL('/tags/' + slug + '.json'), {json: true}, (err, resp, body) => {
    if (err) return res.status(500).send("Error");
    if (res.statusCode >= 400 || body.errors) return next();
    let topic = body.topic_list.topics[0];
    if (!topic) return next();
    res.redirect(discourseURL('/t/' + topic.id));
  });
})

router.get('/:slug', (req, res) => {
  return res.send(createPage(req.slug, req.query.title));
});

router.get('/:slug/create', (req, res) => {
  request.post(discourseURL('/posts'), {
    json: true,
    body: {
      tags: [req.slug],
      title: `${req.query.title} Documentation`,
      raw: `Discussion for ${req.query.title} documentation`,
    }
  }, (err, resp, body) => {
    if (err || resp.statusCode >= 300) return res.status(500).send("Error");
    res.redirect('/discussion/' + req.params.slug);
  })
});
