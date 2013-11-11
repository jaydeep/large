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
    "collections/:collectionId/:postId": "showPostFromCollection",
    "post/:postId": "showPost"
  }, 

  showHomePage: function(){
    console.log('hi from show home page');
    this.$sidebar.html("<h1>Sidebar</h1><a href=''>Home</a><br><a href='/#/collections'>Collection View</a>"); //TODO: sidebar view
  }, 

  showCollectionsIndex: function(){
    console.log('hi from show collection'); 

    var collectionIndexView = new Mediumlarge.Views.CollectionsIndex({
      collection: this.collection
    });
    
    // this._swapSideBar(collectionSidebarView);
    this._swapView(collectionIndexView);
  },
  
  showCollectionView: function(collectionId){
    console.log("hi from collection view");
    var collectionToShow = this.collection.get(collectionId);

    var collectionShowView = new Mediumlarge.Views.CollectionsShow({
      model: collectionToShow
    });

    this._swapView(collectionShowView)
  },

  showPost: function(postId){ //not convinced this is necessary
    console.log('hi from post view...IN PROGRESS');
    var post = new Mediumlarge.Models.Post({ id: postId });
    var that = this;

    post.fetch({wait: true, 
      success: function(data, response){
        console.log('yay it worked');
        
        var postShowView = new Mediumlarge.Views.PostsShow({
          model: post
        });

        that._swapView(postShowView);
      },

      error: function(data, response){
        console.log('eff. something went wrong in show post');
        debugger;
      }
    });
  },

  showPostFromCollection: function(collectionId, postId){
    console.log('hi from post from collection');
    var parentCollection = this.collection.get(collectionId);
    var childPost = parentCollection.get('posts').get(postId);

    var postShowView = new Mediumlarge.Views.PostsShow({
      model: childPost
    });

    this._swapView(postShowView);
  },
  
  _swapSideBar: function(newSidebar){
    if (this._prevSidebar){
      this._prevSidebar.remove();
    }

    this._prevSidebar = newSidebar;
    this.$sidebar.html(newSidebar.html().$el);
  },

  _swapView: function(newView){
    if ( this._prevView ){
      this._prevView.remove();
    }

    this._prevView = newView;
    this.$content.html(newView.render().$el);
  }
});
