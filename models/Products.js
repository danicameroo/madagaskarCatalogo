const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema(
    {
        title:{type: String , required:true },
        subtitle:{type: String , required:true },
        desc:{type: String , required:true },
        comp:{type: Array },
        img:{type: Array , required:true },
        categories:{ type:Array },
        size:{type: Array },
        colorFlavor:{type: Array },
        brand:{type: String},
        stock:{type: Number, required:true },
        price:{type:Number , required:true },
        priceTwo:{type: String },
        reserva:{type: String },
        oferta: {type:Boolean},
        precioSinOferta: {type: String },
        inStock:{type:Boolean, default:true}
    },
    {timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);