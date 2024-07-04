import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader"; // Adjust path as per your project structure
import { GrLanguage } from "react-icons/gr";
const ViewBookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row">
      <div className="bg-zinc-900 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-center">
        <img src={book.url} alt="/" className="h-[40vh] lg:h-[60vh] rounded" />
      </div>
      <div className="p-4 w-full lg:w-3/6">
        <h2 className="text-4xl text-zinc-300 font-semibold">{book.title}</h2>
        <p className="text-zinc-300 mt-1">by {book.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{book.desc}</p>
        <p className="flex mt-4 items-center justify-start text-zinc-400">
          <GrLanguage className="me-3"/>{book.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price: ₹ {book.price}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
