import React from "react";
import { withAuth } from "../with-auth";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Will appear in Mobile screen size */}
      <div className="sm:hidden p-3 shadow-xl text-2xl font-semibold bg-slate-700 text-slate-100 mb-3">
        <ul className="flex flex-col justify-center ">
          <button onClick={toggleNavbar}>
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
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
          {isOpen && (
            <>
              <div className="flex flex-col text-2xl mt-3 gap-5">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/users">Users</Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>

      {/* Will appear in Desktop screen size */}
      <div className="hidden sm:block p-3 shadow-xl text-2xl font-semibold bg-slate-700 text-slate-100 mb-3">
        <ul className="flex justify-between">
          <div className="flex gap-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </div>
          <li>
            <Link href="/users">Users</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default withAuth(Header);
