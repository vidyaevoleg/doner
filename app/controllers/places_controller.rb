class PlacesController < ApplicationController
	skip_before_filter :verify_authenticity_token, only: [:create,:destroy,:update]
	before_action :set_place, only: [:show,:destroy,:update,:get_reviews]
	before_action :check_ability, only: :destroy
	respond_to :html, :json
	
	def new
		@place = Place.new
	end

	def create
		@place = current_user.places.create(place_params)
		check_images
		render template: 'places/show.json'
	end

	def index
		@places = Place.all
		respond_with :json
	end

	def update
		@place.update_attributes(place_params)
		check_images 
		render template: 'places/show.json'
	end
	
	def get_places
		@places = Place.includes(:images).includes(:user)
		render template: 'places/all.json' 
	end

	def get_reviews
		@reviews = @place.reviews.includes(:user).includes(:images)
		render template: 'places/reviews.json' 
	end

	def show
		render template: 'places/show.json'
	end
	
	def destroy
		@place.destroy!
		respond_to do |f|
			f.json
			f.html {redirect_to :back}
		end
	end

	private
	
	def check_images
		if params[:place][:images_id]
			images_id = params[:place][:images_id].to_s.split(',')
			bind_image_and_place(images_id)
		end
		if params[:place][:image_url]
			url = params[:place][:image_url]
			@place.images.create(vk_url: url)
		end 
	end


	def bind_image_and_place(images_id)
		if images_id.size>0
			images_id.map do |id|
				image = Image.find(id)
				image.update_attributes(imaginable_id: @place.id,imaginable_type: @place.class.to_s)
			end 
		end
		if @place.images.count > 0
			last_image_id = @place.images.last.id
			@place.images.map do |image|
				image.destroy! unless image.id = last_image_id
			end
		end
	end

	def check_ability
		current_user.id == @place.user.id ? true : return  
	end

	def set_place
		@place = Place.find(params[:id])
	end

	def place_params
		params.require(:place).permit(:street,:metro,:coordinates,:city,:metro_line)
	end

end
