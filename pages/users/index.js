import Layout from "@/layout";
import React, { useEffect, useState } from "react";

const Users = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/hello");
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <Layout>
        <p>Users</p>
      </Layout>
    </div>
  );
};

export default Users;
