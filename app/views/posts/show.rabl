object @post
attributes :id, :title, :subtitle, :body

child(:collection) { attributes :name }

child(:author => :author) { attributes :name, :profile_image }

node(:read_time_estimation) { |p| @post.read_time_estimation }

node(:already_bookmarked) { |p| @post.already_bookmarked?(current_user.id) }

node(:already_recommended) { |p| @post.already_recommended?(current_user.id) }
