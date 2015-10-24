class Review < ActiveRecord::Base
  belongs_to :place
  has_many :images, as: :imaginable

  attr_reader :images_id

	def rating
		attrs = [self.vegetables,self.meat,self.service,self.sanitation].compact
		if attrs.count > 0
			avarage = (attrs.inject(0){|sum,x| sum + x}/attrs.count).to_f 
		else
			nil
		end
	end
	
	def to_nice_json
		json={}
		json[:id] = id
		json[:vegetables] = vegetables
		json[:meat] = meat
		json[:service] = service
		json[:sanitation] = sanitation
		json[:rating] = rating
		json[:min_price] = min_price
		json[:max_price] = max_price
		json[:body] = body
		json[:author] = author
		json[:date] = created_at
		json[:images] = images.map {|i| i.file.url} if images
		json
	end

end
