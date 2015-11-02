class AddTotalAndTitleToReviews < ActiveRecord::Migration
  def change
  	add_column :reviews, :total, :integer
  	add_column :reviews, :title, :string
  end
end
