class ReviewsController < ApplicationController
	before_action :set_place, only: :create

	def create
		@review = Review.create(review_params)
		images_id = params[:review][:images_id].to_s.split(',')
		if images_id.size>0
			images_id.map do |id|
				image = Image.find(id)
				binding.pry
				image.update_attributes(imaginable_id: @review.id,imaginable_type: @review.class.to_s)
			end 
		end
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
