const mongoose=require('mongoose');

const paymentSchema=mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'Users',required:true},
    amount: Number,
    date:{
        type:String,
        default: new Date().toISOString()
    }
});

module.exports=mongoose.model("transaction",paymentSchema);