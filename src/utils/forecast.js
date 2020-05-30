const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=af626ec315a291aed56841cdc467a1e8&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services.', undefined)
        }
        else if(body.error){
            callback("Unable to find the given location report.", undefined)
        }
        else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Humidity is ${body.current.humidity}.`)
        }
    })
}

module.exports = forecast