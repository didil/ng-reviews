require 'spec_helper'

describe Api::V1::ProductsController do

  describe "index" do
    let(:products) { build_list(:product, 2) }
    before { allow(Product).to receive(:all) { products } }

    it "ok" do
      get :index
      expect(response.body).to eq(ActiveModel::ArraySerializer.new(products, each_serializer: ProductSerializer,root: "products").to_json)
    end

  end

  describe "show" do
    let(:id) { "5" }
    let(:product) { build(:product) }

    before { allow(Product).to receive(:find).with(id) { product } }

    it "ok" do
      get :show, :id => id
      expect(response.body).to eq(ProductSerializer.new(product).to_json)
    end

  end

  context "admin" do
    before do
      @user = FactoryGirl.create(:admin)
      sign_in @user
    end
    describe "create" do

    end
  end


end