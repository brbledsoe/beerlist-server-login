var appModel = new AppModel();

var appView = new AppView({ model: appModel });

appModel.get('beers').fetch({success: function () {
  var beerRouter = new BeerRouter();
  Backbone.history.start();
}}, {reset: true});

var registerView = new RegisterView();