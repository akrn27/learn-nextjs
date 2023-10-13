import Layout from "@/layout";
import { useRouter } from "next/router";
import React from "react";

const UsersByName = () => {
  const router = useRouter();
  const { id } = router?.query;

  console.log(id);

  return (
    <Layout>
      <p>Users by {id}</p>
    </Layout>
  );
};

export default UsersByName;
