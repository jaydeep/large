object @post
attributes :id, :title, :subtitle, :body

child(:collection) { attributes :name }

child(:author) { attributes :name }

node(:read_time_estimation) { |p| @post.read_time_estimation }

node(:already_bookmarked) { |p| @post.already_bookmarked? }

node(:already_recommended) { |p| @post.already_recommended? }