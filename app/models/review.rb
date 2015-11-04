class Review < ActiveRecord::Base
  belongs_to :place
  belongs_to :user
  has_many :images, as: :imaginable

  attr_reader :images_id

	def rating
		attrs = [self.vegetables,self.meat,self.service,self.sanitation,self.total].compact
		if attrs.count > 0
			avarage = (attrs.inject(0){|sum,x| sum + x}/attrs.count).to_f 
		else
			nil
		end
	end
	
	def to_nice_json
		json={
			id: id,
			vegetables: vegetables,
			meat: meat,
			service: service,
			sanitation: sanitation,
			rating: rating,
			min_price: min_price,
			max_price: max_price,
			body: body,
			title: title,
			total: total,
			author: user,
			date: created_at
		}
		json[:images] = images.map {|i| i.file.url} if images
		json
	end

end
