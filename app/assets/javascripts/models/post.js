Mediumlarge.Models.Post = Backbone.Model.extend({
  defaults:{
    'draft' : false
  },

  urlRoot: "/posts", 
  
  toJSON:function(){
    return { 
        title : this.get('title'),
        subtitle : this.get('subtitle'),
        body: this.get('body'), 
        draft : this.get('draft')
    }
  }
});
