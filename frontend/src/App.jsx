import React from "react";
import './index.css';
import Home from "./pages/home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
       <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route  path="/all-books" element={<AllBooks />}/>
        <Route  path="/LogIn" element={<LogIn />}/>
        <Route  path="/SignUp" element={<SignUp />}/>
        <Route  path="/cart" element={<Cart />}/>
        <Route  path="/profile" element={<Profile />}/>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />}/>
        </Routes> 
        <Footer />
        
        </Router>
      
      
      
    </div>
  );
};
export default App;
