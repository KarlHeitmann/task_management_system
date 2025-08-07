require "rails_helper"

RSpec.describe V1::BooksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/v1/books").to route_to("v1/books#index")
    end

    it "routes to #show" do
      expect(get: "/v1/books/1").to route_to("v1/books#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/v1/books").to route_to("v1/books#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/v1/books/1").to route_to("v1/books#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/v1/books/1").to route_to("v1/books#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/v1/books/1").to route_to("v1/books#destroy", id: "1")
    end
  end
end
