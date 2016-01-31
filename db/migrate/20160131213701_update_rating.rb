class UpdateRating < ActiveRecord::Migration
  def change
  	Place.all.map {|place| place.update_rating }
  end
end
