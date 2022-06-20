# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


more_movies = [
  {:display_name => 'Aladdin', :title => 'Mr', :email => 'test@gmail.com', :phone_number => '12345678'},
  {:display_name => 'Aladdin1', :title => 'Ms', :email => 'test1@gmail.com', :phone_number => '22345678'},
  {:display_name => 'Aladdin2', :title => 'Dr', :email => 'test2@gmail.com', :phone_number => '32345678'},
  {:display_name => 'Aladdin3', :title => 'Mrs', :email => 'test3@gmail.com', :phone_number => '42345678'},
]

more_movies.each do |t|
    User.create(t)
end