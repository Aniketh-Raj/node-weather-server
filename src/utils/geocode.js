const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5pa2V0aDEyIiwiYSI6ImNrMG01MTcwbzEzZHAzY28zdzJhdDRtbjMifQ.GDwkkXMZVus8Rqa0uZoKdQ&limit=1'

    request({url, json : true}, (error, {body}) => {
        console.log(url)
        if(error) {
            callback('Unable to connect to GeoLocation service..!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }

    })
}

module.exports = geocode