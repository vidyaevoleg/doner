class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,:omniauthable
  has_many :places
  has_many :reviews
  has_many :feedbacks

  def link
    if self.provider == 'Facebook'
      'http://facebook.com/' + self.uid
    elsif self.provider == 'Vkontakte'
      'http://vk.com/' + self.uid
    else
      '#'
    end
  end

  def admin?
    role == 'admin' ? true : false
  end

  def to_nice_json
    json = {
      id: id,
      username: username,
      image_url: image_url,
      link: link,
      places_count: places.count,
      reviews_count: reviews.count,
      role: role
    }
    json
  end

  def self.find_for_facebook_oauth access_token
    if user = User.where(:uid => access_token.extra.raw_info.id).where(provider: 'Facebook').first
      user
    else 
      User.create!(:provider => 'Facebook',
                  :uid => access_token.extra.raw_info.id,
                  :username => access_token.extra.raw_info.name,
                  :image_url => "http://graph.facebook.com/"+access_token.extra.raw_info.id+"/picture?type=small",
                  :email => access_token.extra.raw_info.name.tr(' ','').downcase + '@facebook.com',
                  :password => Devise.friendly_token[0,20]
      ) 
    end
  end

  def self.find_for_vkontakte_oauth access_token
    if user = User.where(:uid => access_token.extra.raw_info.id).where(provider: 'Vkontakte').first
      user
    else 
      User.create!(:provider => 'Vkontakte',
                  :uid => access_token.extra.raw_info.id,
                  :username => access_token.info.name,
                  :image_url => access_token.extra.raw_info['photo_200'],
                  :email => access_token.info.name.tr(' ','').downcase + '@vk.com',
                  :password => Devise.friendly_token[0,20]
      ) 
    end
  end  
end
