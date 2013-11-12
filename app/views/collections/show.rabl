object @collection
attributes :id, :name, :description, :invite_only
child(:owner => :owner) { attributes :name }
node(:num_posts) { |c| @collection.num_posts }
child(:posts, :object_root => false) do 
attributes :id, :title, :subtitle
child(:author => :author) { attributes :name }
end