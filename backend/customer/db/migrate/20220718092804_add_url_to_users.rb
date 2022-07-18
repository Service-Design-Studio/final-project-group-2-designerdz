class AddUrlToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :url, :string
    add_column :users, :image_url, :string
    add_column :users, :is_family, :string
  end
end
