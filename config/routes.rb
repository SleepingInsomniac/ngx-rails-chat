Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  scope :api, defaults: { format: 'json' } do
    resource :authentication, only: [:create, :destroy]
    resources :users do
      collection { get 'me' }
    end
    resources :rooms do
      collection { get 'default' }
    end
  end

end
