Mediumlarge.Models.CollectionFollower = Backbone.Model.extend({
  urlRoot: "/collection_follower",

  initialize: function(options){
    this.collectionId = options.collectionId
  },

  toJSON: function(data){
    data.collection_id = parseInt(this.collectionId);
    return data;
  },

  destroy: function(options){
    var self = this;
    $.ajax({
      url: "/collection_follower",
      type: "DELETE",
      data: { collection_id: self.collectionId },
      success: function(data, response){
        options.success(data, response);
      }, 
      error: function(data, response){
        options.error(data, response);
      }
    })

  }
});
