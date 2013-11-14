object @post

attributes :id, :title, :subtitle, :body

child(:author => :author) do
 attributes :name, :profile_image

 node(:is_current_user) { |a| a.is_current_user?(current_user.id) }
end

node(:read_time_estimation) { |p| @post.read_time_estimation }

node(:already_bookmarked) { |p| @post.already_bookmarked?(current_user.id) }

node(:already_recommended) { |p| @post.already_recommended?(current_user.id) }
