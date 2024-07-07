import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader"; // Adjust path as per your project structure
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log(`Fetching details for book ID: ${id}`);
        const response = await axios.get(`http://localhost:4000/api/v1/get-book-by-id/${id}`);
        console.log('API response:', response.data);
        setBook(response.data.data); // Assuming response.data.data contains book details
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  if (!book) {
    return <div>Book not found</div>; // Show message if book data is null
  }

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id, 
  };

  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:4000/api/v1/add-book-to-favourite", {}, { headers });
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put("http://localhost:4000/api/v1/add-to-cart", {}, { headers });
    alert(response.data.message);
  };

  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row">
      <div className="relative w-full lg:w-3/6">
        <img src={book.url} alt="/" className="h-[50vh] lg:h-[70vh] rounded" />
        <div className="absolute top-4 right-4 lg:flex lg:flex-col lg:items-start lg:justify-start lg:gap-4 hidden">
          {isLoggedIn && role === "user" && (
            <>
              <button className="bg-white rounded-full text-3xl p-2 text-red-500 flex items-center justify-center" onClick={handleFavourite}>
                <FaHeart />
                <span className="ml-4 block lg:hidden">Add to favourites</span>
              </button>
              <button className="bg-white rounded-full text-3xl p-2 text-blue-500 flex items-center justify-center mt-2 md:mt-0" onClick={handleCart}>
                <FaShoppingCart />
                <span className="ml-4 block lg:hidden">Add to cart</span>
              </button>
            </>
          )}
          {isLoggedIn && role === "admin" && (
            <>
              <button className="bg-white rounded-full text-3xl p-2 flex items-center justify-center">
                <FaEdit />
                <span className="ml-4 block lg:hidden">Edit Book</span>
              </button>
              <button className="text-red-500 rounded-full text-3xl p-2 mt-2 md:mt-0 flex items-center justify-center">
                <MdOutlineDelete />
                <span className="ml-4 block lg:hidden">Delete Book</span>
              </button>
            </>
          )}
        </div>
        <div className="flex lg:hidden items-center justify-center mt-4 gap-2">
          {isLoggedIn && role === "user" && (
            <>
              <button className="bg-white rounded-full text-3xl p-2 text-red-500 flex items-center justify-center" onClick={handleFavourite}>
                <FaHeart />
                <span className="ml-4 block lg:hidden">Add to favourites</span>
              </button>
              <button className="bg-white rounded-full text-3xl p-2 text-blue-500 flex items-center justify-center" onClick={handleCart}>
                <FaShoppingCart />
                <span className="ml-4 block lg:hidden">Add to cart</span>
              </button>
            </>
          )}
          {isLoggedIn && role === "admin" && (
            <>
              <button className="bg-white rounded-full text-3xl p-2 flex items-center justify-center">
                <FaEdit />
                <span className="ml-4 block lg:hidden">Edit Book</span>
              </button>
              <button className="text-red-500 rounded-full text-3xl p-2 flex items-center justify-center">
                <MdOutlineDelete />
                <span className="ml-4 block lg:hidden">Delete Book</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="p-4 w-full lg:w-3/6">
        <h2 className="text-4xl text-zinc-300 font-semibold">{book.title}</h2>
        <p className="text-zinc-300 mt-1">by {book.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{book.desc}</p>
        <p className="flex mt-4 items-center justify-start text-zinc-400">
          <GrLanguage className="mr-3" />{book.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price: ₹ {book.price}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
