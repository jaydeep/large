Mediumlarge.Views.CollectionEdit = Backbone.View.extend({
  template: JST['collections/edit'],
  events: {
    "click #edit-collection" : "putForm"
  },

  render: function(){
    debugger;
    var name            = this.model.get('name');
    var description     = this.model.get('description');
    var invite_only     = this.model.get('invite_only');
    var collection_id   = this.model.id;

    var renderedContent = this.template({
      name : name, description : description,
      invite_only : invite_only, collection_id : collection_id
    });

    this.$el.html(renderedContent);
    return this;
  }, 

  putForm: function(event){
    event.preventDefault();
    
    this.model.set({
      name: $("#collection-name").val(),
      description: $("#collection-description").val(),
      invite_only: $('input[name=invite-status]:checked').val()
    });

    var self = this;
    this.model.save({},{
      wait: true, 
      success:function(data, response){
        Mediumlarge.router.navigate("/collections/"+self.model.id, true);
      },
      error: function(data, response){
        debugger;
      }
    });
  }
});