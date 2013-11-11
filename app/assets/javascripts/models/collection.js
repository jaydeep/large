Mediumlarge.Models.Collection = Backbone.Model.extend({
  urlRoot: "/collections",
  parse: function(data){
    data.posts = new Mediumlarge.Collections.Posts(data.posts);
    
    return data;
  },
  toJSON: function(data){
    return data;
  }
});
