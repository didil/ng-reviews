require 'spec_helper'

describe Api::V1::ProductsController do
  before do
    @user = FactoryGirl.create(:admin)
    sign_in @user
  end

  describe "index" do
    let(:products) { build_list(:product, 2) }
    before { allow(Product).to receive(:all) { products } }

    it "ok" do
      get :index
      expect(response.body).to eq(products.map { |product|
        ProductSerializer.new(product)
      }.to_json)
    end

  end

end