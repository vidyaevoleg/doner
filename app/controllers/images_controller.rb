class ImagesController < ApplicationController
	# before_action :set_imaginable, only: :create
	def create
		@image = Image.new(file: params[:file])
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
	
	def set_imaginable
		type = params[:imaginable_type].classify.constatize
		id = params[:imaginable_id]
		@imaginable = type.find(id)
	end
end
