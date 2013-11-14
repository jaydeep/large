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
    console.log(Mediumlarge.posts.length);
    this.model.destroy({
      wait:true,
      success:function(data,response){
        console.log('deleted');
        console.log(Mediumlarge.posts.length);
        Mediumlarge.router.navigate("/", true);
      }, 
      error:function(data,response){
        debugger;
      }
    });
  }
});