Mediumlarge.Views.CollectionsShow = Backbone.View.extend({
  template: JST['collections/show'], 

  render : function(){
    var collectionsPosts = this.model.posts.models; //TODO
    var renderedContent = this.template({
      collection : this.model,
      posts : collectionsPosts
    });

    this.$el.html(renderedContent);
    return this;
  }
});
