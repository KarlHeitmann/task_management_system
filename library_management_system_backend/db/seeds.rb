# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create new member
Member.create!(email: "member@example.com", password: "asdasd")

# Create a new librarian
Librarian.create!(email: "librarian@example.com", password: "asdasd")

# Create some sample books
Book.create!(title: "1984", author: "George Orwell", genre: "Dystopian", isbn: "9780451524935", total_copies: 5)
Book.create!(title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "9780547249650", total_copies: 6)
Book.create!(title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "9780547249650", total_copies: 6)
Book.create!(title: "The Chronicles of Narnia", author: "C.S. Lewis", genre: "Fantasy", isbn: "9780547249650", total_copies: 6)

# Create a book that is borrowed
Book.create!(
  title: "Camino de Perfección", author: "Santa Teresa de Avila", genre: "Religious", isbn: "9788425216622", total_copies: 1,
  borrowed_at: 7.days.ago,
  member: Member.create(email: "member2@example.com", password: "asdasd"),
)

# Create a book that is borrowed and overdue
Book.create!(
  title: "El libro de la sabiduría", author: "Santa Teresa de Avila", genre: "Religious", isbn: "9788425216622", total_copies: 1,
  borrowed_at: 15.days.ago,
  member: Member.create(email: "member3@example.com", password: "asdasd"),
)
