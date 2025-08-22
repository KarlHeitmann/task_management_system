# frozen_string_literal: true

class Api::V1::AuthController < ApplicationController
  def login
    member = Member.find_by(email: params[:email])
    if member&.authenticate(params[:password])
      secret = Rails.application.credentials.jwt_secret
      token = JWT.encode({ member_id: member.id }, secret)
      render json: { token:, member: { id: member.id, email: member.email } }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end