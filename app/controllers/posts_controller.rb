class PostsController < ApplicationController
  before_filter :require_logged_in_user!, except: [:show]

  def index
    @posts = Post.all
    render :index
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def new
    @post = Post.new
    render :new
  end

  def create
    @post = Post.new(params[:post])
    @post.user_id = 2
    if @post.save
      redirect_to post_url(@post)
    else
      flash[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def edit
    @post = Post.find(params[:id])
    render :edit
  end

  def update 
    @post = Post.find(params[:id])
    if @post.update_attributes(params[:post])
      redirect_to post_url(@post)
    else
      flash[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  def destroy
    @post = Post.find(params[:id]).delete
    flash[:notice] = "#{@post.title} has been deleted."
    redirect_to root_url #may want to change this to user home later
  end

end
