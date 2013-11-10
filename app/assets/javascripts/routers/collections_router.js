Mediumlarge.Routers.Collections = Backbone.Router.extend({
  initialize: function(options){
    this.$sidebar = options.$sb;
    this.$userNav = options.$un;
    this.$content = options.$ct;
    this.collection = options.collection;
    console.log('hi from the init routers');
  },

  routes: {
    "": "showHomePage",
    "collections": "showCollectionsIndex",
    "collections/:collectionId": "showCollectionView",
    "post/:postId": "showPost"
  }, 

  showHomePage: function(){
    console.log('hi from show home page');
    this.$sidebar.prepend("<h1>Sidebar</h1>"); //TODO: sidebar view
  }, 

  showCollectionsIndex: function(){
    console.log('hi from show collection'); 

    var collectionIndexView = new Mediumlarge.Views.CollectionsIndex({
      collection: this.collection
    });

    this._swapView(collectionIndexView);
  },
  
  showCollectionView: function(collectionId){
    console.log("hi from collection view");
    var collectionToShow = this.collection.get(collectionId);

    var collectionShowView = new Mediumlarge.Views.CollectionsShow({
      model: collectionToShow
    })

    this._swapView(collectionShowView)
  },

  showPost: function(postId){
    console.log('hi from showpost with post_id:' + post_id);
  },

  _swapView: function(newView){
    if ( this._prevView ){
      this._prevView.remove();
    }

    this._prevView = newView;
    this.$content.html(newView.render().$el);
  }
});
