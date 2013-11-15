Mediumlarge.Views.CollectionsShow = Backbone.View.extend({
  template: JST['collections/show'], 

  render : function(){
    var collectionsPosts = false;
    if (this.model.posts.length > 0) 
      collectionsPosts = this.model.posts.models;

    var renderedContent = this.template({
      collection : this.model,
      posts : collectionsPosts
    });

    this.$el.html(renderedContent);
    return this;
  }
});
