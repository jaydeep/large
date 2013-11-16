Mediumlarge.Views.CollectionsShow = Backbone.View.extend({
  template: JST['collections/show'], 
  
  events: {
    "click #collection-delete": "deleteTheCollection"
  },

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
  }, 

  deleteTheCollection: function(event){
    event.preventDefault();
    var self = this;
    Mediumlarge.collections.get(this.model.id).destroy({
      wait:true, 
      success:function(data,response){
        Mediumlarge.router.navigate("/collections", true);
      },
      error:function(data,response){
        debugger;
      }
    })
  }
});
