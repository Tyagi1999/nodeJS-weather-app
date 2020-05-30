const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views function
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/help', (req, res)=>{
    res.render('help', {
        helptext : 'Helping you',
        title : 'Help',
        name : 'Adarsh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About me',
        name : 'Adarsh'
    })
})

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather',
        name : 'Adarsh'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide a address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({erorr})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term.'
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title : '404',
        name : 'Adarsh Tyagi',
        errorMessage : 'Help article not found.'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title : '404',
        name : 'Adarsh Tyagi',
        errorMessage : 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log("server is up on port "+port)
})