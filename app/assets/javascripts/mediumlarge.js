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
    
    //fetch the posts and collections.
    Mediumlarge.fetchedCollections = new Mediumlarge.Collections.Collections();
    Mediumlarge.fetchedPosts = new Mediumlarge.Collections.Posts();
    var self = this;

    posts.fetch({
      success: function(data, response){ //on success
        
        collections.fetch({ 
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
