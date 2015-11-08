class PlacesController < ApplicationController
	skip_before_filter :verify_authenticity_token, only: [:create,:destroy,:update]
	before_action :set_place, only: [:show,:destroy,:update,:get_reviews]
	before_action :check_ability, only: :destroy

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

	def update
	end
	
	def get_places
		render json: Place.all.map {|place| place.to_nice_json }
	end

	def get_reviews
		reviews = @place.reviews.map {|review| review.to_nice_json } if @place.reviews.any?
		render json: reviews || nil
	end

	def show
		render json: @place.to_nice_json
	end
	
	def destroy
		@place.destroy!
		respond_to do |f|
			f.json
			f.html {redirect_to :back}
		end
	end

	private

	def check_ability
		if current_user.id == @place.user.id #TODO: or admin 
			true
		else
			return 
		end 
	end

	def set_place
		@place = Place.find(params[:id])
	end

	def place_params
		params.require(:place).permit(:street,:metro,:coordinates,:city)
	end

end
