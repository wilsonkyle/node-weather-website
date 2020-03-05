const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine, views and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kyle Wilson'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kyle Wilson'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kyle Wilson',
        helpText: 'I need some help'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // return res.send({
            //     error: error
            // })
            return res.send({ error }) // shorthand version
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                // location: location,
                location, // shorthand version
                forecast: forecastData
            })
        })
    })
})

// test just to learn api basics
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

// app.com/help 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Kyle Wilson', 
        errorMessage: 'Help page not found!'
    })
})

// app.com 404
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Generic 404',
        name: 'Kyle Wilson', 
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})

