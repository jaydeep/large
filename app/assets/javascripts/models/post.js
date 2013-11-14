Mediumlarge.Models.Post = Backbone.Model.extend({
  urlRoot: "/posts", 
  toJSON:function(){
    return { 
        title : this.get('title'),
        subtitle : this.get('subtitle'),
        body: this.get('body')
    }
  }
});
