class User < ActiveRecord::Base

  def self.from_omniauth(auth)
    where(auth.slice('provider', 'uid')).first || create_with_omniauth(auth)
  end


  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['name']
    end
  end

end
