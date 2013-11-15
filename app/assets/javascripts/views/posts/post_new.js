Mediumlarge.Views.PostNew = Backbone.View.extend({
  initialize: function(){
    this.post = new Mediumlarge.Models.Post();
  },

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
    console.log('posting form');
    event.preventDefault();
    this.post.set({publish_status : true});
    this.savePost();
  },

  postFormAsDraft: function(event){
    event.preventDefault();
    console.log('posting form as draft');
    this.post.set({publish_status : false});
    this.savePost();
  },

  savePost: function(){
    this.post.set({
      title : $("#post-title").val(),
      subtitle: $("#post-subtitle").val(),
      body : $("#post-body").val()
    });

    this.post.save({}, {
      success:function(data, response){
        Mediumlarge.latestPosts.unshift(response.id);
        Mediumlarge.posts.add(response);

        console.log('successfully posted');
        //navigates successfully, TODO: but this makes an extra request.
        Mediumlarge.router.navigate('/post/'+response.id, true); 
      },
      error:function(data, response){
        debugger;
      }
    });
  }
});