class Review < ActiveRecord::Base
  include ActionView::Helpers::SanitizeHelper

  belongs_to :place, counter_cache: :reviews_count, touch: true
  belongs_to :user
  has_many :images, as: :imaginable
  before_save  :parse_links, :n_to_br
  after_save :update_place_rating 
  after_destroy :update_place_rating

  attr_accessor :images_id

  def rating
      # attrs = [self.vegetables,self.meat,self.service,self.sanitation,self.total].compact
      # if attrs.count > 0
      #   avarage = (attrs.inject(0){|sum,x| sum + x}/attrs.count).to_f 
      # else
      #   nil
      # end
      total ? total : 0
  end


  def update_place_rating
    Place.find(place.id).update_rating
    #  place.update_rating # очень странно работает
  end

  def parse_links
      self.body = self.body.to_s.split(' ').map do |word|
          if word.include?('http://') || word.include?('https://') || word.include?('www.')
              word = "<a href='" + word + "' target='_blank'>" + word +"</a>"
          else
              word
          end
      end.join(' ')
  end
  
  def n_to_br
      self.body = self.body.gsub(/\n/, '<br>')
  end
  
  def br_to_n
      body.gsub("<br>", "\r\n")
  end

  def to_format
      strip_tags(self.body)
  end

end
