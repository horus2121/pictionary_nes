Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => "/cable"

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/enter_lobby', to: 'lobby_sessions#create'
  delete '/quit_lobby', to: 'lobby_sessions#destroy'

  post '/chat_messages', to: 'chat_messages#create'

  resources :lobbies, only: [:index, :show, :create, :destory]
end
