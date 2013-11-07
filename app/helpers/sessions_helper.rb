module SessionsHelper
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_logged_in_user!
    !!@current_user
  end

end
