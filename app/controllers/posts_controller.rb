class PostsController < ApplicationController
  before_filter :require_logged_in_user!, except: [:show]

  def index
    #this will become the route to get the home page
    # and recommended posts
    @posts = Post.homePagePosts
    @current_user_id = current_user.id
    render "index", handlers: [:rabl]
  end

  def show
    #send the json for the post the user has clicked on
    @post = Post.find(params[:id])
    @current_user_id = current_user.id
    render "show", handlers: [:rabl]
  end

  def new
    #this will only be used to send the open collections to the form
    @post = Post.new #TODO how to handle this guy
    @collections = Collection.open_collections(current_user)
    render :json => @collections
  end

  def create
    #this is still the same.
    @post = Post.new(params[:post])
    @post.user_id = current_user.id
    if @post.save
      render "show", handlers: [:rabl]
    else
      render :json => @post.errors.full_messages, status: 422
    end
  end

  # def edit
  #   #like new, only sends open collections
  #   @post = Post.find(params[:id])
  #   @collections = Collection.open_collections(current_user)
  #   render :json => @collections
  # end

  def update 
    #this works largely the same, 
    @post = Post.find(params[:id])
    @post.created_at = params[:created_at] if !!params[:created_at]
    if @post.update_attributes(params[:post])
      render "show", handlers: [:rabl]
    else
      render :json => @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id]).delete
    render :json => { notice: "#{@post.title} has been deleted." } 
  end

end
