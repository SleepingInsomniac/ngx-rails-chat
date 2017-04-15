Rails.application.routes.draw do
  scope :api, defaults: { format: 'json' } do
    resource :authentication, only: [:create, :destroy]
    resources :users do
      collection do 
        get 'me'
      end
    end
  end
end
