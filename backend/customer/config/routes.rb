Rails.application.routes.draw do
  namespace :api do #domain/api/
    namespace :v1 do #domain/api/v1
      resources :users #domain/api/v1/users
    end 
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end