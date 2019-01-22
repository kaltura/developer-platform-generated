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

var BLOG_URL = 'https://corp.kaltura.com/wp-json?json=get_category_posts&slug=technology&count=5&status=publish&page=1';

window.jquery(document).ready(function() {

  function postTemplate(post) {
    return '<p><a href="' + post.url + '" target="_blank">' + post.title + '</a></p>';
  }

  window.jquery.getJSON(BLOG_URL)
  .done(function(data) {
    if (data && data.posts) {
      window.jquery('#KalturaBlogContent').html(data.posts.map(postTemplate).join('\n'));
    }
  })
  .fail(function(xhr) {
    console.log('blog failure', xhr);
  })
})
