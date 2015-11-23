class AddMetroLineToPlace < ActiveRecord::Migration
  def change
  	add_column :places, :metro_line, :string
  end
end
