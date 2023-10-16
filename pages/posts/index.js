import React from "react";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

const Posts = ({ posts }) => {
  console.log("Data Posts => ", posts);
  return (
    <div className="text-red-400">
      <LayoutComponent metaTitle="Posts">
        <div className="p-3 shadow-2xl hover:bg-slate-50 active:shadow-none">
          {posts.map((item) => (
            <div>
              <p>{item.id}</p>
              <p>{item.title}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </LayoutComponent>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}

export default Posts;
