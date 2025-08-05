class CreateLibrarians < ActiveRecord::Migration[8.0]
  def change
    create_table :librarians do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
