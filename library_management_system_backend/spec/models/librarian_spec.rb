require 'rails_helper'

RSpec.describe Librarian, type: :model do
  it { should validate_presence_of(:email) }
end
