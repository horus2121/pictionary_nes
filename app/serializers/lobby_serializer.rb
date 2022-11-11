class LobbySerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :mode, :link_code, :user_id, :in_game

  has_many :users
end
