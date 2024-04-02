// import { Order } from "../model/orders.model.js";

// export const BuyNow = async (request,response,next)=>{
//     try{
//       let {cartId,userId,productId} = request.body;
//       let order = await Order.findOne({cartId});
//       if(order){
//          let status = order.orderDetails.some((user)=>user.userId=userId);
//          let status2 = order.orderDetails.some((product)=>product.productId==productId);
//          if(status&&status2)
//            return response.status(200).json({message: "you've already placed an order"});
         
//             order.orderDetails.push({productId},{userId});
//          await order.save();
//          return response.status(200).json({message: "order placed successfully"});  
//       }
//       else{
//         // very first time user performing add to cart
//         order = await Order.create({cartId,productDetails:[{userId},{productId}]});
//         return response.status(200).json({message: "order placed successfully", order: order});
//       }
//     }
//     catch(err){
//         console.log(err);
//         return response.status(500).json({error: "Internal server error"});
//     }
// }
import {Order} from "../model/orders.model.js";

export const saveOrder = async (request,response,next) =>{
       try{
             let {userId,productId,quantity,address,isDelivered}=request.body;
                let order = await Order.findOne({userId:request.body.userId});
                if(order){
                        order.orderitem.push({productId,quantity,address,isDelivered});
                        await order.save();
                        return response.status(200).json({Result:"Success"});
                }
                else{
                        order = await Order.create({userId,orderitem:[{productId,quantity,address,isDelivered}]})
                        return response.status(200).json({massage : "Order Add Success"});
                }
        }
       catch(err){
        console.log(err);
        return response.status(500).json({massage : "Internal server Error"});
       }
}

export const getOrder = async (request,response,next) =>{
        let OrderId = request.params.id;
        let userId = request.params.userid;
        let order = await Order.findOne({userId}).populate('orderitem.productId').populate('userId');
        
        let orderObject  = order.orderitem.find((product) =>product._id==OrderId);
        console.log('__-----------------------____')
     //let orderall = await order.orderitem.;
        console.log(orderObject);
     return response.status(200).json({Massage : "success"});
}