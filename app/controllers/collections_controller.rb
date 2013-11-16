class CollectionsController < ApplicationController
  before_filter :require_logged_in_user!, except: [:show]
  
  def index
    @collections = Collection.all
    @current_user_id = current_user.id
    render "index", handlers: [:rabl]
  end

  def show
    @collection = Collection.find(params[:id])
    @current_user_id = current_user.id
    render "show", handlers: [:rabl]
  end

  def create
    #this is still largely the same
    @collection = Collection.new(params[:collection])
    @collection.owner_id = current_user.id
    if @collection.save
      render "show", handlers: [:rabl]
    else
      render :json => @collection.errors.full_messages, status: 422
    end
  end

  def edit #TODO fix this
    #figure out what the best way to do this would be. 
    @collection = Collection.find(params[:id])
    @users = User.all #change this to invitable users
    @invited_user_ids = @collection.invited_user_ids if @collection.invite_only
    render :json => @users
  end

  def update
    begin
      @collection = Collection.find(params[:id])
      if params[:collection][:invite_only] && params[:invitations]
        @collection.invited_user_ids = params[:invitations][:user_ids] 
      end
      @collection.assign_attributes(params[:collection])

      @collection.transaction do
        @collection.save!
      end

      render "show", handlers: [:rabl]
    
    rescue ActiveRecord::RecordInvalid => invalid
      render :json => @collection.errors.full_messages, status: 422
    end
  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.posts = []
    @collection.destroy
    render :json => @collection
  end

end
