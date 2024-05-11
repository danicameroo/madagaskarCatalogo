const Inmueble = require("../models/Inmueble");
const router = require("express").Router();

//CREATE
router.post("/" ,async (req,res)=>{
    const newInmueble = new Inmueble(req.body)

    try{
        const savedInmueble = await newInmueble.save();
        res.status(200).json(savedInmueble)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id", async (req,res) =>{  
    try{
        const updatedInmueble = await Inmueble.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        res.status(200).json(updatedInmueble);
    }catch(err){
        res.status(500).json(err)
    }
});

//DELETE
router.delete("/:id", async (req,res)=>{
    try{
        await Inmueble.findByIdAndDelete(req.params.id);
        res.status(200).json("Inmueble has been deleted");
    }catch(err){ 
        res.status(500).json(err);
    }
});

//GET INMUEBLE
router.get("/find/:id", async (req,res)=>{
    try{
        const inmueble = await Inmueble.findById(req.params.id);
        res.status(200).json(inmueble);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL INMUEBLES
router.get("/", async (req,res)=>{
    const qNew = req.query.new;
    try{
        let inmueble;
        if(qNew){
            inmueble = await Inmueble.find().sort({createdAt: -1}).limit(5)
        }else{
            inmueble = await Inmueble.find()
        }
        res.status(200).json(inmueble);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router