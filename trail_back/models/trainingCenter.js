const mongoose =require('mongoose');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        min:3,
        max:1024,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024,
    },
    vechile:{type: mongoose.Schema.Types.ObjectId, ref: 'Vechile'},
    address:{type: mongoose.Schema.Types.ObjectId, ref: 'Address',required:false},
    price:{type: mongoose.Schema.Types.ObjectId, ref: 'Price',required:false},
},{
    timestamps:true
});

module.exports=mongoose.model("TrainingCenter",UserSchema);