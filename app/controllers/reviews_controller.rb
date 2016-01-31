class ReviewsController < ApplicationController
	skip_before_filter :verify_authenticity_token, only: [:create,:destroy,:update]
	before_action :set_review, only: [:update,:destroy,:show]
	before_action :set_place, only: [:update,:create]
	before_action :check_ability, only: [:destroy,:update]
	
	def create
		@review = @place.reviews.create(review_params)
		save_images
		render json: {review: @review.to_nice_json, place: Place.find(@review.place_id).to_nice_json }
	end


	def update
		@review.update_attributes!(review_params)
		save_images
		render json: {review: @review.to_nice_json, place: Place.find(@review.place_id).to_nice_json }
	end

	def destroy
		@review.destroy
		@place = Place.find(@review.place.id) 
		render json: @place.to_nice_json
	end

	def show
		render json: {review: @review.to_nice_json}
	end

	private

	def save_images
		if params[:review][:images_id]
			images_id = params[:review][:images_id].to_s.split(',')
			bind_image_and_review(images_id)
		end 
	end

	def bind_image_and_review(images_id)
		if images_id.size>0
			images_id.map do |id|
				image = Image.find(id)
				image.update_attributes(imaginable_id: @review.id,imaginable_type: @review.class.to_s)
			end 
		end
	end

	def check_ability
		if current_user.id == @review.user.id
			true
		else
			return
		end
	end

	def review_params
		params.require(:review).permit(:body,:total,:title,:max_price,:min_price,:vegetables,:meat,:anonym,:sanitation,:service,:place_id, :images_id).merge(user_id: current_user.id)
	end

	def set_review
		@review = Review.find(params[:id])
	end

	def set_place
		@place = Place.find(params[:review][:place_id])
	end

end
