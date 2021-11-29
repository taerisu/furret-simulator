if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js')
}

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`)
}

function get() {
	navigator.geolocation.getCurrentPosition(success, error, {
		enableHighAccuracy: true,
		timeout: 1000,
		maximumAge: 0
	})

	setTimeout(get, 1000)
}

function measure(lat1, lon1, lat2, lon2) {
	var R = 6378.137
	var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180
	var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	var d = R * c

	return d * 1000
}

function success(pos) {
	var crd = pos.coords

	x1 = x2
	y1 = y2
	x2 = crd.latitude
	y2 = crd.longitude

	score = Number(measure(x1, y1, x2, y2) * 1000)

	if (score != NaN) scoreElement.innerHTML = score
}

let x1,
	x2,
	y1,
	y2 = 0.0
let scoreElement = document.getElementById('score')

get()

function sync() {
	localStorage.score = score
}

score = localStorage.score ? localStorage.score : 0

setTimeout(sync, 20000)
