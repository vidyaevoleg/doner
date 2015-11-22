class Admin::FeedbacksController < AdminController
  before_action :set_feedback, only: [:destroy,:show,:update]
  skip_before_filter :verify_authenticity_token
  
  def index
    @feedbacks = Feedback.order(:created_at)
  end
  
  def update

  end

  def show
    # binding.pry
    respond_to do |f|
      f.html {redirect_to :back}
      f.js 
    end
  end

  def destroy
    @feedback.destroy
    respond_to do |f|
      f.html { redirect_to :back }
      f.js
    end
  end


  private

  def set_feedback
    @feedback = Feedback.find(params[:id])
  end

end
