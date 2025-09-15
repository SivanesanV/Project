import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//Placing user model in frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://front-end-vojb.onrender.com"
    try {
        const items = req.body.items;
        let totalAmount = 0;
        items.forEach((item)=>{
            totalAmount +=item.price *item.quantity;
        });
        const newOrder = new orderModel({
            userId: req.userId,
            items,
            amount:totalAmount,
            address: req.body.address,
            
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100// Assuming price is in INR and converting to paise
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 // Assuming delivery charge is 2 INR

            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            metadata: { orderId: newOrder._id.toString() }
        });
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Error" })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: true, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Error" })

    }
}
//User orders from frontend
const useOrders = async(req, res)=> {
try {
    const orders = await orderModel.find({userId:req.userId});
    res.json({success:true, data:orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

//Listing order for admin panel

const listOrders = async(req,res)=>{
    try
    {
        const orders =await orderModel.find({});
        res.json({success:true, data:orders})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//Api for updating order status
const updateStatus= async(req,res)=>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true, message:"Status Updated"})
} catch (error) {
    console.log(error.message);
    res.json({success:false, message:"Error"})
}
}

export { placeOrder, verifyOrder, useOrders, listOrders,updateStatus }
