class CollectionFollowersController < ApplicationController
  
  def create
    @cf = CollectionFollower.new do |cf| 
      cf.collection_id = params[:collection_id]
      cf.follower_id = current_user.id
    end
    
    if @cf.save
      render :json => @cf
    else
      render :json => { :errors => @cf.errors.full_messages }, status: 422
    end
  end

  def destroy
    @cf = CollectionFollower.find_by_collection_id_and_follower_id(
      params[:collection_id], current_user.id).delete

    render :json => @cf
  end

end
