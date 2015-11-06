class PlacesController < ApplicationController
	skip_before_filter :verify_authenticity_token, only: :create
	def new
		@place = Place.new
	end

	def create
#		binding.pry
		@place = current_user.places.create(place_params)
		if @place.save
			render json: @place.to_nice_json
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

	def show
		@place = Place.find(params[:id])
		render json: @place.to_nice_json
	end
	
	def destroy
		@place = Place.find(params[:id])
		@place.destroy!
		redirect_to :back
	end

	private

	def place_params
		params.require(:place).permit(:street,:metro,:coordinates,:city)
	end

end
