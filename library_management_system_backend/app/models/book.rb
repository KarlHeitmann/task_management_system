class Book < ApplicationRecord
  belongs_to :member, optional: true
  validates :title, presence: true

  scope :by_title, ->(title) { where("title ILIKE ?", "%#{title}%") if title.present? }
  scope :by_author, ->(author) { where("author ILIKE ?", "%#{author}%") if author.present? }
  scope :by_genre, ->(genre) { where("genre ILIKE ?", "%#{genre}%") if genre.present? }
  scope :by_borrowed, -> { where("member_id IS NOT NULL") }
  scope :by_due_today, -> { where(borrowed_at: 14.days.ago.beginning_of_day..14.days.ago.end_of_day) }


  def borrow(member_id:)
    return false if self.member_id.present?

    self.member_id = member_id
    self.borrowed_at = Time.now
    save
  end

  def return
    self.member_id = nil
    self.returned_at = Time.now
    save
  end
end
