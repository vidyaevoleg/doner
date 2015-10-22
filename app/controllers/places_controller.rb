class PlacesController < ApplicationController

	def new
		@place = Place.new
	end

	def create
		@place = Place.create(place_params)
		if @place.save
			respond_to do |f|
				f.html { redirect_to :back }
			end
		end
	end

	def get_places
		render json: Place.all.map {|place| place.to_nice_json }
	end

	def get_reviews
		place = Place.find(params[:id])	
		reviews = place.reviews.map {|review| review.to_nice_json } if place.reviews.any?
		render json: reviews || nil
	end

	def destroy
		@place = Place.find(params[:id])
		@place.destroy!
		redirect_to :back
	end

	private

	def place_params
		params.require(:place).permit(:street,:metro,:coordinates)
	end

end
