class Place < ActiveRecord::Base
  has_many :images, as: :imaginable, dependent: :destroy
  has_many :reviews, dependent: :destroy
  belongs_to :user
  serialize :coordinates
  before_create :cut_city

  def cut_city
    city.split(',').uniq
  end

  def min_price
    if reviews.count > 0
      reviews.map {|review| review.min_price}.compact.min
    else 
      nil
    end  
  end

  def max_price
    if reviews.count > 0
      reviews.map {|review| review.min_price}.compact.max
    else 
      nil
    end  
  end

  def rating
  	if reviews.count > 0
      data = reviews.map {|review| review.rating}.compact
  		rating = (data.inject(0){|sum,x| sum+x}.to_f / data.count.to_f).to_f.round(1)
    else 
      nil
    end
  end

  def min_price
  	if self.reviews.count > 0
  		return self.reviews.map {|rew| rew.min_price}.compact.min
  	end
  	nil
  end

  def max_price
  	if self.reviews.count > 0
  		return self.reviews.map {|rew| rew.max_price}.compact.max
  	end
  	nil
  end

  def vegetables
    data = reviews.map {|review| review.vegetables}.compact
    if data.count > 0
      return (data.inject(0){|sum,x| sum+x} / data.count).to_i
    end
    nil  
  end

  def sanitation
    data = reviews.map {|review| review.sanitation}.compact
    if data.count > 0
      return (data.inject(0){|sum,x| sum+x} / data.count).to_i
    end
    nil 
  end

  def meat
    data = reviews.map {|review| review.meat}.compact
    if data.count > 0
      return (data.inject(0){|sum,x| sum+x} / data.count).to_i
    end
    nil   
  end

  def service
    data = reviews.map {|review| review.service}.compact
    if data.count > 0
      return (data.inject(0){|sum,x| sum+x} / data.count).to_i
    end
    nil 
  end

  def to_nice_json
  	json = {
      properties: {
        id: id,
        rating: rating,
        meat: meat,
        vegetables: vegetables,
        sanitation: sanitation,
        service: service,
        city: city,
        street: street,
        metro: metro,
        metro_line: metro_line,
        author: user,
        min_price: min_price,
        max_price: max_price
      },
      geometry: {
        coordinates: get_coords,
        type: 'Point'
      }
    }
    if reviews.any? 
      json[:properties][:reviews_count] = reviews.count
    else 
      json[:properties][:reviews_count] = 0 
  	end
    if images.any?
      json[:properties][:image] = {url: images.last.file.url}
    end
    json
  end

  def get_coords
  	coordinates.to_s.tr('[]', '').split(',').map {|coord| coord.to_f}
  end

end
