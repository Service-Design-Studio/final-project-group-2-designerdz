# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


more_movies = [
  {:display_name => 'Mah', :title => 'Mr', :email => 'mahyida@gmail.com', :phone_number => '91234567', 
  :full_name => 'Mahyida', :passport_no => '1234567A', :passport_expiry => '22/10/2025', :nationality => 'Malaysian', :gender => 'Male', :dob => '03/03/1933'}
]

more_movies.each do |t|
    User.create(t)
end