class Api::V1::PlacesController < ApplicationController
	
	respond_to :json
	before_filter :set_place, except: [:index, :create] 

	def index
		@places = Place.all
	end

	def update

	end

	def destroy

	end
	
	private

	def set_place
		@place = Place.find(params[:id])
	end

end
