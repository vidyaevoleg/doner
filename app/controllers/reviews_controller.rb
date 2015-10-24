class ReviewsController < ApplicationController
	before_action :set_place, only: :create

	def create
		@place.reviews.create(review_params)
		redirect_to '/#place/' + @place.id.to_s
	end

	private

	def review_params
		params.require(:review).permit(:body,:author,:max_price,:min_price,:rating,:vegetables,:meat,:sanitation,:service,:place_id)
	end

	def set_place
		@place = Place.find(params[:review][:place_id].to_i)
	end
end
