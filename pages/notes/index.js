import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQueries } from "@/hooks/useQueries";
import { Spinner } from "flowbite-react";
import { useMutation } from "@/hooks/useMutation";
// import fetcher from "@/utils/fetcher";
// import useSWR from "swr";
import { Button, Modal, Label, TextInput } from "flowbite-react";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

const Notes = ({ notes }) => {
  const router = useRouter();
  const { mutate } = useMutation();
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [noteUpd, setNoteUpd] = useState({
    id: "",
    title: "",
    description: "",
  });

  // MODAL READ
  const [popupContent, setPopupContent] = useState([]);
  const changeContent = (note) => {
    setPopupContent([note]);
  };

  // MODAL CREATE
  const [modalCreate, setModalCreate] = useState(false);

  // MODAL EDIT
  const [modalEdit, setModalEdit] = useState(false);
  const changeEditContent = async (e) => {
    let idData = e.target.value;
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/${idData}`
      );
      const data = await response.json();
      console.log("Data => ", data.data);
      setNoteUpd({
        id: data.data.id,
        title: data.data.title,
        description: data.data.description,
      });
      if (noteUpd) {
        setModalEdit([note]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("NoteUpdData => ", noteUpd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
      payload: note,
    });
    console.log("response => ", response);
    if (response) {
      router.reload();
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { id, title, description } = noteUpd;
    console.log("Form => ", id, title, description);

    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
      method: "PATCH",
      payload: { title: title, description: description },
    });
    if (response) {
      router.reload();
    }
  };

  const confirmDelete = async (id) => {
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
          onClick={() => setModalCreate(true)}
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>

        {notes ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {notes?.data.map((note, index) => (
              <div
                className="w-full sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <div className="flex flex-col items-center pb-10">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {note.title}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {note.description}
                  </span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <button
                      onClick={changeEditContent}
                      value={note.id}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-red border border-gray-300 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none bg-red-400 text-white focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      onClick={() => changeContent(note)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Spinner
              aria-label="Default status example"
              color="purple"
              size="xl"
            />
          </div>
        )}
        {/* MODAL GET NOTES BY ID */}
        <div>
          {popupContent
            ? popupContent.map((res) => {
                return (
                  <div>
                    <Modal
                      show={popupContent}
                      size="md"
                      popup
                      onClose={() => setPopupContent(undefined)}
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div className="text-center">
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this notes?
                          </h3>
                          <div className="flex justify-center gap-4">
                            <Button
                              color="failure"
                              onClick={() => console.log(confirmDelete(res.id))}
                            >
                              Yes, I'm sure 😡
                            </Button>
                            <Button
                              color="gray"
                              onClick={() => setPopupContent(undefined)}
                            >
                              No, cancel 😇
                            </Button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                );
              })
            : ""}
        </div>
        {/* MODAL CREATE */}
        <Modal
          show={modalCreate}
          size="md"
          popup
          onClose={() => setModalCreate(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  Create new Data
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="title" value="Note's title" />
                  </div>
                  <TextInput
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                    id="title"
                    placeholder="Contoh: Hari ini beli kangkung"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="description" value="Note's description" />
                  </div>
                  <TextInput
                    value={note.description}
                    onChange={(e) =>
                      setNote({ ...note, description: e.target.value })
                    }
                    placeholder="Kangkung rasa vanilla 1 dan rasa cokelat 2"
                    id="description"
                    type="text"
                    required
                  />
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 mt-5"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        {/* MODAL EDIT */}
        <Modal
          show={modalEdit}
          size="md"
          popup
          onClose={() => setModalEdit(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <form onSubmit={handleEdit}>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  Edit Data
                </h3>
                <>
                  {/* {noteUpd[0]
                    ? noteUpd[0].map((res) => {
                        return (
                          <> */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="title" value="Note's title" />
                    </div>
                    <TextInput
                      value={noteUpd.title}
                      onChange={(e) =>
                        setNoteUpd({
                          ...noteUpd,
                          title: e.target.value,
                        })
                      }
                      id="title"
                      placeholder="Contoh: Hari ini beli kangkung"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="description" value="Note's description" />
                    </div>
                    <TextInput
                      value={noteUpd.description}
                      onChange={(e) =>
                        setNoteUpd({
                          ...noteUpd,
                          description: e.target.value,
                        })
                      }
                      placeholder="Kangkung rasa vanilla 1 dan rasa cokelat 2"
                      id="description"
                      type="text"
                      required
                    />
                  </div>
                  {/* </>
                        );
                      })
                    : ""} */}
                  <div className="w-full">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 mt-5"
                    >
                      Save
                    </button>
                  </div>
                </>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </LayoutComponent>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/notes");
    const notes = await response.json();
    return { props: { notes } };
  } catch (error) {
    console.log(error);
    return { props: { notes: null } };
  }
};

export default Notes;
