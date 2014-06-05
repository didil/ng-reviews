Rails.application.routes.draw do

  scope module: 'api' do
    namespace :v1 do
      resources :products
    end
  end

  devise_for :users
end
