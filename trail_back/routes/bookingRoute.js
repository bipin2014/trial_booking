const express = require('express');
const auth = require('../validation/verifywebtoken');
const router = express.Router();

const bookingModel = require('../models/booking');

router.post('/book', auth, async (req, res) => {

    const bookingData = new bookingModel({
        user: req.user._id,
        traningcenter:req.body.tc,
        car: req.body.car,
        bike:req.body.bike,
        duration:req.body.duration,
        startTime:req.body.startTime,
        date:req.body.date
    });

    try {
        const saveProducts = await bookingData.save();
        return res.json(saveProducts);
    } catch (err) {
        return res.json({ error: err });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const booked = await bookingModel.find({"user":req.user._id}).populate("traningcenter");
        return res.json({booked});

    } catch (e) {
        console.log(e);
    }
});


router.get('/getfromtrainer', auth, async (req, res) => {
    try {
        const booked = await bookingModel.find({"traningcenter":req.user._id}).populate("user");
        return res.json({booked});

    } catch (e) {
        console.log(e);
    }
});


router.get('/all', auth, async (req, res) => {
    try {
        const order = await bookingModel.find().populate('payment').populate('products.product');
        return res.json({order: order});

    } catch (e) {
        console.log(e);
    }
});


module.exports = router;
