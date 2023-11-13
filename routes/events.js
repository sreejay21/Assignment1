var express = require('express');
var router = express.Router();
var eventModel = require('../model/event.model')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Events Route');
});

router.post('/add', function(req, res, next) {
  let newEvent = new eventModel({
    title:req.body.title,
    details: req.body.details,
    on: req.body.on,
    venue: req.body.venue,
    registrationLink:req.body.registrationLink
  })

  newEvent.save()
  .then((response)=>{
    res.send({status:200,events:response})
  })
  .catch((err)=>{
    console.log(err)
  })
});

router.get('/not-over', function(req, res, next) {
  const currentDate = new Date();
  eventModel.find({ on: { $gte: currentDate } })
  .then((response)=>{
      res.send({status:200,Count:response.length,Events:response})
  })
  .catch((err)=>{
      console.log(err)
  })
});

router.get("/eventID", function (req, res, next) {
  const idQuery=req.query.id;
  eventModel.findById(idQuery)
  .then((response)=>{
      res.send({status:200,Events:response})
  })
  .catch((err)=>{
      console.log(err)
  })
});

router.get("/between-dates", function (req, res, next) {
  const { startDate, endDate } = req.query;
  const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  eventModel.find({ on: { $gte: startDateObj, $lte: endDateObj }})
  .then((response)=>{
      res.send({status:200,Events:response})
  })
  .catch((err)=>{
      console.log(err)
  })
});

router.put("/update/:id", function (req, res, next) {
  const idQuery = req.params.id;

  const eventUpdateData = {
    title: req.body.title,
    details: req.body.details,
    on: req.body.on,
    venue: req.body.venue,
    registrationLink: req.body.registrationLink,
  };

  eventModel.findOneAndUpdate({ _id: idQuery }, eventUpdateData, { new: true })
    .then(updatedEvent => {
      if (!updatedEvent) {
        return res.status(404).send({ status: 404, message: 'Event not found' });
      }
      res.send({ status: 200, events: updatedEvent });
    })
    .catch(err => {
      console.error("Error updating event:", err);
      res.status(500).send({ status: 500, message: 'Internal Server Error' });
    });
});


router.delete("/delete", function (req, res, next) {
  const idQuery=req.query.id;
  eventModel.findByIdAndDelete(idQuery)
  .then((response)=>{
      res.send({status:200,Events:response})
  })
  .catch((err)=>{
      console.log(err)
  })
});

module.exports = router;

