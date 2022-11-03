class AddForeignKeyBetweenUsersLobby < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :lobby_id, :integer
    add_foreign_key :users, :lobbies, null: true 
  end
end
