const express = require('express');
const router = express.Router();
const { isValidObjectId } = require('mongoose');
const { db } = require('../models/vehicles');

const Vehicle = require('../models/vehicles');

//retriving data
router.get('/vehicles', (req, res, next) => {
    Vehicle.find(function(err, vehicles) {
        res.json(vehicles);
    })
});



//add vehicle_parts data 
router.post('/vehicle', (req, res, next) => {
    let newVehicle = new Vehicle({
        part_name: req.body.part_name,
        ShelveNumber: req.body.ShelveNumber,
        Location: req.body.Location,
        PurchaseDate: req.body.PurchaseDate,
        AvailableQuantity: req.body.AvailableQuantity,
        UnitPrice: req.body.UnitPrice

    });

    newVehicle.save((err, vehicle) => {
        if (err) {
            res.json({ msg: 'Failed to add contact' })
        } else {
            res.json({ msg: 'vehicle added successfully' })
        }
    });
});




//delete vehicle_parts data 
router.delete('/vehicle/:id', (req, res, next) => {
    Vehicle.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err);

        } else {
            res.json(result);

        }
    })
});



//retrive by ID  for name search
router.get('/vehicle/:name', (req, res, next) => {
    Vehicle.find({ part_name: { $regex: '.*' + req.params.name + '.*' } }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//Update
router.put('/vehicle/:id', function(req, res) {

    console.log('Update a record');

    Vehicle.findByIdAndUpdate(req.params.id, {
            $set: {
                part_name: req.body.part_name,
                ShelveNumber: req.body.ShelveNumber,
                Location: req.body.Location,
                PurchaseDate: req.body.PurchaseDate,
                AvailableQuantity: req.body.AvailableQuantity,
                UnitPrice: req.body.UnitPrice
            }
        },

        (err, updatedVehicleparts) => {
            if (err) {
                res.send("Error");
            } else {
                res.json(updatedVehicleparts);
            }

        }

    );
});

module.exports = router;