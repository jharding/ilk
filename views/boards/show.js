var base = require('../supers/layout');

module.exports = base.extend({
  template: 'boards/show'

, url: function(req, locals) {
    return {
      path: '/i/' + locals.board.name.toLowerCase()
    };
  }

, name: function(req, locals) {
    return locals.board.name;
  }

, description: function(req, locals) {
    return locals.board.description;
  }

, posts: function(req, locals) {
    return locals.posts;
  }
});
