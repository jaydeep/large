class Post < ActiveRecord::Base
  attr_accessible :title, :subtitle, :body, :collection_id

  validates_presence_of :title, :subtitle, :body

  #validate profanity in titles? 
  belongs_to :author, class_name: "User", foreign_key: :user_id,  dependent: :destroy
  belongs_to :collection
  
  #TODO:has many comments
  #TODO:has many recommendors

  #TODO:num of recommendations
  has_many :recommendations
  has_many :recommendors, through: :recommendations, source: :user

  has_many :bookmarks
  has_many :bookmarkers, through: :bookmarks, source: :user

  def already_bookmarked?(user_id)
    bookmarker_ids.include?(user_id)
  end

  def already_recommended?(user_id)
    recommendor_ids.include?(user_id)
  end

  def read_time_estimation
    num_words / 200
  end

  def num_words
    body.split(' ').count
  end

  ##Analytics
  #num of reads/views
  #time spent on article
end