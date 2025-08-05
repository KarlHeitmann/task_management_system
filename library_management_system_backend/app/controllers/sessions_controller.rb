# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    debugger
    auth = request.env['omniauth.auth']
    user_type = request.env.dig('omniauth.params', 'user_type')

    user_model = case user_type
                 when 'member' then Member
                 when 'librarian' then Librarian
                 else render json: { error: 'Invalid user type' }, status: :unprocessable_entity and return
                 end

    user = user_model.find_or_create_by(provider: auth.provider, uid: auth.uid) do |u|
      u.name = auth.info.name
      u.email = auth.info.email
    end

    # If you want to use cookies:
    session[:user_id] = user.id
    session[:user_type] = user_type

    # OR generate a JWT (optional)
    token = JWT.encode({ user_id: user.id, user_type: user_type }, Rails.application.secret_key_base)

    redirect_to "http://localhost:5173/auth/success?token=#{token}&user_type=#{user_type}"
  end

  def failure
    render json: { error: "Authentication failed" }, status: :unauthorized
  end
end