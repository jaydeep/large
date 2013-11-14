class Post < ActiveRecord::Base
  attr_accessible :title, :subtitle, :body, :collection_id, :publish_status

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

  def self.home_page_recommendations 
    Post.joins(:recommendations).
    group("recommendations.post_id, posts.id").
    order('count(recommendations.post_id)')
  end

  def self.home_page_recommendation_ids
    home_page_recommendations.pluck(:id)
  end

  def self.latest_posts
    order(:created_at).reverse_order.limit(5)
  end

  def self.latest_post_ids
    latest_posts.pluck(:id)
  end

  def self.homePagePosts
    home_page_recommendations + latest_posts
  end

  ##Analytics
  #num of reads/views
  #time spent on article
end