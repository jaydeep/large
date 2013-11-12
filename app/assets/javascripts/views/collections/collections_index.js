Mediumlarge.Views.CollectionsIndex = Backbone.View.extend({
  template: JST['collections/index'], 
  events: {
    "click .collections li a" : "fetchThenShow",
    "click .collection-follow-button" : "followCollectionButtonEvent",
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

  followCollectionButtonEvent: function(event){
    event.preventDefault();

    var button = $(event.target);
    var buttonType = $(event.target).attr('data-button-type');
    var collectionId = $(event.target).attr('data-id');
    var self = this;

    var success = function(data, response){
      console.log('follow was successful');
      self._swapButton(button, buttonType);
    }

    var error = function(data, response){
      console.log('follow was unsucessful');
      debugger;
    }

    var followCollection = new Mediumlarge.Models.CollectionFollower({
      collectionId : collectionId
    });

    if (buttonType === 'follow'){
      followCollection.save({},{
        success: success, 
        error: success
      });
    }
    else{
      followCollection.destroy({
        success: success, 
        error: error
      });
    }
  },

  _swapButton: function(button, buttonType){
    var newButtonType = (buttonType === 'follow') ? 'unfollow' : 'follow';
    button.attr('data-button-type', newButtonType);

    var newText = newButtonType.charAt(0).toUpperCase() + newButtonType.slice(1);
    button.html(newText);
  }

});
