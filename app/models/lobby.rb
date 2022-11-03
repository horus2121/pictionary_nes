class Lobby < ApplicationRecord
    has_many :chat_messages, dependent: :destroy
    has_many :users
    belongs_to :user

    validates :title, presence: true
    validates :mode, presence: true
    validates :user_id, uniqueness: true
end
