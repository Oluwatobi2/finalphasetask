 const { Mongoose } = require('mongoose');
const { userSchema } = require('../model/indexmodel');
 
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
     
     function calcDist (lat1, lon1, lat2, lon2){
         if ((lat1 == lat2) && (lon1 == lon2)) {
             return 0;
         }
            var R = 6371; //km
            var dLat = toRad(lat2 - lat1);
            var dLon = toRad(lon2 - lon1);
            var lat1 = toRad(lat1);
            var lat2 = toRad(lat2);

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c
            return d;
     }
      function toRad(Value){
          return Value * Math.PI / 180;
      }
    
    alert(calcDist(6.5227,5.4527,3.6218,7.5248).toFixed(1));
    console.log(Value(toRad()));

    res.json({
        successful: true,
        message:"Distance Calculated",
       
    })
};
 
 module.exports = { create, edit, handleDelete, fetchAll, fetch, distBtwnLocation };