class Review < ActiveRecord::Base
  include ActionView::Helpers::SanitizeHelper

  belongs_to :place, counter_cache: :reviews_count
  belongs_to :user
  has_many :images, as: :imaginable
  before_save  :parse_links, :n_to_br
  after_save :update_place_rating 
  before_destroy :update_place_rating

  attr_reader :images_id

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
    place.update_rating
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
          body_nl: to_format,
          title: title,
          total: total,
          author: user.to_nice_json,
          anonym: anonym,
          date: updated_at
      }
      json[:images] = images.map {|i| {url: i.file.url, id: i.id}} if images
      json
  end

end
