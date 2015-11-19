class Admin::FeedbacksController < AdminController
  before_action :set_feedback, only: [:destroy,:show,:update]

  def index
    @feedbacks = Feedback.order(:created_at)
  end
  
  def update

  end

  def show
    respond_to do |f|
      f.html 
      f.js 
    end
  end

  def destroy
    @feedback.destroy
    respond_to do |f|
      f.js
    end
  end


  private

  def set_feedback
    @feedback = Feedback.find(params[:id])
  end

end
