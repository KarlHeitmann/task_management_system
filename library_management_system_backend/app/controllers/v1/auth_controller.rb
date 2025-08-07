# frozen_string_literal: true

class V1::AuthController < ApplicationController
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
end