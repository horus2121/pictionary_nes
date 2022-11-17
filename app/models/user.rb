class User < ApplicationRecord
    belongs_to :lobby, optional: true
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :authority, presence: true
end
