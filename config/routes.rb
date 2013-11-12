Mediumlarge::Application.routes.draw do
  resource  :session, only: [:create, :destroy]
  resources :posts
  resources :collections
  resource  :collection_follower, only: [:create, :destroy]
  resource  :bookmarks, only: [:create, :destroy]
  resource  :recommendations, only: [:create, :destroy]
  root :to => "home#index"

  #better way to do the following.
  match 'auth/twitter/callback' => "sessions#create"
  match 'auth/failure' => "home#index"
end