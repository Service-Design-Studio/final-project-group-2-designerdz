Rails.application.routes.draw do
  resources :children
  namespace :api do #domain/api/
    namespace :v1 do #domain/api/v1
      # resource routing, declare common routes e.g. get,post,put,delete
      resources :users #domain/api/v1/users 
 
    end 
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # this route is needed if not will have 500 internal server error, undefined method 'user_url' for #<Api::V1::UsersController:0x....>
  post 'api/v1/users' => 'users#create', :as => 'user'

  # manually setting the uri routes for get and patch
  get  'api/v1/users/:phone_number(.:format)', to: 'api/v1/users#retrieve'
  delete 'api/v1/profile/delete', to: 'api/v1/users#destroy'

  # Defines the root path route ("/")
  # root "articles#index"

  ### routes for Child model
  # catergorizes based on user_id field and returns all record of that parent's children
  get 'parent/', to: 'children#indexChild'
end