# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create some sample books
Book.create!(title: "1984", author: "George Orwell", genre: "Dystopian", isbn: "9780451524935", total_copies: 5)
Book.create!(title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "9780547249650", total_copies: 6)
Book.create!(title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "9780547249650", total_copies: 6)
Book.create!(title: "The Chronicles of Narnia", author: "C.S. Lewis", genre: "Fantasy", isbn: "9780547249650", total_copies: 6)
