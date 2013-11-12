class RecommendationsController < ApplicationController

  def create
    @recommendation = Recommendation.new do |r| 
      r.post_id = params[:post_id]
      r.user_id = current_user.id
    end
    
    if @recommendation.save
      render :json => @recommendation
    else
      render :json => { :errors => @recommendation.errors.full_messages }, status: 422
    end
  end

  def destroy
    @recommendation = Recommendation.find_by_post_id_and_user_id(
      params[:post_id], current_user.id).delete

    render :json => @recommendation
  end

end
