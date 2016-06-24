class Place < ActiveRecord::Base
  has_many :images, as: :imaginable, dependent: :destroy
  has_many :reviews, dependent: :destroy
  belongs_to :user
  serialize :coordinates
  before_create :cut_city


  def update_rating
    place = self
    new_rating = if place.reviews.any?
                  ((2 * place.reviews_count.to_f + (place.reviews.map {|r| r.rating.to_i}.inject(0,&:+).to_f/place.reviews_count)) / 2).round(2)
                else
                  1
                end
    place.update(rating: new_rating)
  end

  def cut_city
    city.split(',').uniq
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

  def get_coords
    coordinates.to_s.tr('[]', '').split(',').map {|coord| coord.to_f}
  end

end
