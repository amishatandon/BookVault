const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./connection/connection");

const user= require("./routes/user");
const Books = require("./routes/book");
const Favourite= require("./routes/favourites");
const Cart= require("./routes/cart");
const Order= require("./routes/order");
// app.get("/",(req, res)=>{
//     res.send("hello from backend side");
// });
//routes

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server started on ${process.env.PORT}`);

});