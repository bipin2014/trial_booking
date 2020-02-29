const express = require('express');

const app = express();

const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const tcRoute = require('./routes/traningcRoute');

const bookingRoute=require('./routes/bookingRoute');

const bodyParser = require('body-parser');




app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

require('dotenv/config');

const middle = (req, res) => {
    console.log("Middle");
}

// app.use('/api/products', productRoute)
app.use('/api/user', authRoute)
app.use('/api/tc', tcRoute)
app.use('/api/booking', bookingRoute)
// app.use('/api/cart', cartRoute)
// app.use('/api/payment', paymentRoute)
// app.use('/api/order', orderRoute)
// app.use('/api/bSeller', bSellerRoute)
// app.use('/api/referal', referalRoute)
// app.use('/api/verify', paymentCodeRoute)
// app.use('/api/transaction', transactionRoute)

app.use('/uploads',express.static('uploads'));

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Coonected to DB")
);



app.listen(5000);
