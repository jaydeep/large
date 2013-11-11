Mediumlarge.Views.CollectionsIndex = Backbone.View.extend({
  template: JST['collections/index'], 
  events: {
    "click .collections li a" : "fetchThenShow",
    "click button" : "followCollectionEvent"
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
  },

  followCollectionEvent: function(event){
    event.preventDefault();

    var button = $(event.target);
    var collectionId = $(event.target).attr('data-id');
    console.log('i was clicked :' + collectionId);
    this._swapButton(button);

    var followCollection = new Mediumlarge.Model.CollectionFollow({
      collection_id : collectionId
    });
    
    var self = this;

    followCollection.save({
      success: function(data, response){
        console.log('follow was successful');
        self._swapButton(button);
      },
      error: function(data, response){
        console.log('follow was unsucesseful');
        debugger;
      }
    });
  },

  _swapButton: function(button){
    // var truthiness = (button.attr('class') === "follow")
    // button.toggleClass("follow", !truthiness);//add/rmv follow
    // button.toggleClass("unfollow", truthiness);//rmv/add unfollow
    button.toggleClass('follow unfollow');
    // change the text
    var newText = button.attr('class');
    //capitalize
    newText = newText.charAt(0).toUpperCase() + newText.slice(1);
    button.html(newText);
  }

});
