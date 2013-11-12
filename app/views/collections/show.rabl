object @collection
attributes :id, :name, :description, :invite_only
child(:owner => :owner) { attributes :name }
node(:num_posts) { |c| @collection.num_posts }

child(:posts, :object_root => false) do 
  attributes :id, :title, :subtitle

  node( :already_bookmarked ) do |post| 
    post.already_bookmarked?(current_user.id)
  end

  child(:author => :author) { attributes :name, :profile_image }
end