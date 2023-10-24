import React from "react";
import { withAuth } from "../with-auth";
import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const Header = () => {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });
  const { mutate } = useMutation();
  const [isOpen, setIsOpen] = useState(false);

  // console.log(data);

  const handleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      console.log("Gagal Logout");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

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
          <div className="flex gap-5">
            <li>
              <Link href="/users">Users</Link>
            </li>
            <li>
              <Link href="/notes">Notes</Link>
            </li>
            <li>
              <Dropdown label={`${userData?.name}`} dismissOnClick={false}>
                <Dropdown.Item onClick={() => handleLogout()}>
                  Log out
                </Dropdown.Item>
              </Dropdown>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default withAuth(Header);
