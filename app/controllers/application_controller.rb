class ApplicationController < ActionController::Base
  extend SessionsHelper
  protect_from_forgery
end
