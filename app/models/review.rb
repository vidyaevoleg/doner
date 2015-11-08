class Review < ActiveRecord::Base
  belongs_to :place
  belongs_to :user
  has_many :images, as: :imaginable
  before_save :n_to_br

  attr_reader :images_id

	def rating
		# attrs = [self.vegetables,self.meat,self.service,self.sanitation,self.total].compact
		# if attrs.count > 0
		# 	avarage = (attrs.inject(0){|sum,x| sum + x}/attrs.count).to_f 
		# else
		# 	nil
		# end
		total ? total : 0
	end
	
	def n_to_br
		self.body = self.body.gsub(/\n/, '<br>')
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
			body: body.html_safe,
			title: title,
			total: total,
			author: user,
			anonym: anonym,
			date: updated_at
		}
		json[:images] = images.map {|i| {url: i.file.url, id: i.id}} if images
		json
	end

end
