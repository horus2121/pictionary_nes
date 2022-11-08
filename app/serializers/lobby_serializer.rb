class LobbySerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :mode, :link_code, :user_id

  has_many :users
end
