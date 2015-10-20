class Place < ActiveRecord::Base
  has_many :images, as: :imaginable
  serialize :coordinates
end
