class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]


  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /profile/:id
  def show
    render json: @user
  end

  def retrieve
    @user_ph = User.where(phone_number: params[:phone_number])
    render json: @user_ph
  end

  # POST /users ## when users click on next after submitting phone number
  def create
    # checks if user exists when client press 'Next', since frontend can't differentiate whether it's a POST or PATCH
    # the params[:id] is to handle case when user edits their phone number
    #if (User.exists?(phone_number: params[:phone_number]) || User.exists?(id: params[:id]))
    #   @user = User.where(id: params['id'])
    #   @user.update(user_params)
    # creates a new record if it dosen't exist  
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end 
  end 

  # PATCH/PUT /api/v1/users/:id ## when users click on next buttons
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/profie/delete
  def destroy
    @delete_child = Child.delete_all
    @users = User.delete_all

    render json: @users
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.where(id: params['id'])
    end

    # Assigns a list of allowable attributes through.
    def user_params
      params.require(:user).permit(:display_name, :title, :phone_number, :email, :full_name, :passport_number, 
      :passport_expiry, :nationality, :gender, :dob)
    end
end
