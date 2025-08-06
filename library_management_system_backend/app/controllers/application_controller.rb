# frozen_string_literal: true

class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    # debugger
    begin
      # decoded = JWT.decode(header, Rails.application.secrets.secret_key_base)[0]
      decoded = JWT.decode(header, Rails.application.credentials.secret_key_base)[0]
      # @current_member = Member.find(decoded["member_id"])
      set_current_user(decoded["user_type"], decoded["user_id"])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # def current_user
  #   if session[:user_type] == 'librarian'
  #     Librarian.find_by(id: session[:user_id])
  #   elsif session[:user_type] == 'member'
  #     Member.find_by(id: session[:user_id])
  #   end
  # end
  def set_current_user(user_type, user_id)
    @current_user = if user_type == 'librarian'
                      Librarian.find_by(id: user_id)
                    elsif user_type == 'member'
                      Member.find_by(id: user_id)
                    end
  end
end
