 const { Mongoose } = require('mongoose');
const { userSchema } = require('../model/indexmodel');
const axios = require('axios');
 
 //CREATE A NEW LOCATION DATA
 function create (req, res){
     const { locationName, Description, Phone, contactPerson, Coordinates} = req.body;
     const newLocation = new userSchema({
        locationName,
         Description,
          Phone,
           contactPerson,
            Coordinates
     });

     newLocation.save(function(err, locationData){
         if (err) console.log (err);

         res.json({
             message: "New location added",
             locationData
         })
     });
 };
// EDITING LOCATION DATA
 function edit (req, res){
     const Location = req.params.id;
     const { locationName, Phone } = req.body;
     userSchema.findByIdAndUpdate(Location, {locationName, Phone}, {new: true}, function(err, newLocation){
         if (err) console.log(err);
         res.json({
             status: "Location information edited",
             newLocation
     });
 });
}

//DELETING LOCATION
 function handleDelete (req, res){
     const locationId = req.params.id;
     userSchema.findByIdAndDelete(locationId, function(err, locationData){
         if (err) console.log (err);

         res.json({
             status: "Location deleted succesfully",
             locationData
         });
     });
 };

 //FETCHING ALL LOCATIONS
 function fetchAll(req, res){
     userSchema.find({}, 'locationName Description Phone contactPerson Coordinates', function(err, locationData){
         if (err) console.log(err);

         res.json({
             status:"completed",
             locationData
         });
     });
};

//FETCHING LOCATION USING UNIQUE PROPERTY
function fetch (req, res){
    const locationId = req.params.id;
    userSchema.findById(locationId,'locationName Description Phone contactPerson Coordinates', function(err, locationData){
        if (err) console.log(err);

        res.json({
            status: "successful",
            locationData
        });
    }
        
   )};


//CALCULATING DISTANCE BETWEEN LOCATIONS
function distBtwnLocation(req, res){
        const distance = req.distance;
        const latitudeLocation = req.userSchema.Coordinates[0];
        const longitudeLocation = req.userSchema.Coordinates[1];

    res.json({
        successful: true,
        message:"Distance Calculated",
       data:{
           distance
       }
    })
};
 
 module.exports = { create, edit, handleDelete, fetchAll, fetch, distBtwnLocation };