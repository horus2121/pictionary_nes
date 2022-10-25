class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :authority
end
