Mediumlarge.Views.PostsShow = Backbone.View.extend({

  template: JST['posts/show'],
  events: {
    "click #post-edit" : "navToEditForm",
    "click #post-delete": "deleteTheForm"
  },
  render: function(){
    var renderedContent = this.template({
      post : this.model
    });

    this.$el.html(renderedContent);
    return this;
  }, 

  navToEditForm: function(event){
    event.preventDefault();
    Mediumlarge.router.navigate("/post/" + this.model.id + "/edit", true);
  },

  deleteTheForm: function(event){
    var self = this;
    Mediumlarge.posts.get(this.model.id).destroy({
      wait: true,
      success:function(data,response){
        self.updateArrays(self.model.id);
        console.log('deleted');
        debugger;
        Mediumlarge.router.navigate("/", true);
      }, 
      error:function(data,response){
        debugger;
      }
    });
  },

  updateArrays: function(model_id){
    var lpIndex = $.inArray(model_id, Mediumlarge.latestPosts);
    if ( lpIndex !== -1 ) Mediumlarge.latestPosts.splice(lpIndex, 1);

    var rmIndex = $.inArray(model_id, Mediumlarge.recommendations);
    if ( rmIndex !== -1 ) Mediumlarge.recommendations.splice(rmIndex, 1);
  }
});