class Api::V1::ProductsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]
  before_filter :set_product , :only => [:show , :destroy]
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

  private

  def set_product
    @product = Product.find(params[:id])
  end

end
