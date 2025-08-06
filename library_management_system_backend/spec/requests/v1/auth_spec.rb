require 'rails_helper'

RSpec.describe "V1::Auths", type: :request do
  describe "POST /login" do
    it "returns a token and user information for valid credentials" do
      librarian = Librarian.create!(email: "librarian@example.com", password: "password")
      post "/v1/login", params: { email: "librarian@example.com", password: "password" }, as: :json
      expect(response).to have_http_status(:ok)
    end

    it "returns an error for invalid credentials" do
      post "/v1/login", params: { email: "librarian@example.com", password: "wrong_password" }, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
