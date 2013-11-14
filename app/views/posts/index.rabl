#should probably be two collections
  ##one for recommended
  ##one for latest
collection @posts
attributes :id, :title, :subtitle

if :collection
  child(:collection) do
    attributes :name
  end
end

node(:read_time_estimate) do |p|
  p.read_time_estimation
end

child(:author => :author) do
  attributes :name, :profile_image
end