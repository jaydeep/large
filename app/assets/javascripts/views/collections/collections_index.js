Mediumlarge.Views.CollectionsIndex = Backbone.View.extend({
  template: JST['collections/index'], 
  events: {
    "click .collections" : "fetchThenShow"
  },

  render : function(){
    var renderedContent = this.template({
      collections : this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },

  fetchThenShow: function(event){
    event.preventDefault();
    var collectionId = $(event.target).attr('data-id');
    var clickedCollection = this.collection.get(collectionId);

    clickedCollection.fetch({
      wait: true,
      success: function(data, response){
        console.log('phew, it was successful');
        //how to save this data, so that the view will have access to it
        //Navigate to the Link, which will call render, etc. 
        Mediumlarge.router.navigate("/collections/"+collectionId, {trigger: true});
      },
      error: function(data, response){
        console.log("there was an error fetching the collections posts")
      }
    });

  }

});
