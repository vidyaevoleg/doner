class VkpostsController < ApplicationController

	before_action :set_post, only: [:destroy, :approve]
	before_action :set_place, only: :approve
	skip_before_filter :verify_authenticity_token, only: [:approve]

	def update
	
	end

	def index
		@posts = VkPost.unapproved
	end

	def get_post
		@post = if params[:id] 
			begin
				VkPost.find(params[:id])
			rescue ActiveRecord::RecordNotFound
				VkPost.unapproved.first
			end
		else 
			VkPost.unapproved.first
		end
		@next_post_id = @post.next_id
		@prev_post_id = @post.previous_id
	end

	def destroy
		@post.approve!
		render json: {status: 200}
	end

	def approve
		@post.approve!
		create_review
		bind_images
		review_json = JSON.parse(render_to_string(partial: 'reviews/review', locals: {review: @review}))
		render json: {review: review_json}
	end

	private

	def set_post
		@post = VkPost.find(params[:id])
	end 

	def set_place
		@place = Place.find(params[:new_review][:place_id])
	end

	def create_review
		@review = @place.reviews.create(review_params)
	end

	def review_params
		params.require(:new_review).permit(:body,:total,:title,:max_price,:min_price,:vegetables,:meat, :sanitation, :service).merge(user_id: current_user.id)
	end

	def bind_images
		image_urls = params[:new_review][:image_urls]

		if image_urls
			image_urls.split(',').map do |url|
				@review.images.create(vk_url: url)
			end
		end
	end


end
