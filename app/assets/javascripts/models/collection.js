Mediumlarge.Models.Collection = Backbone.Model.extend({
  urlRoot: "/collections",
  parse: function(data){
    this.posts = new Mediumlarge.Collections.Posts(data.posts);
    delete data.posts;
    return data;
  },
  toJSON: function(data){
    return data;
  }
});
