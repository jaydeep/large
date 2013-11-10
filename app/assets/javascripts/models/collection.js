Mediumlarge.Models.Collection = Backbone.Model.extend({
  urlRoot: "/collections",
  parse: function(data){
    return data;
  },
  toJSON: function(data){
    return data;
  }
});
