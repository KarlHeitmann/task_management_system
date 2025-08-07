class Member < ApplicationRecord


  has_secure_password
  validates :email, presence: true, uniqueness: true
  has_many :books

  has_many :overdue_books, -> { where("borrowed_at < ?", Time.now - 14.days) }, class_name: "Book"
  has_many :due_books, -> { where("borrowed_at > ?", Time.now - 14.days) }, class_name: "Book"
end
