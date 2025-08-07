class Member < ApplicationRecord


  has_secure_password
  validates :email, presence: true, uniqueness: true
  has_many :books

  has_many :overdue_books, -> { where("borrowed_at < ?", Time.now - 14.days) }, class_name: "Book"
  has_many :due_books, -> { where("borrowed_at > ?", Time.now - 14.days) }, class_name: "Book"

  def self.with_overdue_books
    # These are wrong, the final uncommented one is good. I misunderstood the instructions when building this method...
    # joins(:books).merge(Book.by_due_today)
    # NOTE: Just to make sure it will get no repeated elements, I'm not going to buld any more test cases today. Let's call it a day
    # joins(:books).merge(Book.by_due_today).distinct
    joins(:overdue_books).distinct
  end
end
