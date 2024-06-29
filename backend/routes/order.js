
const router = require("express").Router();
const { authenticationToken} = require("./userAuth");
const Book = require("../models/books");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/place-order", authenticationToken, async(req, res)=>{
    try{
        const {id}= req.headers;
        const {order}= req.body;
        for(const orderData of order){
            const newOrder = new Order({user:id, book:orderData._id});
            const orderDataFromDb = await newOrder.save(); 
            //saving order in user model
            await User.findByIdAndUpdate(id,{
                $push:{
                    order: orderDataFromDb._id
                },
            });
            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull:{
                    cart: orderData._id
                },
            });
        }
        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//get order history of particulat user
router.get("/get-order-history", authenticationToken, async (req, res)=>{
    try{
        const {id}= req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        });
        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//get all orders --admin
router.get("/get-all-orders", authenticationToken, async (req, res)=>{
    try{
        const userData = await User.find.populate({
            path: "book",
        }).populate({
            path: "user",
        }).sort({
            createdAt: -1
        });
        return res.json({
            status: "Success",
            data: userData,
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//update order --admin
router.put("/update-status/:id", authenticationToken, async(req, res)=>{
    try{
        const {id}= req.params;
        await Order.findByIdAndUpdate(id,{status: req.body.status});
        return res.json({
            status: "Success",
            message: "Status updated successfully",
        });
    } catch(error){
        console.lof(error);
        return res.status(500).json({message: "an error occurred"});
    }
});

module.exports= router;