class CreateChildren < ActiveRecord::Migration[7.0]
  def change
    create_table :children do |t|
      t.belongs_to :user, foreign_key: true
      t.string :display_name
      t.string :title
      t.string :email
      t.integer :phone_number
      t.string :full_name
      t.string :passport_number
      t.string :passport_expiry
      t.string :nationality
      t.string :gender
      t.string :dob
      t.timestamps
    end
  end
end
