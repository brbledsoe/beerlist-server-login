var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer'
  },

  initialize: function () {
    this.$nameInput = this.$('#name-input');
    this.$styleInput = this.$('#style-input');
    this.$abvInput = this.$('#abv-input');
    this.$imgUrl = this.$('#img-input');

    this.$beerList = this.$('.beer-list');

    this.$beersContainer = this.$('.beers-container');
    this.$reviewsContainer = this.$('.reviews-container');
    this.$registerContainer = this.$('.register-container');
    this.$loginContainer = this.$('.login-container');

    this.listenTo(this.model.get('beers'), 'add', this.addBeer);
    this.listenTo(this.model.get('beers'), 'reset', this.renderBeers);

    this.listenTo(this.model, 'change:view', this.renderView);
    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);

    this.detailView = null;

    //Navbar
    this.$navContainer = this.$('.nav-container');
    this.listenTo(this.model, 'change:current_user', this.renderNav);

    //Manually render navbar on page load
    this.navView = null;
    this.renderNav();
  },

  renderNav: function () {
    if (this.navView) {
      this.navView.remove();
    }

    this.navView = new NavView({ model: this.model.get('current_user') || new UserModel()});

    this.$navContainer.append(this.navView.render().el);
  },

  renderView: function () {

    var view = this.model.get('view');

    var viewMap = {
      'beers': this.$beersContainer,
      'reviews': this.$reviewsContainer,
      'register': this.$registerContainer,
      'login': this.$loginContainer,
    };

    for(var eachView in viewMap){
      viewMap[eachView].removeClass('show');
    }

    viewMap[view].addClass('show');
  },

  renderDetailView: function () {
    if (this.detailView) {
      this.detailView.remove();
    }

    this.detailView = new BeerDetailView({ model: this.model.get('current_beer')});
  
    this.$reviewsContainer.append(this.detailView.render().el);
  },

  createBeer: function () {
    this.model.get('beers').create({
      name: this.$nameInput.val(),
      style: this.$styleInput.val(),
      abv: this.$abvInput.val(),
      image_url: this.$imgUrl.val()
    }, {wait: true});
  },

  addBeer: function (beer) {
    var beerView = new BeerView({ model: beer });
    this.$beerList.append(beerView.render().el);
  },

  renderBeers: function () {
    this.model.get('beers').each(function (m) {
      this.addBeer(m);
    }, this);
  }
});