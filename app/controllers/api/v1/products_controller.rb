class Api::V1::ProductsController < ApplicationController
  before_filter :authenticate_user!
  authorize_resource

  def index
    @products = Product.all

    render :json => @products
  end

end
