import React from "react";
import { Menu } from "../menu";
import { withAuth } from "../with-auth";

// import styles from "./styles.module.css";

const Header = () => {
  return (
    <>
      {/* <Menu /> */}
      <div className="p-3 shadow-2xl text-3xl font-semibold text-center cursor-pointer bg-slate-100 hover:bg-slate-50 active:shadow-none active:scale-95 mb-3">
        Header
      </div>
    </>
  );
};

export default withAuth(Header);
