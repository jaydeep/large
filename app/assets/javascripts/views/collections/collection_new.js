Mediumlarge.Views.CollectionNew = Backbone.View.extend({
  template: JST['collections/new'],
  events: {
    "click submit" : "postForm"
  },

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);
  }, 
  postForm: function(event){
    event.preventDefault();
    console.log('collection: this will get posted.');
  }
});