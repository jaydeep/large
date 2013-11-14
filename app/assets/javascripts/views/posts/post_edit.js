Mediumlarge.Views.PostEdit = Backbone.View.extend({
  template: JST['posts/edit'],
  events: {
    "click submit" : "putForm"
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

  putForm: function(event){
    event.preventDefault();
    console.log('this will happen eventually');
  }
});