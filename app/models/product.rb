# == Schema Information
#
# Table name: products
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  image_url  :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Product < ActiveRecord::Base

  validates_presence_of :name
  validates_uniqueness_of :name

end
