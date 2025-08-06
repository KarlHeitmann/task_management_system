class Book < ApplicationRecord
  validates :title, presence: true

  scope :by_title, ->(title) { where("title ILIKE ?", "%#{title}%") if title.present? }
  scope :by_author, ->(author) { where("author ILIKE ?", "%#{author}%") if author.present? }
  scope :by_genre, ->(genre) { where("genre ILIKE ?", "%#{genre}%") if genre.present? }
end
