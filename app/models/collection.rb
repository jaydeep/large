class Collection < ActiveRecord::Base
  attr_accessible :name, :description, :invite_only
  validates_presence_of :name, :description, :owner_id
  validates_inclusion_of :invite_only, :in => [true, false]
  validates_uniqueness_of :name

  belongs_to :owner, class_name: "User"
  has_many :posts

  has_many :collection_followers
  has_many :followers, through: :collection_followers

  has_many :collection_invitations
  has_many :invited_users, through: :collection_invitations, source: :user

  def contribution_status
    invite_only ? "Invite Only" : "Public"
  end

  def num_posts
    posts.count
  end

  def already_following?(user_id)
    follower_ids.include?(user_id)
  end

  def self.open_collections(user)
    # anyone || owner || you have permission to post in the invite_only column
    Collection.where("invite_only = ? OR owner_id = ? OR id IN (?) ", 
      false, user.id, user.invited_collection_ids )
  end

  def is_owner?(user_id)
    owner_id == user_id
  end
end
