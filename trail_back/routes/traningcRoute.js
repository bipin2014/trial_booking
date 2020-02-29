const express = require('express');

const userModel = require('../models/users');
const tcmodel = require('../models/trainingCenter');
const vecModel = require('../models/Vechiles');

const router = express.Router();

const auth = require('../validation/verifywebtoken');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.post('/', auth, upload.single("image"), async (req, res) => {
    // console.log(req.file);
    const productsData = new productModel({
        image: req.file.path,
        user: req.user._id,
    });

    try {
        const saveProducts = await productsData.save();
        res.json(saveProducts);
    } catch (err) {
        res.json({error: err});
    }
});


router.get('/getAllTrainingCenter',async(req,res)=>{
    try{
        const tcData=await tcmodel.find();
        res.json({"data":tcData})

    }catch(err){
        console.log(err); 
    }
});


router.post('/signup', async (req, res) => {

    const emailExists = await userModel.findOne({ email: req.body.email });
    if (emailExists) return res.json({ error: "Email is alrady registerd" });
    const emailExistsint = await tcmodel.findOne({ email: req.body.email });
    if (emailExistsint) return res.json({ error: "Email is alrady registerd" });


    if (req.body.password !== req.body.confirmPassword) return res.json({ error: "Password does not match" });

    const vData=new vecModel({
        car:0,
        bike:0,
    });

    const vSaved=await vData.save();

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    const userData = new tcmodel({
        name: req.body.name,
        email: req.body.email,
        password: hasedPassword,
        vechile:vSaved._id,
    });

    try {
        const savedUser = await userData.save();
            
        return res.json(savedUser);
    } catch (err) {
        res.json({ error: err });
    }

});

router.post('/login', async (req, res) => {
    //Validation
    // const { error } = loginValidation(req.body);
    // if (error) res.json({ error: error.details[0].message });
    
    const user = await tcmodel.findOne({ email: req.body.email });
    if (!user) res.json({ error: "Email is incorrect" });

    //Check Password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.json({ error: "Incorrect Password" });
    }
    else {
        const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.TOKEN_SECRET);
        return res.json({ token: token });
    }
});

router.get('/getData/:id',async(req,res)=>{
    try{
        const tcData=await tcmodel.find({_id:req.params.id}).populate("vechile");
        res.json({"data":tcData})

    }catch(err){
        console.log(err); 
    }
});





module.exports = router;