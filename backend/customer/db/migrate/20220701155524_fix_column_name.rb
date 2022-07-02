class FixColumnName < ActiveRecord::Migration[7.0]
  def change

    rename_column :users, :passport_no, :passport_number
  end
end
