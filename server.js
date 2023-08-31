const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const productsRoute = require("./routes/products")
const cors = require('cors');
app.use(cors());

dotenv.config();
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBconnnection succesfull!"))
    .catch((err)=>{
        console.log(err);
    });

app.use(express.json());
app.use("/api/products", productsRoute);

app.listen(process.env.PORT || 3030, () => {
  console.log("Backend server is running!");
});