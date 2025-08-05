# frozen_string_literal: true

# class Users::OmniauthCallbacksController < ApplicationController
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    user = User.from_omniauth(request.env['omniauth.auth'])

    if user.persisted?
      # Use your own token system here (JWT or session)
      token = JsonWebToken.encode(user_id: user.id) # if using JWT

      render json: { token:, user: { id: user.id, email: user.email, name: user.name } }, status: :ok
    else
      render json: { error: 'Authentication failed' }, status: :unauthorized
    end
  end
end
