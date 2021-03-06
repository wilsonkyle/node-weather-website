const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3c4b33361536f24546ad0acf9f5c6522/' + latitude + ',' + longitude
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined) 
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            // console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degress out. There is a " + body.currently.precipProbability + "% chance of rain. The high today is " + body.daily.data[0].temperatureHigh + " with a low of " + body.daily.data[0].temperatureLow + ".")
        }
    })
}

module.exports = forecast