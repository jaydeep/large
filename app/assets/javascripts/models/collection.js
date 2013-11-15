Mediumlarge.Models.Collection = Backbone.Model.extend({
  urlRoot: "/collections",
  parse: function(data){
    this.posts = new Mediumlarge.Collections.Posts(data.posts);
    delete data.posts;
    return data;
  },
  toJSON: function(){
    return {
      name : this.get('name'),
      description: this.get('description'),
      invite_only : this.get('invite_only')
    };
  }
});
