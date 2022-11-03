class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :authority

  belongs_to :lobby
end
