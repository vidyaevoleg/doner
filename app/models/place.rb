class Place < ActiveRecord::Base
  has_many :images, as: :imaginable
  has_many :reviews
  serialize :coordinates

  def rating
  	if self.reviews.count > 0
  		return (self.reviews.map {|review| review.rating}.inject(0){|sum,x| sum+x} / self.reviews.count).to_f.to_s[0..2]
  	end
  	nil
  end

  def min_price
  	if self.reviews.count > 0
  		return self.reviews.map {|rew| rew.min_price}.min
  	end
  	nil
  end

  def max_price
  	if self.reviews.count > 0
  		return self.reviews.map {|rew| rew.max_price}.max
  	end
  	nil
  end

  def vegetables
  	if self.reviews.count > 0
  		return (self.reviews.map {|review| review.vegetables}.inject(0){|sum,x| sum+x} / self.reviews.count).to_i
  	end
  	nil  
  end

  def sanitation
  	if self.reviews.count > 0
  		return (self.reviews.map {|review| review.sanitation}.inject(0){|sum,x| sum+x} / self.reviews.count).to_i
  	end
  	nil 
  end

  def meat
  	if self.reviews.count > 0
  		return (self.reviews.map {|review| review.meat}.inject(0){|sum,x| sum+x} / self.reviews.count).to_i
  	end
  	nil   
  end

  def service
  	if self.reviews.count > 0
  		return (self.reviews.map {|review| review.service}.inject(0){|sum,x| sum+x} / self.reviews.count).to_i
  	end
  	nil 
  end

  def to_nice_json
  	json = {}
  	json[:properties] = {}
  	json[:geometry] = {}
  	json[:properties][:id] = id
  	json[:properties][:rating] = rating
  	json[:properties][:meat] = meat
  	json[:properties][:vegetables] = vegetables
  	json[:properties][:sanitation] = sanitation
  	json[:properties][:service] = service
  	json[:geometry][:type] = 'Point'
  	json[:geometry][:coordinates] = get_coords
  	json[:properties][:street] = street
  	json[:properties][:metro] = metro
  	json
  end

  def get_coords
  	coordinates.tr('[]', '').split(',').map {|coord| coord.to_f}
  end

end
