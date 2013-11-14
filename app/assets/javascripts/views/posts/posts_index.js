Mediumlarge.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],
  initialize:function(){
    this.listenTo(Mediumlarge.homePagePosts, 'remove change', this.render);
    this.listenTo(Mediumlarge.posts, 'remove change', this.render);
  },
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
