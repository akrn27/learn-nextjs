import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

const editNote = ({ note }) => {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useMutation();

  const [notes, setNotes] = useState({
    title: note.data.title,
    description: note.data.description,
  });

  useEffect(() => {}, [id]);
  console.log("=> ", note);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = notes;

    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
      method: "PATCH",
      payload: { title: title, description: description },
    });
    router.push("/notes");
  };

  return (
    <div>
      <LayoutComponent metaTitle="Home">
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Note Harian"
              required
              value={notes?.title}
              onChange={(e) => setNotes({ ...notes, title: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note Description
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Hari ini saya makan Indomie"
              value={notes?.description}
              onChange={(e) =>
                setNotes({ ...notes, description: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 mt-4 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </LayoutComponent>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const { id } = params;
    const response = await fetch(
      `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`
    );
    const note = await response.json();
    return { props: { note } };
  } catch (error) {
    console.log(error);
    return { props: { note: null } };
  }
};

export default editNote;
