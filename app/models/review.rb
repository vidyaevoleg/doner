class Review < ActiveRecord::Base
  belongs_to :place
  has_many :images, as: :imaginable


	def rating
		attrs = [self.vegetables,self.meat,self.service,self.sanitation]
		sum = attrs.inject(0){|sum,x| sum + x} 
		avarage = (sum/attrs.count).to_i
	end


end
