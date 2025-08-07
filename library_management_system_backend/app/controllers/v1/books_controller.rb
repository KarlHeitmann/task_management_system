# frozen_string_literal: true

# TODO: Add authorization for different users
class V1::BooksController < ApplicationController
  before_action :set_book, only: %i[ show update destroy ]
  before_action :authorize_request, except: %i[ index show ]

  # GET /books
  def index
    @books = Book
               .by_title(params[:q])
               .or(Book.by_genre(params[:q]))
               .or(Book.by_author(params[:q]))
    render json: @books
  end

  # GET /books/1
  def show
    render json: @book
  end

  # POST /books
  def create
    return head :unauthorized unless @current_user.is_a?(Librarian)

    @book = Book.new(book_params)

    if @book.save
      render json: @book, status: :created
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    book_result = if @current_user.is_a? Librarian
                    if params[:book].empty?
                      @book.return
                    else
                      @book.update(book_params)
                    end
                  else
                    # @book.update(borrow_params.merge(borrowed_at: Time.now))
                    @book.borrow(member_id: @current_user.id)
                  end

    if book_result
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    return head :unauthorized unless @current_user.is_a?(Librarian)

    @book.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def book_params
      params.expect(book: [ :title, :author, :genre, :isbn, :total_copies ])
    end

    def borrow_params
      params.expect(book: [ :member_id ])
    end
end
