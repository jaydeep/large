Mediumlarge.Views.PostEdit = Backbone.View.extend({
  template: JST['posts/edit'],
  events: {
    "click #publish" : "putForm",
    "click #draft": "makeDraft"
  },

  render: function(){
    var title     = this.model.get('title');
    var subtitle  = this.model.get('subtitle');
    var body      = this.model.get('body');
    var renderedContent = this.template({
      id: this.model.id, title : title,
      subtitle : subtitle, body : body
    });

    this.$el.html(renderedContent);
    return this;
  }, 

  makeDraft: function(event){
    event.preventDefault();
    this.model.set({publish_status : false });
    this.saveForm();
  },

  putForm:function(event){
    event.preventDefault();
    this.model.set({publist_status: true});
    this.saveForm();
  },

  saveForm: function(){
    this.model.set({
      title : $("#post-title").val(),
      subtitle: $("#post-subtitle").val(),
      body : $("#post-body").val()
    });

    var self = this;

    this.model.save({}, {
      success:function(data, response){
        Mediumlarge.posts.set(response);

        //navigates successfully, TODO: but this makes an extra request.
        Mediumlarge.router.navigate('/post/'+self.model.id, true); 
      },
      error:function(data, response){
        debugger;
      }
    });
  }
});