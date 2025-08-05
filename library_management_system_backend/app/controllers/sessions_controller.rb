# frozen_string_literal: true
class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']

    user = if params[:user_type] == 'librarian'
      Librarian.find_or_create_by(provider: auth.provider, uid: auth.uid) do |l|
        l.name = auth.info.name
        l.email = auth.info.email
      end
    elsif params[:user_type] == 'member'
      Member.find_or_create_by(provider: auth.provider, uid: auth.uid) do |m|
        m.name = auth.info.name
        m.email = auth.info.email
      end
    else
      render json: { error: 'Invalid user type' }, status: :unprocessable_entity and return
    end

    # TODO: Use JWT tokens and throw away session cookie
    session[:user_type] = params[:user_type]
    session[:user_id] = user.id

    render json: { message: 'Logged in successfully', user: user }
  end

  def destroy
    reset_session
    render json: { message: 'Logged out' }
  end
end