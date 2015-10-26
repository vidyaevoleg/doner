class AddCityToPlace < ActiveRecord::Migration
  def change
    add_column :places, :city, :string
  end
end
