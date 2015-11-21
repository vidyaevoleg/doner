jQuery ->
	Morris.Line
		element: 'annual'
		data: $('#chart').data('visits')
		xkey: 'time_at'
		ykeys: ['visits']
		labels: ['Посещаемость сайта']
		parseTime: false
	Morris.Donut
	  element: 'device'
	  data: $('#chart-device').data('devices')
	Morris.Donut
	  element: 'geo'
	  data: $('#chart-geo').data('geo')