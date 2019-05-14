# frozen_string_literal: true

require 'json'

class ShingleController < ApplicationController
  # API_BASE_URL = "https://mdms.owenscorning.com/api/v1/product/shingles?zip=43659"
  def index
    if params.key?(:zip)
      url = (ENV['API_BASE']).to_s + params[:zip] # specifying json format in the URl
      @shingle_active = 0
      @shingle_active = params[:shingle_active] if params.key?(:shingle_active)
      response = Shingle.get(url)
      s = JSON.parse(response.body, symbolize_names: true)
      if response['status'] == '200 OK'
        @all_shingles = s
        @zip = params[:zip]
        @shingle = if params.key?(:shingle)
                     find_uid(s, params[:shingle])
                   else
                     find_uid(s, 'trudefinition-duration')
                   end
      else
        flash[:error] = 'Zip is not valid'
        render 'zip_form'
      end
    else
      flash[:error] = ''
      render 'zip_form'
    end
  end

  def find_uid(s, str)
    s.find { |h1| h1[:uid] == str }
  end
end
