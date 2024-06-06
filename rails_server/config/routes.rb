Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  post "login" => "users#login"
  post "register" => "users#create"

  get "dashboard/:id" => "users#dashboard"
  patch "edit_budget" => "users#edit_budget"

  get "accounts/:id/" => "accounts#transactions"
  get "accounts/:id/:account_id" => "accounts#transactions"
  get "accounts/:id/:account_id/:category" => "accounts#transactions"

  get "calendar/:id" => "events#calendar"
  get "all_events/:id" => "events#get_all_events"
  get "event/:id/:event_id" => "events#event"
  post "create_event" => "events#create_event"
  patch "edit_event" => "events#edit_event"
  delete "delete_event/:event_id" => "events#delete_event"

  post "create_account" => "accounts#create_account"
  get "account/:id/:account_id" => "accounts#account"
  patch "edit_account" => "accounts#edit_account"
  delete "delete_account/:account_id" => "accounts#delete_account"

  post "create_transaction" => "accounts#create_transaction"
  get "transaction/:id/:transaction_id" => "accounts#transaction"
  patch "edit_transaction" => "accounts#edit_transaction"
  delete "delete_transaction/:transaction_id" => "accounts#delete_transaction"

  # Defines the root path route ("/")
  # root "posts#index"
end
