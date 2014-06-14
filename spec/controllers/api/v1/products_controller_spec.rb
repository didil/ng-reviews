require 'spec_helper'

describe Api::V1::ProductsController do

  let(:id) { "5" }
  let(:product) { build(:product) }

  describe "index" do
    let(:products) { build_list(:product, 2) }
    before { allow(Product).to receive(:all) { products } }

    it "ok" do
      get :index
      expect(response.body).to eq(ActiveModel::ArraySerializer.new(products, each_serializer: ProductSerializer, root: "products").to_json)
    end

  end

  describe "show" do
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
    describe "destroy" do
      before { allow(Product).to receive(:find).with(id) { product } }

      it "ok" do
        expect(product).to receive(:destroy)
        delete :destroy, :id => id
        expect(response.body).to eq("true")
      end

    end
  end


end