class UpdatePlaceRating < ActiveRecord::Migration
  def change
  	Place.all.map do |place|
  		place.update_rating
	end
  end
end
