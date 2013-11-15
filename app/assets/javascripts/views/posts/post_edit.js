Mediumlarge.Views.PostEdit = Backbone.View.extend({
  template: JST['posts/edit'],
  events: {
    "click #publish" : "putForm",
    "click #draft": "makeDraft"
  },
  
  displayTime: function() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    return str;
  },

  render: function(){
    var title     = this.model.get('title');
    var subtitle  = this.model.get('subtitle');
    var body      = this.model.get('body');
    var collection_id = this.model.get('collection_id');
    var model_id = this.model.id;
    var renderedContent = this.template({
      id: model_id, title : title,
      subtitle : subtitle, body : body,
      collection_id : collection_id
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
    if ( !this.model.get('publish_status') ) {
      this.model.set({
        publish_status: true,
        created_at: this.displayTime()
      });
    }

    this.saveForm();
  },

  saveForm: function(){
    this.model.set({
      title : $("#post-title").val(),
      subtitle: $("#post-subtitle").val(),
      body : $("#post-body").val(),
      collection_id : $("#post-collection").val()
    });

    var self = this;

    this.model.save({}, {
      success:function(data, response){
        //navigates successfully, TODO: but this makes an extra request.
        Mediumlarge.router.navigate('/post/'+self.model.id, true); 
      },
      error:function(data, response){
        debugger;
      }
    });
  }
});