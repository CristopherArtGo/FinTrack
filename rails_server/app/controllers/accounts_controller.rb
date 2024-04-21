class AccountsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def transactions
        user = User.find(params[:id])

        if !user.nil?
            accounts = user.accounts
            params[:account_id] = nil if params[:account_id] === "nil"
            if (params[:account_id].nil? and params[:category].nil?)
                account_transactions = user.accounts.joins(:transactions).where("transactions.created_at >= ?", Date.today.at_beginning_of_month).select('transactions.*').order("transactions.created_at DESC")
            elsif (!params[:account_id].nil? and !params[:category].nil?)
                account_transactions = user.accounts.find(params[:account_id]).transactions.where("transactions.created_at >= ? AND transactions.category = ?", Date.today.at_beginning_of_month, params[:category]).select('transactions.*').order("transactions.created_at DESC")
            elsif (!params[:account_id].nil?)
                account_transactions = user.accounts.find(params[:account_id]).transactions.where("created_at >= ?", Date.today.at_beginning_of_month).order(created_at: :desc)
            elsif (!params[:category].nil?)
                account_transactions = user.accounts.joins(:transactions).where("transactions.category = ?", params[:category]).select('transactions.*').order("transactions.created_at DESC")
            end

            if (!params[:account_id].nil?)
                current_account = Account.find(params[:account_id])
            end

            response = {
                accounts: accounts,
                transactions: account_transactions,
                current_account: current_account,
                status: "received from PORT 3000"
            }
            render json: response

        else 
            render json: {
                accounts: nil,
                transactions: nil,
                current_account: nil,
                status: "received from PORT 3000"
            }
        end
    end

    def create_account
        user = User.find(params[:id])
        account = Account.new(name: params[:name], amount: params[:amount], user: user)
        if account.save
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: account.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end

    def create_transaction
        user = User.find(params[:id])
        account = user.accounts.find(params[:account_id])
        transaction = account.transactions.new(description: params[:description], category: params[:category], amount: params[:amount], notes: params[:notes], is_expense: params[:is_expense])
        if transaction.save
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: transaction.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end

    def edit_account
        user = User.find(params[:id])
        account = user.accounts.find(params[:account_id])
        account.name = params[:name]
        account.amount= params[:amount]
        if account.save
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: account.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end

    def account
        user = User.find(params[:id])
        account = user.accounts.find(params[:account_id])
        response = {
            account: account,
            status: "received from PORT 3000"
        }
        render json: response
    end

    def delete_account
        puts params
        account = Account.find(params[:account_id])

        if account.destroy
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: account.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end

    def transaction
        user = User.find(params[:id])
        transaction = Transaction.find(params[:transaction_id])
        response = {
            transaction: transaction,
            status: "received from PORT 3000"
        }
        render json: response
    end

    def edit_transaction
        user = User.find(params[:id])
        transaction = Transaction.find(params[:transaction_id])

        transaction.account = Account.find(params[:account_id])
        transaction.description = params[:description]
        transaction.category = params[:category]
        transaction.amount = params[:amount]
        transaction.notes = params[:notes]
        transaction.is_expense = params[:is_expense]

        if transaction.save
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: transaction.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end


    def delete_transaction
        puts params
        transaction = Transaction.find(params[:transaction_id])

        if transaction.destroy
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: transaction.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end
end
