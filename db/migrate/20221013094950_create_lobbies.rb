class CreateLobbies < ActiveRecord::Migration[6.1]
  def change
    create_table :lobbies do |t|
      t.string :title
      t.string :description
      t.string :mode
      t.string :link_code
      t.string :password

      t.timestamps
    end
  end
end
