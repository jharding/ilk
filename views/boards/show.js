var base = require('../supers/layout');

module.exports = base.extend({
  template: 'boards/show'

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
