object @post

attributes :id, :title, :subtitle, :body

child(:collection, :unless => lambda { |p| p.collection.nil? }) do
  attributes :name
end

child(:author => :author) do
 attributes :name, :profile_image  

 node(:is_current_user) do |a| 
    a.is_current_user?(@current_user_id) 
  end
end

node(:read_time_estimation) do |p| 
  @post.read_time_estimation
end

node(:already_bookmarked) do |p| 
  @post.already_bookmarked?(@current_user_id)
end

node(:already_recommended) do |p| 
  @post.already_recommended?(@current_user_id) 
end