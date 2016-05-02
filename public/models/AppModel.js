var AppModel = Backbone.Model.extend({
  url: '/currentUser',

  defaults: function () {
    return {
      beers: new BeersCollection(),

      current_beer: null,

      // either true or false
      view: 'beers',

      current_user: new UserModel(),

    }
  },

  initialize: function () {
    this.on('change:current_beer', this._setReviewsUrl);
  },

  _setReviewsUrl: function () {
    var beer = this.get('current_beer');
    var id = beer.get('_id');

    beer.get('reviews').url = '/beers/' + id + '/reviews';
  },

  parse: function (response) {
    if (response) {
      var user = new UserModel(response);
      this.set('current_user', user);
    }
  }
});