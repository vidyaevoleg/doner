class Feedback < ActiveRecord::Base

  belongs_to :user
  has_many :images, as: :imaginable

end
