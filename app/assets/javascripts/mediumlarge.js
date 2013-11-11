window.Mediumlarge = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.$sidebar = $("#sidebar");
    this.$userNav = $("#user-nav");
    this.$content = $("#content");
    
    //fetch the posts and collections.
    var collections = new Mediumlarge.Collections.Collections();
    var self = this;

    collections.fetch({
      success: function(data, response){ //on success

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
  Mediumlarge.initialize();
});
