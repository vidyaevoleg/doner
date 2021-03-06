Rails.application.routes.draw do
  get '/get_current_user', to: 'application#get_current_user'
  get '/logout', to: 'application#logout'
  devise_for :users, :controllers => { omniauth_callbacks: "users/omniauth_callbacks"}
  root 'home#index'
  get 'home/manage'
  get 'home/index'
  resources :images 
  resources :feedbacks, only: :create
  resources :places do
    get 'get_places', on: :collection
    get 'get_reviews', on: :member
  end
  resources :reviews
  resources :vkposts, defaults: {format: 'json'} do
    get 'get_post', on: :collection
    post 'approve', on: :member
  end

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :places
      resources :reviews
      resources :users
    end
  end


  namespace :admin do
    get 'upload'
    get 'index'
    get 'vkposts'
    get 'stat'
    resources :feedbacks
    resources :places do
      get 'reviews', on: :member
      get 'delete_review', om: :member
    end
    resources :users do 
      get 'make_admin', on: :member
    end
  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
