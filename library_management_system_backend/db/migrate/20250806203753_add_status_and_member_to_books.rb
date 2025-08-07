class AddStatusAndMemberToBooks < ActiveRecord::Migration[8.0]
  def change
    add_column :books, :borrowed_at, :datetime
    add_column :books, :returned_at, :datetime
    add_reference :books, :member, null: true, foreign_key: true
  end
end
