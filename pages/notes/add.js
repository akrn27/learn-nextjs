import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

const AddNotes = () => {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    category: "",
    image: "",
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { title, category, image } = notes;
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("category", category);
  //   if (image) {
  //     formData.append("image", image, image.name);
  //   }
  //   try {
  //     const response = await fetch("https://dummyjson.com/products/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: formData,
  //     });
  //     console.log(response.json());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, category, image } = notes;
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          category: category,
          image: image,
        }),
      });
      console.log(response.json());
      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <LayoutComponent metaTitle="Home">
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note Title
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Playstation 5"
              required
              onChange={(e) => setNotes({ ...notes, title: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note Category
            </label>
            <input
              type="text"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setNotes({ ...notes, category: e.target.value })}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              Note Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              onChange={(e) => setNotes({ ...notes, image: e.target.files[0] })}
            />
            <div
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="user_avatar_help"
            >
              A profile picture is useful to confirm your are logged into your
              account
            </div>
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

export default AddNotes;
