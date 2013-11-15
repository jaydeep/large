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

    this.model.set({
      publish_status: true,
      created_at: this.displayTime()
    });
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