require 'rails_helper'

RSpec.describe Book, type: :model do
  it { should validate_presence_of(:title) }

  describe "Scopes" do
    describe "#by_title" do
      let!(:books) {
        [
          FactoryBot.create(:book, title: "Book 1"),
          FactoryBot.create(:book, title: "Book 2 a"),
          FactoryBot.create(:book, title: "Book 2 b"),
          FactoryBot.create(:book, title: "Book 3"),
        ]
      }
      context "when title provided is nil" do
        it "returns all books" do
          expect(Book.by_title(nil)).to match_array(books)
        end
      end

      context "when title provided is 'ook 2'" do
        it "returns book with title matching 'ook 2'" do
          expect(Book.by_title("ook 2")).to match_array([books[1], books[2]])
        end
      end
    end

    describe "#by_author" do
      let!(:books) {
        [
          FactoryBot.create(:book, author: "Author 1"),
          FactoryBot.create(:book, author: "Author 2"),
          FactoryBot.create(:book, author: "Author 3"),
        ]
      }
      context "when author provided is nil" do
        it "returns all books" do
          expect(Book.by_author(nil)).to match_array(books)
        end
      end

      context "when author provided is 'uthor 2'" do
        it "returns book with author matching 'uthor 2'" do
          expect(Book.by_author("uthor 2")).to match_array([books[1]])
        end
      end
    end

    describe "#by_genre" do
      let!(:books) {
        [
          FactoryBot.create(:book, genre: "Genre 1"),
          FactoryBot.create(:book, genre: "Genre 2"),
          FactoryBot.create(:book, genre: "Genre 3"),
        ]
      }
      context "when genre provided is nil" do
        it "returns all books" do
          expect(Book.by_genre(nil)).to match_array(books)
        end
      end

      context "when genre provided is 'enre 2'" do
        it "returns book with genre matching 'enre 2'" do
          expect(Book.by_genre("enre 2")).to match_array([books[1]])
        end
      end
    end

  end
end
