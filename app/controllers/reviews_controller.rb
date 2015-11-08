class ReviewsController < ApplicationController
	before_action :set_place, only: :create
	before_action :set_review, only: [:update,:destroy,:show]
	before_action :check_ability, only: [:destroy,:update]
	skip_before_filter :verify_authenticity_token, only: [:create,:destroy]
	def create
		@review = current_user.reviews.create(review_params)
		if params[:review][:images_id]
			images_id = params[:review][:images_id].to_s.split(',')
			bind_image_and_review(images_id)
		end 
		render json: {}
	end


	def update
		@review.update_attributes(review_params)
		if params[:review][:images_id]
			images_id = params[:review][:images_id].to_s.split(',')
			bind_image_and_review(images_id)
		end 
		render json: {}
	end

	def destroy
		@review.destroy
		respond_to do |f|
			f.json
			f.html {redirect_to :back}
		end
	end

	def show
		render json: {review: @review.to_nice_json}
	end

	private

	def bind_image_and_review(images_id)
		if images_id.size>0
			images_id.map do |id|
				image = Image.find(id)
				image.update_attributes(imaginable_id: @review.id,imaginable_type: @review.class.to_s)
			end 
		end
	end

	def check_ability
		if current_user.id = @review.user.id
			true
		else
			return
		end
	end

	def review_params
		params.require(:review).permit(:body,:total,:title,:max_price,:min_price,:vegetables,:meat,:sanitation,:service,:place_id)
	end

	def set_review
		@review = Review.find(params[:id])
	end

	def set_place
		@place = Place.find(params[:review][:place_id].to_i)
	end

end
