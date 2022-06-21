class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :display_name
      t.string :title
      t.string :email
      t.integer :phone_number
      t.string :full_name
      t.string :passport_no
      t.string :passport_expiry
      t.string :nationality
      t.string :gender
      t.string :dob
      t.timestamps
    end
  end
end
