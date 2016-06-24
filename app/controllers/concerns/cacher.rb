module Cacher
  
  def data_cache(key, time=2.minutes)
    return yield if caching_disabled?
    output = Rails.cache.fetch(key, {expires_in: time}) do
      yield
    end 
    return output
  rescue
     return yield
  end

  def caching_disabled?
    ActionController::Base.perform_caching.blank?
  end

end
