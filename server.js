const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require('cors');
app.use(cors());

dotenv.config();
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBconnnection succesfull!"))
    .catch((err)=>{
        console.log(err);
    });

//CREATE
app.post("/api/products/" ,async (req,res)=>{
  const newProduct = new Product(req.body)

  try{
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct)
  }catch(err){
      res.status(500).json(err)
  }
})

//UPDATE
app.put("/api/products/:id", async (req,res) =>{  
  try{
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
          $set: req.body
      },{new:true});
      res.status(200).json(updatedProduct);
  }catch(err){
      res.status(500).json(err)
  }
});

//DELETE
app.delete("/api/products/:id", async (req,res)=>{
  try{
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted");
  }catch(err){ // Se agrega el parámetro 'err' en el bloque catch
      res.status(500).json(err);
  }
});

//GET PRODUCT
app.get("/api/products/find/:id", async (req,res)=>{
  try{
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
  }catch(err){
      res.status(500).json(err);
  }
});


//GET ALL PRODUCTS
app.get("/api/products/", async (req,res)=>{
  const qNew = req.query.new;
  try{
      let products;
      if(qNew){
          products = await Product.find().sort({createdAt: -1}).limit(5)
      }else if(qCategory){
          products = await Product.find({categories:{$in: [qCategory],}})
      }else{
          products = await Product.find()
      }
      res.status(200).json(products);
  }catch(err){
      res.status(500).json(err);
  }
});


app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running!");
});