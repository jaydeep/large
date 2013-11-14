class User < ActiveRecord::Base
  has_many :posts
  has_many :owned_collections, 
  class_name: "Collection", 
  foreign_key: :owner_id
  
  has_many :collection_followers, foreign_key: :follower_id
  has_many :followed_collections, 
    through: :collection_followers,
    source: :collection

  has_many :collection_invitations
  has_many :invited_collections, 
    through: :collection_invitations,
    source: :collection

  def self.from_omniauth(auth)
    where(auth.slice('provider', 'uid')).first || create_with_omniauth(auth)
  end


  def self.create_with_omniauth(auth)

    me = self.new do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['name']
      user.description = auth['info']['description']
      user.location = auth['info']['location']
      user.twitter_handle = "@" + auth['info']['nickname']
      user.twitter_url = auth['info']['urls']['Twitter']
      user.profile_image = auth['info']['image']
    end

    me.save
  end

  def is_current_user?(current_user_id)
   current_user_id == self.id
  end

  def collections
    owned_collections + followed_collections
  end
end
