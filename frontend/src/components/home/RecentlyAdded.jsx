import React, { useEffect, useState } from "react";
import axios from "axios";//use to fetch data from backend
import BookCard from "../BookCard/BookCard";
const RecentlyAdded = () => {
    const [Data, setData]= useState();
    useEffect(()=>{
        const fetch= async()=>{
            const response= await axios.get("http://localhost:4000/api/v1/get-recent-books");
            setData(response.data.data);
        };
        fetch();
    },[]);
  return (
    <div className="mt-8 px-6">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data && Data.map((items,i)=><div key={i}>
            <BookCard dta={items}/>{" "}
        </div>)}
      </div>
    </div>
  );
};

export default RecentlyAdded;
