class AddColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :title, :string
    add_column :users, :email, :string
    add_column :users, :phone_number, :integer
    add_column :users, :passport_no, :string
    add_column :users, :passport_expiry, :string
    add_column :users, :nationality, :string
    add_column :users, :gender, :string
    add_column :users, :dob, :string
  end
end
