class PlacesController < ApplicationController
	skip_before_filter :verify_authenticity_token, only: [:create,:destroy,:update]
	before_action :set_place, only: [:show,:destroy,:update,:get_reviews]
	before_action :check_ability, only: :destroy

	def new
		@place = Place.new
	end

	def create
		@place = current_user.places.create(place_params)
		if params[:place][:images_id]
			images_id = params[:place][:images_id].to_s.split(',')
			bind_image_and_place(images_id)
		end 
		render json: @place.to_nice_json
	end

	def update
		@place.update_attributes(place_params)
		if params[:place][:images_id]
			images_id = params[:place][:images_id].to_s.split(',')
			bind_image_and_place(images_id)
		end
		render json: @place.to_nice_json
	end
	
	def get_places
		render json: Place.all.map {|place| place.to_nice_json }
	end

	def get_reviews
		reviews = @place.reviews.map {|review| review.to_nice_json } if @place.reviews.any?
		render json: reviews || nil
	end

	def show
		render json: @place.to_nice_json
	end
	
	def destroy
		@place.destroy!
		respond_to do |f|
			f.json
			f.html {redirect_to :back}
		end
	end

	private
	
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
		if current_user.id == @place.user.id #TODO: or admin 
			true
		else
			return 
		end 
	end

	def set_place
		@place = Place.find(params[:id])
	end

	def place_params
		params.require(:place).permit(:street,:metro,:coordinates,:city)
	end

end
