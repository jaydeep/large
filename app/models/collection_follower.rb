class CollectionFollower < ActiveRecord::Base
  attr_accessible :collection_id, :follower_id

  validates_presence_of :collection_id, :follower_id

  belongs_to :collection, dependent: :destroy
  belongs_to :follower, class_name: "User", dependent: :destroy
end
