Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  post "login" => "users#login"
  post "register" => "users#create"

  get "dashboard/:id" => "users#dashboard"
  get "accounts/:id/" => "accounts#transactions"
  get "accounts/:id/:account_id" => "accounts#transactions"
  get "accounts/:id/:account_id/:category" => "accounts#transactions"
  get "calendar/:id" => "events#calendar"
  get "all_events/:id" => "events#get_all_events"
  # Defines the root path route ("/")
  # root "posts#index"
end
