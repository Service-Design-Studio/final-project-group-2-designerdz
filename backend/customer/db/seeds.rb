# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


more_movies = [
  {:display_name => 'Mah', :title => 'Mr', :email => 'mahyida@gmail.com', :phone_number => '91234567', 
  :full_name => 'Mahyida', :passport_number => '1234567A', :passport_expiry => '22/10/2024', 
  :nationality => 'Malaysian', :gender => 'Male', :dob => '03/03/1933'},

  {:display_name => 'Dah', :title => 'Mr', :email => 'dayima@gmail.com', :phone_number => '98765432'}
]

more_movies.each do |t|
    User.create(t)
end


add_children = [
  {:user_id => '1', :display_name => 'Child1', :title => 'Mr', :email => 'child1@gmail.com', :phone_number => '91234567'},
  {:user_id => '1', :display_name => 'Child2', :title => 'Mr', :email => 'child1@gmail.com', :phone_number => '91234567'},
  {:user_id => '2', :display_name => 'testchild', :title => 'Mr', :email => 'testchild1@gmail.com', :phone_number => '89877855'},
  {:user_id => '3', :display_name => 'testchild2', :title => 'Mr', :email => 'testchild2@gmail.com', :phone_number => '39877855'} # does not work if user[id] 3 does not exist
]

add_children.each do |t|
    Child.create(t)
end