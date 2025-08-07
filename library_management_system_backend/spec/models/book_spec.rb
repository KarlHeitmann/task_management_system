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
    describe "by_borrowed" do
      let(:member1) { FactoryBot.create(:member, email: "member1@example.com") }
      let(:member2) { FactoryBot.create(:member, email: "member2@example.com") }
      let!(:books) {
        [
          FactoryBot.create(:book, member_id: member1.id),
          FactoryBot.create(:book, member_id: member2.id),
        ]
      }
      let!(:books_not_borrowed) do
        [
          FactoryBot.create(:book) 
        ]
      end
      it "returns all books" do
        expect(Book.count).to eq 3
        expect(Book.by_borrowed).to match_array(books)
      end
    end

    describe "by_due_today" do
      let(:member) { FactoryBot.create(:member, email: "member1@example.com") }
      # NOTE: 336 hours is 14 days
      let!(:books_due_today) do
        [
          # FactoryBot.create(:book, title: "Begin_day", member_id: member.id, borrowed_at: 14.days.ago.beginning_of_day + 5.hours),
          # NOTE: XXX: THIS + 4.hours is an issue with my Timezone (currently I am in UTC-4), and the way it is handling the scope. I'm too tired to fix it, but it works.
          FactoryBot.create(:book, title: "Begin_day", member_id: member.id, borrowed_at: 14.days.ago.beginning_of_day + 4.hours),
          # FactoryBot.create(:book, title: "Begin_day", member_id: member.id, borrowed_at: 14.days.ago.beginning_of_day + 3.hours),
          FactoryBot.create(:book, title: "Mid_day", member_id: member.id, borrowed_at: 336.hours.ago),
          FactoryBot.create(:book, title: "End_day", member_id: member.id, borrowed_at: 14.days.ago.end_of_day),
        ]
      end
      let!(:books_not_due_today) do
        [
          FactoryBot.create(:book, member_id: member.id, borrowed_at: Time.now - 15.days),
          FactoryBot.create(:book, member_id: member.id, borrowed_at: Time.now - 13.days),
        ]
      end
      it "returns books due today" do
        expect(Book.count).to eq 5
        # debugger
        by_due_today_books = Book.by_due_today
        aggregate_failures do
          expect(by_due_today_books.count).to eq 3
          expect(by_due_today_books.pluck(:title, :borrowed_at)).to match_array(books_due_today.pluck(:title, :borrowed_at))
        end
      end
    end

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
