class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :place, index: true
      t.integer :sanitation
      t.integer :vegetables
      t.integer :meat
      t.integer :service
      t.text :body
      t.string :author
      t.string :max_price
      t.string :min_price
      t.timestamps null: false
    end
    add_foreign_key :reviews, :places
  end
end
