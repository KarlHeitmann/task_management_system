require 'rails_helper'

RSpec.describe Book, type: :model do
  it { should validate_presence_of(:title) }

  describe "#borrow" do
    let(:member) { FactoryBot.create(:member) }
    context "when book is available (ie, not borrowed to anyone)" do
      let(:book) { FactoryBot.create(:book) }
      describe "book.borrow return value" do
        it { expect(book.borrow(member_id: member.id)).to be true }
      end

      describe "book.member_id" do
        it do
          expect { book.borrow(member_id: member.id) }.to change(book, :member_id).from(nil).to(member.id)
        end
      end
      it "is expected to change book.borrowed_at from nil to a value between before_time and after_time" do
        # expect { book.borrow(member_id: member.id) }.to change(book, :borrowed_at).from(nil).to(a_value_between(before_time, after_time))
        expect(book.borrowed_at).to be_nil
        before_time = Time.now
        book.borrow(member_id: member.id)
        after_time = Time.now
        expect(book.borrowed_at).to be_between(before_time, after_time)
      end
    end

    context "when book is already borrowed to someone" do
      let(:other_member) { FactoryBot.create(:member, email: "other_member@example.com") }
      let(:book) { FactoryBot.create(:book, member_id: other_member.id, borrowed_at: Time.now) }
      describe "book.borrow return value" do
        it { expect(book.borrow(member_id: member.id)).to be false }
      end

      describe "book.member_id" do
        it { expect { book.borrow(member_id: member.id) }.to_not change(book, :member_id) }
      end
      describe "book.borrowed_at" do
        it { expect { book.borrow(member_id: member.id) }.to_not change(book, :borrowed_at) }
      end
    end
  end

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
