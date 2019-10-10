const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars and views dir
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static dir to serve static pages from
app.use(express.static(publicDir))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No Address query paramter found. Unable to find weather without Address'
        })
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({error})
        }
        if (latitude && longitude) {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData.summary + '. It is currently ' + forecastData.temperature + ' degrees out. There is a ' + forecastData.rainProbability + '% chance of rain',
                    location,
                    address:req.query.address
                })
                // console.log(forecastData.summary + '. It is currently ' + forecastData.temperature + ' degrees out. There is a ' + forecastData.rainProbability + '% chance of rain')
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Missing Search query parameter'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aniket Raj'
    }
    )
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aniket Raj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the Help Page to help you out with your job',
        name: 'Aniketh'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help Article you were looking for was not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Whatever you were looking for was not found'
    })
})

app.listen(port, () => {
    console.log('Server started Successfully on port ' + port)
})