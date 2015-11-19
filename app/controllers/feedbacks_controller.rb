class FeedbacksController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:create,:destroy,:update]

  def create
    if current_user
      @feedback = current_user.feedbacks.create(feedback_params)
    else 
      @feedback = Feedback.create(feedback_params)
    end

    if params[:feedback][:images_id]
      images_id = params[:feedback][:images_id].to_s.split(',')
      bind_image_and_feedback(images_id)
    end 

    render json: 'ok', status: 200
  rescue
    render json: {}, status: 500
  end

  private

  def feedback_params
    params.require(:feedback).permit(:body,:feedback_type)
  end

  def bind_image_and_feedback(images_id)
    if images_id.size>0
      images_id.map do |id|
        image = Image.find(id)
        image.update_attributes(imaginable_id: @feedback.id,imaginable_type: @feedback.class.to_s)
      end 
    end
  end
end
