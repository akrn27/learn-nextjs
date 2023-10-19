import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQueries } from "@/hooks/useQueries";
import { Spinner } from "flowbite-react";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

const Notes = () => {
  const { data, isLoading } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
  });
  const [notes, setNotes] = useState();
  const router = useRouter();
  const { mutate } = useMutation();

  console.log("Data => ", data);

  const handleDelete = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
      method: "DELETE",
    });
    console.log("Response => ", response);
    if (response) {
      router.reload();
    }
  };

  return (
    <div>
      <LayoutComponent metaTitle="Home">
        <button
          onClick={() => router.push("/notes/add")}
          type="button"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center justify-center w-full sm:w-52 sm:ml-2"
        >
          Create new data
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner
              aria-label="Default status example"
              color="purple"
              size="xl"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {data?.data.map((note, index) => (
              <div
                class="w-full sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <div class="flex flex-col items-center pb-10">
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {note.title}
                  </h5>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {note.description}
                  </span>
                  <div class="flex mt-4 space-x-3 md:mt-6">
                    <Link
                      href={`/notes/edit/${note.id}`}
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      class="inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-red border border-gray-300 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none bg-red-400 text-white focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </LayoutComponent>
    </div>
  );
};

// export async function getStaticProps() {
//   const res = await fetch("https://dummyjson.com/products");
//   const notes = await res.json();
//   return { props: { notes } };
//   // return { props: { notes }, revalidate: 10 };
// }

export default Notes;
