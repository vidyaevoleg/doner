class Review < ActiveRecord::Base
  belongs_to :place
  has_many :images, as: :imaginable
end
