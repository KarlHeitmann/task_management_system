# frozen_string_literal: true

class V1::AuthController < ApplicationController
  def login
    member = Member.find_by(email: params[:email])
    if member&.authenticate(params[:password])
      token = JWT.encode({ member_id: member.id }, Rails.application.credentials.secret_key_base)
      render json: { token:, member: { id: member.id, email: member.email } }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end