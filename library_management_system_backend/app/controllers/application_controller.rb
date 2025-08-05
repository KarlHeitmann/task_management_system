# frozen_string_literal: true

class ApplicationController < ActionController::API
  # after_action :set_csrf_cookie
  # skip_forgery_protection
  skip_before_action :verify_authenticity_token

  private
  def current_user
    if session[:user_type] == 'librarian'
      Librarian.find_by(id: session[:user_id])
    elsif session[:user_type] == 'member'
      Member.find_by(id: session[:user_id])
    end
  end

  # def set_csrf_cookie
  #   cookies['xsrf_token'] = form_authenticity_token if protect_against_forgery?
  # end
end
