class RenameTypeFromUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :type, :authority
  end
end
