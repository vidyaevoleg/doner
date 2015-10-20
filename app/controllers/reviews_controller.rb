class ReviewsController < ApplicationController
	before_action :set_place, only: :create

	

	def create
		@place = @place.reviews.build(:review_params)
	end

	private

	def review_params
		params.require(:review).permit(:body,:author,:price,:rating,:vegetables,:meat,:sanitation,:service)
	end

	def set_place
		@place = Place.find(params[:place_id])
	end
end
