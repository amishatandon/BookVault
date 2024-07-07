import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavouriteBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-favourite-books", { headers });
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetchFavouriteBooks();
  }, [favouriteBooks]);

  return (
    <>{favouriteBooks.length===0 && <div
      className="text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full h-[100%]">No favourite book</div>}
      <div className="grid grid-cols-4 gap-4">

      
{favouriteBooks && favouriteBooks.map((item, i) => (
  <div key={i}>
    <BookCard data={item} favourite={true} /> {/* Corrected prop name to 'favourite' */}
  </div>
))}
</div>
</>
    
  );
};

export default Favourites;
