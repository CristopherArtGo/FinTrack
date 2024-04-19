class EventsController < ApplicationController
    def calendar
        user = User.find(params[:id])

        if !user.nil?
            events_today = user.events.where(:event_date => Date.today.beginning_of_day..Date.today.end_of_day)
            upcoming_events = user.events.where("event_date > ?", Date.today.end_of_day)


            response = {
                user: user,
                events_today: events_today,
                upcoming_events: upcoming_events,
                status: "received from PORT 3000"
            }
            render json: response

        else 
            render json: {
                user: nil,
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
end

