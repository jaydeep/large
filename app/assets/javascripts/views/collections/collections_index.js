Mediumlarge.Views.CollectionsIndex = Backbone.View.extend({
  template: JST['collections/index'], 

  render : function(){
    var renderedContent = this.template({
      collections : this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }

});
