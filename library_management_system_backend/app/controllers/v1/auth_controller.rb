# frozen_string_literal: true

class V1::AuthController < ApplicationController
  before_action :authorize_request, only: :me
  def login
    member = Member.find_by(email: params[:email])
    if member&.authenticate(params[:password])
      token = JWT.encode({ user_id: member.id, user_type: 'member' }, Rails.application.credentials.secret_key_base)
      render json: { token:, user: { id: member.id, email: member.email, user_type: 'member' } }, status: :ok
    else
      librarian = Librarian.find_by(email: params[:email])
      if librarian&.authenticate(params[:password])
        token = JWT.encode({ user_id: librarian.id, user_type: 'librarian' }, Rails.application.credentials.secret_key_base)
        render json: { token:, user: { id: librarian.id, email: librarian.email, user_type: 'librarian' } }, status: :ok
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end
  end

  def me
    if @current_user.class.name == "Member"
      books = @current_user.books
      render json: {
        email: @current_user.email, user_type: @current_user.class.name,
        overdue_books: @current_user.overdue_books,
        due_books: @current_user.due_books,
        books:
      }
    else
      # A dashboard showing total books, total borrowed books, books due today,
      # and a list of members with overdue books.
      render json: {
        email: @current_user.email,
        user_type: @current_user.class.name,
        total_books: Book.count,
        total_borrowed_books: Book.by_borrowed.count,
        books_due_today: Book.by_due_today,
        members_with_overdue_books: Member.with_overdue_books
      }
    end
  end
end