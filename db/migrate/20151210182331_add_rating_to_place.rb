class AddRatingToPlace < ActiveRecord::Migration
  def change
  	add_column :places, :rating, :string
  	add_column :places, :reviews_count, :integer, default: 0

  	Place.all.map do |place|
  		place.update(rating: place.updated_rating, reviews_count: place.reviews.count)
  	end
  end
end
