class AddInGameColumnToLobbies < ActiveRecord::Migration[6.1]
  def change
    add_column :lobbies, :in_game, :boolean
  end
end
