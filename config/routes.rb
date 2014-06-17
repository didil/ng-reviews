Rails.application.routes.draw do

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :products do
        collection do
          post "reset", :to => "products#reset"
        end
      end
    end
  end

  devise_for :users
end
