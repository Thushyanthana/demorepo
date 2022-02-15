//Include schema
const mongoose = require('mongoose');


const VehicleSchema = mongoose.Schema({
    part_name: {
        type: String,
        required: true
    },
    ShelveNumber: {
        type: String,
        required: true
    },

    Location: {
        type: String,
        required: true
    },

    PurchaseDate: {
        type: Date,
        required: true
    },

    AvailableQuantity: {
        type: Number,
        required: true
    },

    UnitPrice: {
        type: Number,
        required: true
    }


});

const Vehicle = module.exports = mongoose.model('Vehicle', VehicleSchema);