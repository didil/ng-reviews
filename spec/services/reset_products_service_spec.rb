require 'spec_helper'

describe ResetProductsService do

  before do
    create(:product)
  end

  it "resets" do
    ResetProductsService.new.reset
    expect(Product.count).to eq 3
    expect(Product.all.pluck(:name,:image_url)).to match_array([["Grado PS1000 Pro Series Headphone", "/assets/41GzNqk3xrL._AA160_.jpg"], ["Ultrasone EDITION 10 Headphones", "/assets/41lVYBj-gnL._AA160_.jpg"], ["Sennheiser HD800 Over-Ear Headphones", "/assets/41mRUE8SOSL._AA160_.jpg"]])
  end

end
