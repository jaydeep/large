class CollectionInvitation < ActiveRecord::Base
  attr_accessible :collection_id, :user_id

  validates_presence_of :collection_id, :user_id
  validate :collection_is_invite_only

  belongs_to :collection, dependent: :destroy
  belongs_to :user, dependent: :destroy

  def collection_is_invite_only
    unless Collection.find(collection_id).invite_only
      errors.add(:collection, "must be invite only") 
    end
  end
end
