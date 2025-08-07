class Book < ApplicationRecord
  belongs_to :member, optional: true
  validates :title, presence: true

  scope :by_title, ->(title) { where("title ILIKE ?", "%#{title}%") if title.present? }
  scope :by_author, ->(author) { where("author ILIKE ?", "%#{author}%") if author.present? }
  scope :by_genre, ->(genre) { where("genre ILIKE ?", "%#{genre}%") if genre.present? }

  def borrow(member_id: )
    return false if self.member_id.present?

    self.member_id = member_id
    self.borrowed_at = Time.now
    save
  end
end
