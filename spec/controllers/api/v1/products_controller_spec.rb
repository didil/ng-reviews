require 'spec_helper'

describe Api::V1::ProductsController do

  let(:id) { "5" }
  let!(:product) { build(:product) }

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
      @user = create(:admin)
      sign_in @user
    end

    describe "resets" do
      before { expect(ResetProductsService).to receive_message_chain(:new, :reset) { product } }
      it "ok" do
        post :reset
        expect(response.body).to eq("true")
      end
    end

    describe "creates" do
      let(:attrs) { {"name" => "My product"} }
      before { expect(Product).to receive(:new).with(attrs) { product } }

      context "ok" do
        before { expect(product).to receive(:save) { true } }
        it "saves" do
          post :create, :id => id, :product => attrs
          expect(response.body).to eq( ProductSerializer.new(product).to_json)
        end
      end

      context "errors" do
        let(:errors) { {name: ["error"]} }
        before do
          expect(product).to receive(:save) { false }
          allow(product).to receive(:errors) { errors }
        end

        it "does not save" do
          post :create, :id => id, :product => attrs
          expect(response.body).to eq(errors.to_json)
          expect(response).to be_unprocessable
        end
      end


    end

    context "with product" do
      before { allow(Product).to receive(:find).with(id) { product } }

      describe "destroy" do
        it "ok" do
          expect(product).to receive(:destroy)
          delete :destroy, :id => id
          expect(response.body).to eq("true")
        end
      end

      describe "updates" do
        let(:attrs) { {"name" => "My product"} }
        context "ok" do
          before { expect(product).to receive(:update).with(attrs) { true } }

          it "updates" do
            put :update, :id => id, :product => attrs
            expect(response.body).to eq("true")
          end
        end

        context "fails" do
          let(:errors) { {name: ["error"]} }
          before do
            expect(product).to receive(:update).with(attrs) { false }
            allow(product).to receive(:errors) { errors }
          end

          it "updates" do
            put :update, :id => id, :product => attrs
            expect(response.body).to eq(errors.to_json)
            expect(response).to be_unprocessable
          end
        end
      end

    end

  end

end