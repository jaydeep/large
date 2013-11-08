class CollectionsController < ApplicationController

  def index
    @collections = Collection.all
    render :index
  end

  def show
    @collection = Collection.find(params[:id])
    @posts = @collection.posts
    render :show
  end

  def new
    @collection = Collection.new
    render :new
  end

  def create
    @collection = Collection.new(params[:collection])
    @collection.owner_id = current_user.id
    if @collection.save
      redirect_to collection_url(@collection)
    else
      flash[:errors] = @collection.errors.full_messages
      render :new
    end
  end

  def edit
    @collection = Collection.find(params[:id])
    render :edit
  end

  def update
    @collection = Collection.find(params[:id])
    if @collection.update_attributes(params[:collection])
      redirect_to collection_url(@collection)
    else
      flash[:errors] = @collection.errors.full_messages
      render :edit
    end
  end

  def destroy
    @collection = Collection.find(params[:id]).destroy
    redirect_to collections_url
  end

end
