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
    "collections/new" :"newCollection",
    "collections/:collectionId/edit" :"editCollection",
    "collections/:collectionId": "showCollectionView",
    "collections/:collectionId/:postId": "showPostFromCollection",
    "post/new": "newPost",
    "post/:postId": "showPost",
    "post/:postId/edit": "editPost"
  }, 

  editCollection:function(collectionId){
    console.log('hi from edit collection');
    var collectionToEdit = Mediumlarge.collections.get(collectionId);

    var editCollectionView = new Mediumlarge.Views.CollectionEdit({
      model : collectionToEdit
    })

    this._swapView(editCollectionView);
  },

  newCollection:function(){
    console.log('hi from new collection');
    
    var newCollectionView = new Mediumlarge.Views.CollectionNew();

    this._swapView(newCollectionView);
  },

  showHomePage: function(){
    console.log('hi from show home page');
    this._swapSidebar({/*pass in the view*/});
    
    var postIndexView = new Mediumlarge.Views.PostsIndex({
      collection: Mediumlarge.posts
    });

    this._swapView(postIndexView);
  }, 

  newPost:function(){
    console.log('hi from new post');
    var newPostView = new Mediumlarge.Views.PostNew({
    });

    this._swapView(newPostView);
  },

  editPost:function(postId){
    console.log('hi from edit post:' + postId);
    var postToEdit = Mediumlarge.posts.get(postId); 

    var editPostView = new Mediumlarge.Views.PostEdit({
      model : postToEdit
    });

    this._swapView(editPostView);
  },

  showCollectionsIndex: function(){
    console.log('hi from show collection'); 
    var collectionIndexView = new Mediumlarge.Views.CollectionsIndex({
      collection: Mediumlarge.collections
    });
    
    // this._swapSideBar(collectionSidebarView);
    this._swapView(collectionIndexView);
  },
  
  showCollectionView: function(collectionId){
    console.log("hi from collection view");
    var collectionToShow = Mediumlarge.collections.get(collectionId);
    
    var collectionShowView = new Mediumlarge.Views.CollectionsShow({
      model: collectionToShow
    });

    this._swapView(collectionShowView)
  },

  showPost: function(postId){ //not convinced this is necessary
    console.log("hi from post view...i'll be fetching in a moment");
    //check if post already exists inc collection, else fetch.
    var post = Mediumlarge.posts.get(postId);
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
  
  _swapSidebar: function(newSidebar){
    //TEMP. TODO
    this.$sidebar.html("<h1>Sidebar</h1>");
    this.$sidebar.append("<a href='/#'>Home</a><br>");
    this.$sidebar.append("<a href='/#/post/new'>New Post</a><br>");
    this.$sidebar.append("<a href='/#/collections/new'>New Collection</a><br>");
    this.$sidebar.append("<a href='/#/collections'>Collection View</a>");

    // if (this._prevSidebar){
    //   this._prevSidebar.remove();
    // }

    // this._prevSidebar = newSidebar;
    // this.$sidebar.html(newSidebar.html().$el);
  },

  _swapView: function(newView){
    if ( this._prevView ){
      this._prevView.remove();
    }

    this._prevView = newView;
    this.$content.html(newView.render().$el);
  }
});
