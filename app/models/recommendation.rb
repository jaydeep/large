class Recommendation < ActiveRecord::Base
  attr_accessible :post_id

  validates_presence_of :user_id, :post_id

  belongs_to :post
  belongs_to :user
end
