const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'Users',required:true},
    traningcenter:{type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCenter',required:true},
    car:{
        type:Number,
        default:0,
    },
    bike:{
        type:Number,
        default:0
    },
    duration:{
        type:Number,
        required:true,
    },
    startTime:{
        type:String,
        required:true
    },
    status: { type: Boolean, default: true },
    date:{
        type:String,
        default: new Date().toISOString()
    },
},{
    timestamps: true
});

module.exports=mongoose.model("Booking",Schema);