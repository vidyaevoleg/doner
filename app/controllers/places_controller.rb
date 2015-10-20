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
		render json: {}
	end

	def destroy
		@place = Place.find(params[:id])
		@place.destroy!
		redirect_to :back
	end

	private
	
	def place_params
		params.require(:place).permit(:street,:metro,:coordinates,:rating,:vegetables,:meat,:sanitation,:service)
	end

end
