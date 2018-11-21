var router = require('express').Router()
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var mongodb = require('mongodb')
router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }));

var url = 
'mongodb://hafas:Apass123@localhost:27017/toko'


// route get semua data 
router.get('/data', (req, res)=>{
  mongoClient.connect(url, (error, db)=>{
      var col = db.collection('karyawan')
      col.find({}).toArray((er, data)=>{
          console.log(data)
          res.send(data)
      })
  })
})

router.get('/data/:index', (req, res)=>{
  mongoClient.connect(url, (error, db)=>{
      var col = db.collection('karyawan')
      col.find({}).toArray((er, data)=>{
          console.log(data[req.params.index - 1])
          res.send(data[req.params.index - 1])
      })
  })
})

// route post data ke database
router.post('/data', (req, res)=>{
  mongoClient.connect(url, (error, db)=>{
      var col = db.collection('karyawan')
      col.insertMany([{
          name: req.body.name,
          age: req.body.age, 
          phone: req.body.phone,          
          address: req.body.address,
      }], (error, hasil)=>{
          console.log(hasil)
          res.send(hasil)
      })
  })
})

// edit data tertentu
router.put('/data/:id', (req, res)=>{
  mongoClient.connect(url, (error, db)=>{
      var col = db.collection('karyawan')
      col.updateOne(
          {_id: new mongodb.ObjectID(
              `${req.params.id}`
          )}, 
          {$set: {
              name: req.body.name,
              age: req.body.age, 
              phone: req.body.phone,          
              address: req.body.address,
          }},
          (error, hasil)=>{
              console.log(hasil)
              res.send(hasil)
      })
  })
})

// delete id tertentu
router.delete('/data/:id', (req, res)=>{
  mongoClient.connect(url, (error, db)=>{
      var col = db.collection('karyawan')
      col.deleteOne(
          {_id: new mongodb.ObjectID(
              `${req.params.id}`
          )},
          (error, hasil)=>{
              console.log(hasil)
              res.send(hasil)
      })
  })
})

module.exports = router
