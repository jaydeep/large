Mediumlarge.Views.PostNew = Backbone.View.extend({
  template: JST['posts/new'],
  events: {
    "click #publish" : "postForm",
    "click #draft": "postFormAsDraft"
  },

  render: function(){
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    return this;
  },

  postForm: function(event){
    event.preventDefault();
    console.log('post-new: this is getting posted.');
    var post =  new Mediumlarge.Models.Post({
      title : $("#post-title").val(),
      subtitle: $("#post-subtitle").val(),
      body : $("#post-body").val()
    });

    debugger;
    post.save({}, {
      success:function(data, response){
        console.log('successfully posted, hopefully.');
        //navigates successfully, TODO: but this makes an extra request.
        Mediumlarge.router.navigate('/post/'+post.id, true); 
      },
      error:function(data, response){
        debugger;
      }
    })
  },

  postFormAsDraft: function(event){
    event.preventDefault();
    console.log('this button DOES NOTHING!');
  }
});