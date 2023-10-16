import React from "react";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

const DetailNotes = ({ notes }) => {
  console.log(notes);

  return (
    <div className="text-red-400">
      <LayoutComponent metaTitle="Home">
        <div className="p-3 shadow-2xl hover:bg-slate-50 active:shadow-none">
          <p>Title: {notes.title}</p>
          <p>Price: {notes.price}</p>
          <img src={notes.images[0]} width={"200px"} />
        </div>
      </LayoutComponent>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products");
  const notes = await res.json();

  const paths = notes.products.map((note) => ({
    params: {
      id: note.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}

export default DetailNotes;
