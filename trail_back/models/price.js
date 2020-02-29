const mongoose = require('mongoose');

const priceSchema = mongoose.Schema({
    tcenter: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCenter' },
    half:{
        type:Number,
        required:true,
    },
    full:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model('Price', priceSchema);