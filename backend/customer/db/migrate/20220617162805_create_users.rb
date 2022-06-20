class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :display_name
      t.string :title
      t.string :email
      t.integer :phone_number
      t.timestamps
    end
  end
end
