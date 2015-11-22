module StatisticsHelper

	def month_data(visits)
		(4.weeks.ago.to_date..Date.today).map do |date|
		  	{
		  		time_at: date.strftime("%d.%m"),
		  		visits: visits.find_all {|v| v['started_at'].to_date == date }.size
		  	}
	  	end
	end
	def device_data(visits)
		Visit.pluck(:device_type).uniq.map do |dev| {
			label: dev,
			value:	visits.find_all {|v| v['device_type'] == dev}.size
		}
		end
	end

	def geo_data(visits)
		Visit.pluck(:country).to_a.map {|v| v == nil ? 'Неизвестно' : v }.uniq.map do |geo|
			{
				label: geo,
			 	value: visits.find_all {|v| v['country'] == geo}.size
			}
		end
	end

	def new_users_today
		# User.all.find_all {|user| user.created_at.to_date == Date.today.to_date}.count
		User.where("created_at >= ?", Time.zone.now.beginning_of_day).count
	end

	def today_visits
		Visit.where("started_at >= ?", Time.zone.now.beginning_of_day).count
	end

	def today_places
		Place.where("created_at >= ?", Time.zone.now.beginning_of_day).count
	end

	def today_reviews
		Review.where("created_at >= ?", Time.zone.now.beginning_of_day).count
	end

	def today_images
		Image.where("created_at >= ?", Time.zone.now.beginning_of_day).count
	end

	def today_feedbacks
		Feedback.where("created_at >= ?", Time.zone.now.beginning_of_day).count
	end

end