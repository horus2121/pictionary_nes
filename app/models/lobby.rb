class Lobby < ApplicationRecord
    validates :title, presence: true
    validates :mode, presence: true
end
