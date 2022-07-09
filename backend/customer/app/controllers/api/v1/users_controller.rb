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
      # frontend pass primary key as a param e.g. params[:id], then i will check if the id or phone number exists in db,
      # if exists, allow user to update phone number.
       
      # if user edits phone number, it creates a new record instead, find a way to allow them to edit
      # use ID and phone number as checking conditions?
      # extract primary key after finding phone_number
      @user = User.where(phone_number: params['phone_number'])
      # @id = @user['id']
      @user.update(user_params)
  
    else
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    
  end

  # PATCH/PUT /api/v1/profie/:phone_number ## when users click on next buttons
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/profie/:phone_number
  def destroy
    @delete_child = Child.delete_all
    @users = User.delete_all

    render json: @users
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.where(phone_number: params['phone_number'])
    end

    # Assigns a list of allowable attributes through.
    def user_params
      params.require(:user).permit(:display_name, :title, :phone_number, :email, :full_name, :passport_number, 
      :passport_expiry, :nationality, :gender, :dob)
    end
end
