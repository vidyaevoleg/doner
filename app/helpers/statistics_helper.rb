module StatisticsHelper

	def month_data
		per_day = Visit.where("started_at > ?",1.month.ago).order(started_at: :desc).group_by {|visit| visit.started_at.to_date}
		per_day.sort_by {|obj| obj[0].to_datetime}.map do |day|
			{
				time_at: day[0].to_datetime.strftime("%d.%m.%y"),
				values: day[1].count 
			}
		end
	end

	def device_data
		all_count = Visit.count
		answer = []
		Visit.group(:device_type).count.map do |device, count|
			answer << (device + ' - ' + (100 * count/all_count).round(2).to_s + '%')
		end
		answer.join(',')
	end

	%w(user place review).map do |instance|
		define_method(instance + '_per_day') do
			clazz = instance.capitalize.constantize
			per_day = clazz.where("created_at > ?",1.month.ago).order(created_at: :desc).group_by {|visit| visit.created_at.to_date}
			per_day.map do |day|
				{
					time_at: day[0].to_datetime.strftime("%d.%m.%y"),
					values: day[1].count 
				}
			end.reverse
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