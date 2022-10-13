class RenameCategooryFromWords < ActiveRecord::Migration[6.1]
  def change
    rename_column :words, :categoory, :category
  end
end
