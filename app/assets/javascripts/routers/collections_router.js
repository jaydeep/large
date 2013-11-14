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
    // "collection/new" :"newCollection",
    // "collections/:collectionId/edit" :"editCollection",
    "collections/:collectionId": "showCollectionView",
    "collections/:collectionId/:postId": "showPostFromCollection",
    "post/new": "newPost",
    "post/:postId": "showPost",
    "post/:postId/edit": "editPost"
  }, 

  showHomePage: function(){
    //TODO
    console.log('hi from show home page');
    this.$sidebar.html("<h1>Sidebar</h1><a href='/#/post/new'>New Post</a><br><a href='/#/collections'>Collection View</a>"); //TODO: sidebar view
  }, 

  newPost:function(){
    console.log('hi from new post');
    var newPostView = new Mediumlarge.Views.PostNew({
    });

    this._swapView(newPostView);
  },

  editPost:function(postId){
    console.log('hi from edit post:' + postId);

    this._swapView(editPostView);
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
    console.log("hi from post view...i'll be fetching in a moment");
    var post = new Mediumlarge.Models.Post({ id: postId });
    var that = this;

    post.fetch({wait: true, 
      success: function(data, response){
        console.log('yay post was fetched');
        
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
    console.log('in show post from collection, redirecting to post view...');
    this.showPost(postId);
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
