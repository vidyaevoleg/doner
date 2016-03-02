class ImagesController < ApplicationController
	skip_before_filter :verify_authenticity_token, only: [:create,:destroy]
	before_action :check_ability, only: :destroy
	
	def create
		@image = Image.new(file: params[:file] || params[:image][:file])
		if @image.save
			render json: {image: @image}
		else
			render json: {},status: 500
		end
	end

	def destroy
		image = Image.find(params[:id])
		image.destroy!
		render json: {}
	end
	
	private

	def image_params
		params.require(:image).permit(:image)
	end
	
	def check_ability
		if current_user
			true
		else
			return
		end
	end

	def set_imaginable
		type = params[:imaginable_type].classify.constatize
		id = params[:imaginable_id]
		@imaginable = type.find(id)
	end
end
