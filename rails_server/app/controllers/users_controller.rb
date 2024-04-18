class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def login
        user = User.where(email_address: params[:email_address])[0]
        if !user.nil?
            response = {
                user: user,
                status: "received from PORT 3000"
            }
            render json: response
        # else
        #     render json: "No User found"
        else 
            render json: null
        end
    end
end
