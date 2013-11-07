Mediumlarge::Application.routes.draw do
  resource :session, only: [:create, :destroy]
  resources :posts
  
  root :to => "home#index"

  #better way to do the following.
  match 'auth/twitter/callback' => "sessions#create"
  match 'auth/failure', to: redirect('/')
end