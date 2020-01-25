const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique : true
    },
    addresses: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Persons', PersonSchema);