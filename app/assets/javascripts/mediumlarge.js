window.Mediumlarge = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.$sidebar = $("#sidebar");
    this.$userNav = $("#user-nav");
    this.$content = $("#content");
    Mediumlarge.csrfToken = $("meta[name='csrf-token']").attr('content');
    
    //fetch the posts and collections. TOOD: how to improve this?
    Mediumlarge.collections = new Mediumlarge.Collections.Collections();
    Mediumlarge.posts = new Mediumlarge.Collections.Posts();
    Mediumlarge.homePagePosts = new Mediumlarge.Collections.Posts();
    var self = this;

    //fetches the top 5 posts, and the latest 5 posts
    Mediumlarge.homePagePosts.fetch({
      success: function(data, response){ //on success
        //TODO: add homePagePosts to posts
        Mediumlarge.posts.reset(response);
  
        Mediumlarge.collections.fetch({ //start fetching the collections
          success:function(data, response){console.log('collections fetched!')}, 
            error:function(data, response){debugger;}
        });

        Mediumlarge.router = new Mediumlarge.Routers.Collections({
          $sb : self.$sidebar, $un : self.$userNav, 
          $ct : self.$content, collection : data
        });
        
        Backbone.history.start();
      },
      error: function(data, response){ //on errors
        debugger;
        console.log("boo there was an error");
        console.log(data);
        console.log(response);
      }
    });

    console.log('Hello from Backbone!');
  }
};

$(document).ready(function(){
  Backbone.sync = (function(original) {
    return function(method, model, options) {
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', Mediumlarge.csrfToken);
      };
      original(method, model, options);
    };
  })(Backbone.sync);

  Mediumlarge.initialize();
});
