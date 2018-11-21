var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')


var app = express()
app.use(cors())
app.use(bodyParser.json())

var routeMe = require('./route/route_mongo')
app.use('/route',routeMe)

app.get('/', (req, res)=>{
  // res.send('<h1>Express</h1>')
})

app.listen(3004, ()=>{
  console.log('Server aktif di port 3004!')
})