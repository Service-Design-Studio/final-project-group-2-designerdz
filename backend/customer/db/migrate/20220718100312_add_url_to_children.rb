class AddUrlToChildren < ActiveRecord::Migration[7.0]
  def change
    add_column :children, :image_name, :string
  end
end
