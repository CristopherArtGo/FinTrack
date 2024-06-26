class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        user_input = {
            first_name: params[:first_name],
            last_name: params[:last_name],
            email_address: params[:email_address],
            password: params[:password],
            password_confirmation: params[:password_confirmation]
        }
        user = User.new(user_input)
        if user.save
            user =  User.where(email_address: user.email_address)[0]
            response = {
                message: "User created successfuly!",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: user.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end


    def login
        user = User.where(email_address: params[:email_address])[0]
        if !user.nil?
            if Digest::SHA2.hexdigest("#{user.salt}--#{params[:password]}") === user.encrypted_password
                response = {
                    user: user,
                    status: "received from PORT 3000"
                }
                render json: response
            else
                render json: null
            end    
        else 
            render json: null
        end
    end

    def dashboard
        user = User.find(params[:id])
        if !user.nil?
            accounts = user.accounts
            budget = user.budget
            account_transactions = []
            accounts.each do |account| 
                account_transactions.push(account.transactions.where("created_at >= ?", Date.today.at_beginning_of_month))
            end
            
            response = {
                accounts: accounts,
                budget: budget,
                transactions: account_transactions,
                status: "received from PORT 3000"
            }
            render json: response
        else 
            render json: {
                accounts: nil,
                budget: nil,
                transactions: nil,
                status: "received from PORT 3000"
            }
        end

    end

    def edit_budget
        user = User.find(params[:id])
        budget = user.budget
        
        budget.category_1 = params[:category_1]
        budget.category_2 = params[:category_2]
        budget.category_3 = params[:category_3]
        budget.category_4 = params[:category_4]
        budget.category_5 = params[:category_5]
        budget.category_6 = params[:category_6]
        budget.category_7 = params[:category_7]
        budget.category_8 = params[:category_8]
        budget.category_9 = params[:category_9]

        if budget.save
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: budget.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end
end
