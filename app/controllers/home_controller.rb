class HomeController < ApplicationController
  def index
    @store_opened_url = opened_store_path
  end
  
  def is_opened_store
    render :json => { opened: true }
  end
end