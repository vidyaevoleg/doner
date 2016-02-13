class Api::V1::ReviewsController < ApplicationController
	
	respond_to :json
	before_filter :set_review, except: [:create] 

	def create

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
