class EventsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def calendar
        user = User.find(params[:id])

        if !user.nil?
            events_today = user.events.where(:event_date => Date.today.beginning_of_day..Date.today.end_of_day)
            upcoming_events = user.events.where("event_date > ?", Date.today.end_of_day)

            response = {
                events_today: events_today,
                upcoming_events: upcoming_events,
                status: "received from PORT 3000"
            }
            render json: response

        else 
            render json: {
                events_today: nil,
                upcoming_events: nil,
                status: "received from PORT 3000"
            }
        end
    end

    def get_all_events
        user = User.find(params[:id])
        if !user.nil?
            events = user.events

            response = {
                user: user,
                events: events,
                status: "received from PORT 3000"
            }
            render json: response
        else
            render json: {
                user: nil,
                events: nil,
                status: "received from PORT 3000"
            }
        end
    end

    def create_event
        user = User.find(params[:id])
        event = user.events.new(name: params[:name], event_date: params[:event_date])
        if event.save
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: event.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end

    def edit_event
        user = User.find(params[:id])
        event = user.events.find(params[:event_id]) 
        event.name = params[:name]
        event.event_date= params[:event_date]
        if event.save
            response = {
                message: "success",
                status: "received from PORT 3000"
            }
        else
            response = {
                errors: event.errors.full_messages,
                status: "received from PORT 3000"
            }
        end   
        render json: response
    end

    def event
        user = User.find(params[:id])
        event = user.events.find(params[:event_id])
        response = {
            event: event,
            status: "received from PORT 3000"
        }
        render json: response
    end

end

