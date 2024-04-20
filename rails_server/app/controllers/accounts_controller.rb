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

end
