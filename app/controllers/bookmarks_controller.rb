class BookmarksController < ApplicationController
  
  def create
    @bookmark = Bookmark.new do |r| 
      r.post_id = params[:post_id]
      r.user_id = current_user.id
    end
    
    if @bookmark.save
      render :json => @bookmark
    else
      render :json => { :errors => @bookmark.errors.full_messages }, status: 422
    end
  end

  def destroy
    @bookmark = Bookmark.find_by_post_id_and_user_id(
      params[:post_id], current_user.id).delete

    render :json => @bookmark
  end
end
