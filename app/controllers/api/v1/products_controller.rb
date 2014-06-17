class Api::V1::ProductsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]
  before_filter :set_product, :only => [:show, :destroy , :update]
  authorize_resource

  def index
    @products = Product.all
    render :json => @products
  end

  def show
    render :json => @product
  end

  def destroy
    @product.destroy
    render :json => true
  end

  def reset
    ResetProductsService.new.reset
    render :json => true
  end

  def update
    if @product.update(product_params)
      render :json => true
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name)
  end

end
