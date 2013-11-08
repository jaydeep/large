class CollectionFollower < ActiveRecord::Base
  attr_accessible :collection_id, :follower_id

  validates_presence_of :collection_id, :follower_id

  belongs_to :collection
  belongs_to :follower, class_name: "User"
end
