import React from "react";

const Navbar = ()=>{
    return(
        <nav className="flex justify-between bg-indigo-800 p-2 sticky top-0">
            <div className="font-bold ml-7 text-2xl">
                <span className="text-white cursor-pointer">iTask</span>
            </div>
            <ul className="flex gap-8 mr-8">
                <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar;