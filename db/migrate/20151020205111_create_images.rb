class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :file
      t.string :description
      t.string :imaginable_type
      t.integer :imaginable_id

      t.timestamps null: false
    end
  end
end
