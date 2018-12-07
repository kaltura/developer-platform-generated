var URL = 'https://api.swiftype.com/api/v1/public/engines/search?engine_key=nDV8CSbwfyrqCNQgpt79&';

function sortByScore(r1, r2) {
  if (r1.score === r2.score) return 0;
  return r1.score > r2.score ? -1 : 1;
}

window.lucybot.search = function(query, page, callback) {
  var url = URL + 'q=' + encodeURIComponent(query);
  window.jquery.getJSON(url, function(data) {
    var results = [];
    (data.records.document || []).sort(sortByScore).forEach(function(doc) {
      results.push({ref: doc.path, score: doc._score});
    });
    (data.records.workflows || []).sort(sortByScore).forEach(function(doc) {
      results.push({ref: doc.link, score: doc._score});
    });
    (data.records.operation || []).sort(sortByScore).forEach(function(op) {
      results.push({ref: '/service/' + op.service + '/action/' + op.action, score: op._score});
    });
    (data.records.object || []).sort(sortByScore).forEach(function(def) {
      var sub = def.type.charAt(0).toUpperCase() + def.type.substring(1) + 's';
      results.push({ref: '/General_Objects/' + sub + '/' + def.name, score: def._score});
    });
    callback(null, results);
  });
}
