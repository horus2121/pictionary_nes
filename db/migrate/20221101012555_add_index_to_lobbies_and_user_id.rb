class AddIndexToLobbiesAndUserId < ActiveRecord::Migration[6.1]
  def change
    add_column :lobbies, :user_id, :integer
    add_index :lobbies, :user_id, unique: true
  end
end
