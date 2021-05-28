const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require("mongoose")
require('dotenv').config()
const bodyParser=require("body-parser")

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

const uri="";//Use you own

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


let exerciseSchema = new mongoose.Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: String
})

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [exerciseSchema]
})

let User = mongoose.model('User', userSchema)
let Exercise = mongoose.model('Exercise', exerciseSchema);

app.post("/api/users", bodyParser.urlencoded({extended: false}),(req, res)=>{
  let newUser = new User({username: req.body.username});
  newUser.save((error, savedUser) => {
    if(!error){
      res.json({username: savedUser.username, _id: savedUser.id})
    }
  })
})

app.get("/api/users", (req, res) => {
  User.find({}, (error, arrayOfUsers) => {
    if(!error){
      res.json(arrayOfUsers)
    }
  })
})

app.post("/api/users/:_id/exercises", bodyParser.urlencoded({extended: false}), (request, response) => {
  let iid=request.params._id;
  console.log(typeof iid);

  let newExerciseItem = new Exercise({
    // _id: request.params._id,
    description: request.body.description,
    duration: parseInt(request.body.duration),
    date: request.body.date
  })
  
  if(newExerciseItem.date === ''){
    newExerciseItem.date = new Date().toISOString().substring(0,10)
  }
  
  User.findByIdAndUpdate(
    iid,
    {$push: {log: newExerciseItem}},
    {new: true},
    (error, updatedUser) => {
    if(!error){
      let responseObject = {}
      responseObject['_id'] = updatedUser.id
      responseObject['username'] = updatedUser.username
      responseObject['description'] = newExerciseItem.description
      responseObject['duration'] = newExerciseItem.duration
      responseObject['date'] = new Date(newExerciseItem.date).toDateString()
      response.json(responseObject)
    }
  })
})

app.get("/api/users/:_id/logs", (request, response) => {
  
  User.findById(request.params._id, (error, result) => {
    if(!error){
      let responseObject = result
      
      if(request.query.from || request.query.to){
        
        let fromDate = new Date(0)
        let toDate = new Date()
        
        if(request.query.from){
          fromDate = new Date(request.query.from)
        }
        
        if(request.query.to){
          toDate = new Date(request.query.to)
        }
        
        fromDate = fromDate.getTime()
        toDate = toDate.getTime()
        
        responseObject.log = responseObject.log.filter((session) => {
          let sessionDate = new Date(session.date).getTime()
          
          return sessionDate >= fromDate && sessionDate <= toDate
          
        })
        
      }
      
      if(request.query.limit){
        responseObject.log = responseObject.log.slice(0, request.query.limit)
      }
      
      responseObject = responseObject.toJSON()
      responseObject['count'] = result.log.length
      response.json(responseObject)
    }
  })
  
})
