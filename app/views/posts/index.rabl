object false

node(:recommended_posts) do |p|
  Post.home_page_recommendation_ids
end

node(:latest_posts) do |p|
  Post.latest_post_ids
end

node(:posts) do
  partial("posts/posts", :object => @posts)
end

