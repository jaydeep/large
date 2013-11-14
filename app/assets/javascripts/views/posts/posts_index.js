Mediumlarge.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],
  // events{
  //   // "click bookmark" : "bookmarkPost"
  //   //TODO
  // },

  render:function(){
    var renderedContent = this.template({
      posts : this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }
});
