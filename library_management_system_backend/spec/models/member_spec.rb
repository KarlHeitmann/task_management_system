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
end
