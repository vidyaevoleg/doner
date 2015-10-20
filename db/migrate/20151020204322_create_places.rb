class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :street
      t.string :metro
      t.string :coordinates
      t.integer :rating
      t.integer :vegetables
      t.integer :meat
      t.integer :sanitation
      t.integer :service

      t.timestamps null: false
    end
  end
end
