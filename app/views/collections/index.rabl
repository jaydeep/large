collection @collections
attributes :id, :name, :description, :invite_only
child(:owner => :owner) { attributes :name }
node(:num_posts) { |collection| collection.num_posts }
node(:already_following) do |collection| 
  collection.already_following?(current_user.id) 
end