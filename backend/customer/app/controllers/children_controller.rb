class ChildrenController < ApplicationController
  before_action :set_child, only: %i[ show update destroy ]

  # GET /children
  def index
    @child = Child.all
    render json: @child
  end

  def indexChild
    # hardcoded value to associate child with parent id of '1', can be replaced with params[:id] once a POST is made
    @parent_id = User.where(id: '1')
    @children_record = Child.where(user_id: @parent_phone_number)
    render json: @children_record
  end

  # GET /children/1
  def show
    render json: @child
  end

  # POST /children
  def create
    @child = Child.new(child_params)

    if @child.save
      render json: @child, status: :created, location: @child
    else
      render json: @child.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /children/1
  def update
    if @child.update(child_params)
      render json: @child
    else
      render json: @child.errors, status: :unprocessable_entity
    end
  end

  # DELETE /children/1
  def destroy
    @child.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_child
      @child = Child.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def child_params
      params.require(:child).permit(:display_name, :title, :phone_number, :email, :full_name, :passport_number, 
      :passport_expiry, :nationality, :gender, :dob, :user_id)
    end
end
