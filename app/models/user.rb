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
      'http://vk.com/id' + self.uid
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
      username: username_dec,
      image_url: avatar,
      link: link_dec,
      places_count: places.count,
      reviews_count: reviews.count,
      role: role
    }
    json
  end

  def username_dec
    role == 'admin' ? 'Администрация Topdoner' : username
  end

  def avatar
    role == 'admin' ? 'assets/logo-sphere.png' : image_url 
  end 

  def link_dec
    role == 'admin' ? '/' : link
  end

  def update_photo url
    self.update!(image_url: url)
  end

  def self.create_from_params user_params
    provider = user_params['provider']
    uid = user_params['uid']
    username = user_params['username']
    image_url = user_params['image_url']

    user = User.create(
                  provider: provider,
                  uid: uid,
                  username: username,
                  email: username + '@' + provider + '.com',
                  image_url: image_url,
                  password: Devise.friendly_token[0,20] 
                )
    user
  end

  def self.registrated? user_params
    provider = user_params['provider'].capitalize
    uid = user_params['uid']
    User.find_by(uid: uid, provider: provider)
  end

  def self.find_for_facebook_oauth access_token
    if user = User.where(:uid => access_token.extra.raw_info.id).where(provider: 'Facebook').first
      if user.image_url != access_token.extra.raw_info['photo_200']
        user.update_photo access_token.extra.raw_info['photo_200']
      end
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
      if user.image_url != access_token.extra.raw_info['photo_200']
        user.update_photo access_token.extra.raw_info['photo_200']
      end
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
