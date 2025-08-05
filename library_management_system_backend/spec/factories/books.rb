FactoryBot.define do
  factory :book do
    title { Faker::Book.title }
    author { Faker::Book.author }
    genre { Faker::Book.genre }
    isbn { Faker::Book.isbn }
    total_copies { Faker::Number.between(from: 1, to: 10) }
  end
end
