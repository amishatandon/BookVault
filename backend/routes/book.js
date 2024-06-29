const router = require("express").Router();
const User = require("../models/user");
const jwt= require("jsonwebtoken");
const mongoose = require("mongoose");
const Book = require("../models/books");
const {authenticationToken}= require("./userAuth");

//add bokk-- admin
router.post("/add-book", authenticationToken, async (req , res)=>{
    try{
        const {id}= req.headers;
        const user = await User.findById(id);
        if(user.role!== "admin"){
            return res.status(400).json({message: "You are not having access to perform admin"});
        }
        const book= new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({message: "Book added successfully"});
    } catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

//update book
router.post("/update-book", authenticationToken, async (req , res)=>{
    try{
        const {bookid}= req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        
      return res.status(200).json({message: "Book updated successfully"});
    

    } catch(error){
        res.status(500).json({message: "Error occured"});
    }
});

//delete book --admin
router.delete("/delete-book/:bookid", authenticationToken, async (req, res) => {
    try {
      const bookid = req.params.bookid;
  
      // Validate if bookid is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.status(400).json({ message: "Invalid book id format" });
      }
  
      const deletedBook = await Book.findByIdAndDelete(bookid);
  
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });

  //get all books
  router.get("/get-all-books", async (req, res)=>
{
    try{
        const books= await Book.find().sort({createdAt: -1});
        return res.json({
            status: "Success",
            data: books,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//get recently added books last 4
router.get("/get-recent-books", async (req, res)=>
    {
        try{
            const books= await Book.find().sort({createdAt: -1}).limit(4);
            return res.json({
                status: "Success",
                data: books,
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({message: "An error occurred"});
        }
    });
    
    //get book by id
    router.get("/get-book-by-id/:id", async(req, res)=>{
        try{
            const{id}= req.params;
            const book = await Book.findById(id);
            return res.json({
                status: "Success",
                data: book,
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "An error occurred"});
        }
    });

module.exports= router;