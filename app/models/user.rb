class User < ApplicationRecord
    has_many :chat_messages, dependent: :destroy
    belongs_to :lobby
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :authority, presence: true
end
