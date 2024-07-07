import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [cart, setCart] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-user-cart", { headers });
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };
    fetchCart();
  }, [cart]);

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/remove-from-cart/${itemId}`, {}, { headers });
      // Assuming you want to refresh the cart after deletion
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  if (!cart) {
    return <Loader />;
  }

  if (cart.length === 0) {
    return (
      <div className="h-screen bg-zinc-900">
        <div className="h-[100%] flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
      {cart.map((item, i) => (
        <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center" key={i}>
          <img src={item.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
          <div className="w-full md:w-auto">
            <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
              {item.title}
            </h1>
            <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
              {item.desc.slice(0, 100)}...
            </p>
            <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
              {item.desc.slice(0, 65)}...
            </p>
            <p className="text-normal text-zinc-300 mt-2 block md:hidden">
              {item.desc.slice(0, 100)}...
            </p>
          </div>
          <div className="flex mt-4 w-full md:w-auto items-center justify-between">
            <h2 className="text-zinc-100 text-3xl font-semibold flex">
              {item.price}
            </h2>
            <button className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12" onClick={() => deleteItem(item._id)}>
              <AiFillDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
