class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /profile/:phone_number
  def show
    render json: @user
  end


  # POST /users ## when users click on next after submitting phone number
  def create
    if User.exists?(phone_number: params[:phone_number])
      # have to let user handle edits
      nil
    else
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    
  end

  # PATCH/PUT /users/1 ## when users click on next buttons
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.where(phone_number: params['phone_number'])
    end

    # Assigns a list of allowable attributes through.
    def user_params
      params.require(:user).permit(:display_name, :title, :phone_number, :email, :full_name, :passport_no, 
      :passport_expiry, :nationality, :gender, :dob)
    end
end
