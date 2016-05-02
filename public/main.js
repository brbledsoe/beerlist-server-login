var appModel = new AppModel();

var appView = new AppView({ model: appModel });

var beerRouter = new BeerRouter();

appModel.fetch();

appModel.get('beers').fetch({success: function () {
  
  Backbone.history.start();
}}, {reset: true});

var registerView = new RegisterView({ model: appModel });
