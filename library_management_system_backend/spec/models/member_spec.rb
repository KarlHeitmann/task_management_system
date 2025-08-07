require 'rails_helper'

RSpec.describe Member, type: :model do
  it { should validate_presence_of(:email) }

  describe "Relations" do
    let(:member) { Member.create!(email: "member@example.com", password: "asdasd") }

    describe "overdue_books" do
      context "when member has no overdue books" do
        let!(:books) do
          FactoryBot.create_list(:book, 5)
        end

        it do
          expect(member.overdue_books).to be_empty
        end
      end
      context "when member has many books, but none are overdue" do
        let!(:books) do
          FactoryBot.create_list(:book, 5, member: member, borrowed_at: 7.days.ago)
        end
        it do
          expect(member.overdue_books).to be_empty
        end 
      end
      context "when member has many books, but two are overdue" do
        let!(:books) do
          FactoryBot.create_list(:book, 5, member: member, borrowed_at: 13.days.ago)
        end
        let(:overdue_books) do
          FactoryBot.create_list(:book, 2, member: member, borrowed_at: 14.days.ago)
        end
        it do
          expect(member.overdue_books).to match_array(overdue_books)
        end 
      end
    end
    describe "due_books" do
      context "when member has no due books" do
        let!(:books) do
          FactoryBot.create_list(:book, 5)
        end

        it do
          expect(member.due_books).to be_empty
        end
      end
      context "when member has many books, but none are due" do
        let!(:books) do
          FactoryBot.create_list(:book, 5, member: member, borrowed_at: 7.days.ago)
        end
        it do
          expect(member.due_books).to match_array(books)
        end 
      end
      context "when member has many books, but two are due" do
        let!(:due_books) do
          FactoryBot.create_list(:book, 5, member: member, borrowed_at: 13.days.ago)
        end
        let(:overdue_books) do
          FactoryBot.create_list(:book, 2, member: member, borrowed_at: 14.days.ago)
        end
        it do
          expect(member.due_books).to match_array(due_books)
        end 
      end
    end
  end

  describe "#with_overdue_books" do
    let(:member) { FactoryBot.create(:member, email: "member@example.com", password: "asdasd") }
    let(:member_with_overdue_books_1) { FactoryBot.create(:member, email: "member_with_overdue_books_1@example.com", password: "asdasd") }
    let(:member_with_overdue_books_2) { FactoryBot.create(:member, email: "member_with_overdue_books_2@example.com", password: "asdasd") }
    let(:member_without_overdue_books_1) { FactoryBot.create(:member, email: "member_without_overdue_books_1@example.com", password: "asdasd") }
    let(:member_without_overdue_books_2) { FactoryBot.create(:member, email: "member_without_overdue_books_2@example.com", password: "asdasd") }
    let!(:books_with_overdue) do
      [
        # FactoryBot.create(:book, member: member_with_overdue_books_1, borrowed_at: 14.days.ago.beginning_of_day + 5.hours),
        # FactoryBot.create(:book, member: member_with_overdue_books_2, borrowed_at: 14.days.ago.beginning_of_day + 7.hours),
        FactoryBot.create(:book, member: member_with_overdue_books_1, borrowed_at: 16.days.ago),
        FactoryBot.create(:book, member: member_with_overdue_books_2, borrowed_at: 15.days.ago),
      ]
    end
    let!(:books_without_overdue) do
      [
        FactoryBot.create(:book, member: member_without_overdue_books_1, borrowed_at: 7.days.ago),
        FactoryBot.create(:book, member: member_without_overdue_books_2, borrowed_at: 13.days.ago),
        FactoryBot.create(:book)
      ]
    end
    it "gets a list of all members with overdue books" do
      expect(Book.count).to eq 5
      members_with_overdue = Member.with_overdue_books
      aggregate_failures do
        expect(members_with_overdue.count).to eq 2
        expect(members_with_overdue.pluck(:id, :email)).to match_array([member_with_overdue_books_1, member_with_overdue_books_2].pluck(:id, :email))
      end
    end
  end
end
