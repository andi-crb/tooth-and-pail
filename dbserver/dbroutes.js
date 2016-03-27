var express = require('express')
var path = require('path')
var cors = require('cors')
var bodyparser = require('body-parser')
var uuid = require('uuid')
var compression = require('compression')
var bcrypt = require('bcryptjs')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../datastore/tandp.sqlite3'
  },
  useNullAsDefault: true
})

module.exports = function routes(app) {

  var urlencodedParser = bodyparser.urlencoded({ extended: false })
  app.use(bodyparser.json())

  // GET
  app.get('/', function(req, res) {
    res.send('hello world')
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/recipients', function(req, res) {
    knex('recipients')
    .select('*')
    .then(function(resp) {
      res.send(resp)
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/recipients/:recipientID', function(req, res) {
    // console.log("in GET for user", req.params.recipientID)
    knex('recipients')
    .where('recipients.recipientID', req.params.recipientID)
    .then(function(resp) {
      // console.log ("in get with recipientid", resp)
      res.send(resp[0])
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/donations', function(req, res) {
    // console.log("in GET all donations")
    knex('donations')
    .select('*')
    .then(function(resp) {
      res.send(resp)
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/donations/:donationID', function(req, res) {
    // console.log("in GET donations for a single donation", req.params.donationID)
    knex('donations')
    .where('donations.donationID', req.params.donationID)
    .then(function(resp) {
      res.send(resp[0])
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/donations/donor/:donorID', function(req, res) {
    // console.log("in GET donations for a single donor", req.params.donorID)
    knex('donations')
    .where('donations.donorID', req.params.donorID)
    .select('*')
    .then(function(resp) {
      res.send(resp)
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/donations/recipient/:recipientID', function(req, res) {
    // console.log("in GET donations for a single recipient", req.params.recipientID)
    knex('donations')
    .where('donations.recipientID', req.params.recipientID)
    .select('*')
    .then(function(resp) {
      res.send(resp)
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/donors', function(req, res) {
    // console.log("in GET all donors")
    knex('donors')
    .select('*')
    .then(function(resp) {
      res.send(resp)
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  app.get('/donors/:donorID', function(req, res) {
    // console.log("in GET donors by donorID", req.params.donorID)
    knex('donors')
    .where('donors.donorID', req.params.donorID)
    .then(function(resp) {
      res.send(resp[0])
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})
  app.get('/donors/name/:donorName', function(req, res) {
    // console.log("in GET donors by donorName", req.params.donorName)
    knex('donors')
    .where('donors.donorName', req.params.donorName)
    .then(function(resp) {
      res.send(resp[0])
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})
  app.get('/donors/email/:email', function(req, res) {
    // console.log("in GET donors by email", req.params.email)
    knex('donors')
    .where('donors.email', req.params.email)
    .then(function(resp) {
      res.send(resp[0])
    })
    // .catch(function(err){
    //   console.log("ERROR! ", err)
    // })
})

  // ENCRYPTION

//   app.post('/encrypt', function(req, res) {
//     bcrypt.genSalt(10, function(err, salt) {
//       if (err) { console.log("ERROR GENERATING SALT: ", err); return }
//       bcrypt.hash(req.body.password, salt, (err, hash) => {
//         if (err) { console.log("ERROR ENCRYPTING: ", err); return }
//         res.send(hash)
//     })
//   })
// })

//   app.post('/unencrypt', function(req, res) {
//     bcrypt.compare(req.body.password, req.body.passwordHash, function(err, resp) {
//     if (resp === true) {
//       console.log("password returned match TRUE")
//       res.send(true)
//     } else {
//       console.log("password returned match FALSE")
//       res.send(false)
//     }
//   })
// })

  // POST

  app.post('/donors', function(req, res) {
    console.log("in POST to donors", req.body)
    var newId = uuid.v4()
    knex('donors')
    .insert({
      donorID: newId ,
      donorName: req.body.donorName,
      passwordHash: req.body.passwordHash,
      email: req.body.email
    })
    .then(function(resp) {
      res.send(resp)
    })
  })

  app.post('/donations', function(req, res) {
    console.log("in POST to donations", req.body)
    var newId = uuid.v4()
    knex('donations')
    .insert({
      donationID: newId,
      donorID: req.body.donorID,
      recipientID: req.body.recipientID,
      amount: req.body.amount
    })
    .then(function(resp) {
      res.send(resp)
    })
  })

  app.post('/recipients', function(req, res) {
    var newId = uuid.v4()
    knex('recipients')
      .insert({
        recipientID: newId ,
        name: req.body.Name,
        imgURL: req.body.imgURL,
        received: req.body.received,
        target: req.body.target,
        sobStory: req.body.sobStory
      })
      .then(function(resp) {
          res.send(resp)
      })
    })

// PUT
    app.put('/recipients/:recipientID', function(req, res) {
      console.log("in dbroutes PUT recp")
      knex('recipients')
        .where('recipients.recipientID', req.params.recipientID)
        .update({
          name: req.body.Name,
          imgURL: req.body.imgURL,
          received: req.body.received,
          target: req.body.target,
          sobStory: req.body.sobStory
        })
        .then(function(resp) {
            res.send(resp)
        })
      })

}
