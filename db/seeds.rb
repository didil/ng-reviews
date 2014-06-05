# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user = CreateAdminService.new.call
puts 'CREATED ADMIN USER: ' << user.email


p "Creating products ..."
Product.where(:name => "Grado PS1000 Pro Series Headphone").find_or_create_by(:image_url =>"/assets/41GzNqk3xrL._AA160_.jpg")
Product.where(:name => "Ultrasone EDITION 10 Headphones").find_or_create_by(:image_url =>"/assets/41lVYBj-gnL._AA160_.jpg")
Product.where(:name => "Sennheiser HD800 Over-Ear Headphones").find_or_create_by(:image_url =>"/assets/41mRUE8SOSL._AA160_.jpg")
p "Done creating products"