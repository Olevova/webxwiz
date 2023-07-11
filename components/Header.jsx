import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useCartContext } from "@/context/cardContext";
import Cart from "./Cart";
import { useAuthContext } from "@/context/authContext";

function Header() {
  const { items, cardtoggle, toggleCard, delCardItem } = useCartContext();
  console.log(items, "items");
  const { user, handleLogout } = useAuthContext();

  const handleLogoutClick = () => {
    handleLogout(user);
  };
  return (
    <div className="bg-red-800 text-zinc-50 h-[100px] w-full flex justify-center py-3 px-10 ">
      <div className="h-full w-10/12 flex justify-between items-center">
        <span className="h-10 w-24 text-white text-5xl ">OLEVOVA</span>
        <Link
          href="/"
          className="h-10 w-24 text-white text-5xl hover:text-yellow-400"
        >
          Home
        </Link>
        <div className="bg-red-900 rounded-md flex items-center justify-around w-1/4">
          <div className="bg-red-900  py-2 flex items-center justify-center w-1/4 relative">
            <AiOutlineShopping
              size={40}
              onClick={toggleCard}
              className="cursor-pointer hover:text-yellow-400"
            />
            <span className="absolute rounded-full bg-white px-2 py-1 top-0 right-3 text-black">
              {items?.length}
            </span>
            <div className="absolute -top-0 -right-60 z-10">
              {cardtoggle && <Cart />}
            </div>
          </div>
          {user ? (
            <>
              <div className="bg-white rounded-md px-5 py-2 text-red-900 cursor-pointer hover:text-yellow-400">
                {user.username}
              </div>
              <div
                className="bg-white rounded-md px-5 py-2 text-red-900 cursor-pointer hover:text-yellow-400"
                onClick={handleLogoutClick}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <div className="bg-white rounded-md px-5 py-2 text-red-900 cursor-pointer hover:text-yellow-400">
                  Login
                </div>
              </Link>
              <Link href="/register">
                <div className="bg-white rounded-md px-5 py-2 text-red-900 cursor-pointer hover:text-yellow-400">
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
