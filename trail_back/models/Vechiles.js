const mongoose = require('mongoose');

const VechileSchema = mongoose.Schema({
    car:{
        type:Number,
        required:true
    },
    bike:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("Vechile", VechileSchema);