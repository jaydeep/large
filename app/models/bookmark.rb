class Bookmark < ActiveRecord::Base
  attr_accessible :post_id

  validates_presence_of :post_id, :user_id
  
end
