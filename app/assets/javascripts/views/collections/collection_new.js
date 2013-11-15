Mediumlarge.Views.CollectionNew = Backbone.View.extend({
  template: JST['collections/new'],

  events: {
    "click #new-collection" : "postForm"
  },

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    return this;
  }, 

  postForm: function(event){
    event.preventDefault();
    console.log('hi :)');

    var newCollection = new Mediumlarge.Models.Collection();
    newCollection.set({
      name: $("#collection-name").val(),
      description: $("#collection-description").val(),
      invite_only: $('input[name=invite-status]:checked').val()
    });
    
    newCollection.save({}, {
      wait: true,
      success:function(data, response){
        Mediumlarge.collections.add(response);

        Mediumlarge.router.navigate("/collections/"+response.id, true);
      },
      error:function(data, response){
        debugger;
      }
    });
  }
});