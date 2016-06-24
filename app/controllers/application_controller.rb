class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include Cacher
  skip_before_action :verify_authenticity_token
  protect_from_forgery with: :null_session


  def get_current_user
  	if current_user
      user = JSON.parse(render_to_string(partial: 'users/user.json', locals: {user: current_user}))
  		render json: {user: user }
  	else
  		render json: {user: nil }
  	end
  end

  def logout
  	sign_out(current_user)
  	render json: {exit: 'ok'}
  end

  def after_sign_out_path_for(resource_or_scope)
    request.env["HTTP_X_XHR_REFERER"]
  end
  
  
end
