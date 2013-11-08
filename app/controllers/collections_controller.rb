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
    @users = User.all
    @invited_user_ids = @collection.invited_user_ids if @collection.invite_only
    render :edit
  end

  def update
    begin
      @collection = Collection.find(params[:id])
      binding.pry
      if @collection.invite_only && params[:invitations][:user_ids]
        @collection.invited_user_ids = params[:invitations][:user_ids] 
      end
      @collection.assign_attributes(params[:collection])

      
      
      @collection.transaction do
        @collection.save!
      end

      redirect_to collection_url(@collection)
    
    rescue ActiveRecord::RecordInvalid => invalid
      flash[:errors] = @collection.errors.full_messages
      render :edit
    end
  end

  def destroy
    @collection = Collection.find(params[:id]).destroy
    redirect_to collections_url
  end

end
