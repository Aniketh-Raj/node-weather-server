const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/688520cf2e4731136e58cba920808aa8/' + lattitude + ',' + longitude + '?units=si'

    request({url, json : true}, (error, {body}) => {
        console.log(url)
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                temperature : body.currently.temperature,
                summary : body.currently.summary,
                rainProbability : body.currently.precipProbability,
                windSpeed : body.currently.windSpeed,
                dailyTempHigh : body.daily.data[0].temperatureHigh,
                dailyTempLow : body.daily.data[0].temperatureLow,
            })
        }
    })
}

module.exports = forecast