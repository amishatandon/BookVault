import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
    ];

    return (
        <div className="flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
            <div className="flex items-center">
                <img
                    className="h-10 mr-4"
                    src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                    alt="logo"
                />
                <h1 className="text-2xl font-semibold">BOOKVAULT</h1>
            </div>
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                        ></path>
                    </svg>
                </button>
            </div>
            <div className={`md:flex items-center gap-4 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
                <div className="flex flex-col md:flex-row md:gap-4">
                    {links.map((items, i) => (
                        <Link
                            to={items.link}
                            className="hover:text-blue-500 transition-all duration-300"
                            key={i}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {items.title}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row md:gap-4 mt-4 md:mt-0">
                    <Link
                        to="/LogIn"
                        className="px-4 py-2 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 mb-5"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        LogIn
                    </Link>
                    <Link
                        to="/SignUp"
                        className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        SignUp
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
