class ResetProductsService

  def reset
    Product.destroy_all
    Product.create(:name => "Grado PS1000 Pro Series Headphone", :image_url => "/assets/41GzNqk3xrL._AA160_.jpg")
    Product.create(:name => "Ultrasone EDITION 10 Headphones", :image_url => "/assets/41lVYBj-gnL._AA160_.jpg")
    Product.create(:name => "Sennheiser HD800 Over-Ear Headphones", :image_url => "/assets/41mRUE8SOSL._AA160_.jpg")
  end

end