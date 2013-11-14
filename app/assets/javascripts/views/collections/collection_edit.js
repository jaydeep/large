Mediumlarge.Views.CollectionEdit = Backbone.View.extend({
  template: JST['collections/edit'],
  events: {
    "click submit" : "putForm"
  },

  render: function(){
    var title     = this.model.get('title');
    var subtitle  = this.model.get('subtitle');
    var body      = this.model.get('body');
    var renderedContent = this.template({
      title : title, subtitle : subtitle, body : body
    });

    this.$el.html(renderedContent);
  }, 

  putForm: function(event){
    event.preventDefault();
    console.log('this will happen eventually');
  }
});