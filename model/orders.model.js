import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    orderitem:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"allproducts"
            },
            quantity:{
                type:Number,
                require:true,
                default:1
            },
            address:{
                type:String,
                require:true
            },
            isDelivered:{
                type:Boolean,
                default:false
            }
        }
    ]
});

export const Order = mongoose.model("order",orderSchema);