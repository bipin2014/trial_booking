const mongoose = require('mongoose');

const userAddressSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    country: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    phone: { type: Number, required: true },
});

module.exports = mongoose.model('Address', userAddressSchema);