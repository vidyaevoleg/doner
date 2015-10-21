class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :street
      t.string :metro
      t.string :coordinates

      t.timestamps null: false
    end
  end
end
