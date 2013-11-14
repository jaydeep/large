collection @posts
attributes :id, :title, :subtitle

child(:collection, :unless => lambda { |p| p.collection.nil? }) do
  attributes :name
end

node(:read_time_estimate) do |p|
  p.read_time_estimation
end

child(:author => :author) do
  attributes :name, :profile_image
end