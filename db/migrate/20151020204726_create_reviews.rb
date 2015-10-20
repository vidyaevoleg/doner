class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :place, index: true
      t.integer :rating
      t.integer :vegetables
      t.integer :meat
      t.integer :service
      t.text :body
      t.string :author
      t.string :price

      t.timestamps null: false
    end
    add_foreign_key :reviews, :places
  end
end
