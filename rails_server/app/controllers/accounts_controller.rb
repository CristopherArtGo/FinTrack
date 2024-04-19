class AccountsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def transactions
        user = User.find(params[:id])

        if !user.nil?
            accounts = user.accounts

            if (!params[:account_id].nil?)
                account_transactions = user.accounts.find(params[:account_id]).transactions.where("created_at >= ?", Date.today.at_beginning_of_month).order(created_at: :desc)
            else
                account_transactions = user.accounts.joins(:transactions).where("transactions.created_at >= ?", Date.today.at_beginning_of_month).select('transactions.*').order(created_at: :desc)
            end

            response = {
                user: user,
                accounts: accounts,
                transactions: account_transactions,
                status: "received from PORT 3000"
            }
            render json: response

        else 
            render json: {
                user: nil,
                accounts: nil,
                transactions: nil,
                status: "received from PORT 3000"
            }
        end

    end

end
