class CollectionFollowersController < ApplicationController
  
  def create
    @cf = CollectionFollower.new do |cf| 
      cf.collection_id = params[:collection_id]
      cf.follower_id = current_user.id
    end
    
    if @cf.save
      redirect_to collection_url(params[:collection_id])
    else
      flash[:errors] = @cf.errors.full_messages
    end
  end

  def destroy
    @cf = CollectionFollower.find_by_collection_id_and_follower_id(
      params[:collection_id], current_user.id).delete

    redirect_to collections_url
  end

end
