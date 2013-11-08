class Collection < ActiveRecord::Base
  validates_presence_of :name, :description, :owner_id
  validates_inclusion_of :invite_only, :in => [true, false]
  validates_uniqueness_of :name

  belongs_to :owner, class_name: "User"
  has_many :posts
  has_many :collection_followers
  has_many :followers, through: :collection_followers

  def contribution_status
    invite_only ? "Invite Only" : "Public"
  end
end
