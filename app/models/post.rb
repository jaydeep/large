class Post < ActiveRecord::Base
  attr_accessible :title, :subtitle, :body, :collection_id

  validates_presence_of :title, :subtitle, :body

  #validate profanity in titles? 
  belongs_to :author, class_name: "User", foreign_key: :user_id,  dependent: :destroy
  belongs_to :collection

  #TODO:has many comments
  #TODO:has many recommendors

  #TODO:num of recommendations
  
  ##Analytics
  #num of reads/views
  #time spent on article
end