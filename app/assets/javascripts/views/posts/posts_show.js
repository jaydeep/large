Mediumlarge.Views.PostsShow = Backbone.View.extend({

  template: JST['posts/show'],
  events: {
    "click #post-edit" : "navToEditForm",
    "click #post-delete": "deleteTheFORM"
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

  deleteTheFORM: function(event){
    event.preventDefault();
    console.log('TODO. delete button');
  }
});