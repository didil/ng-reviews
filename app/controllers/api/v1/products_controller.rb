class Api::V1::ProductsController < ApplicationController
  before_filter :authenticate_user! , :except => [:index,:show]
  authorize_resource

  def index
    @products = Product.all
    render :json => @products
  end

  def show
    @product = Product.find(params[:id])
    render :json => @product
  end

end
