import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

const Notes = ({ notes }) => {
  console.log(notes);
  return (
    <div className="text-red-400">
      <LayoutComponent metaTitle="Home">
        <div className="p-3 shadow-2xl hover:bg-slate-50 active:shadow-none">
          {notes.products.map((note) => (
            <div className="border p-2">
              <Link href={`/notes/${note.id}`}>{note.title}</Link>
            </div>
          ))}
        </div>
      </LayoutComponent>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products");
  const notes = await res.json();
  return { props: { notes } };
  // return { props: { notes }, revalidate: 10 };
}

export default Notes;
