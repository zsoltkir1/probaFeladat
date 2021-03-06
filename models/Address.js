const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city:  {
        type: String,
        required: true,
    },
    street:  {
        type: String,
        required: true,
    },
    street_number:  {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Addresses', AddressSchema);