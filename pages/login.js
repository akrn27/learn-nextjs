import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const login = () => {
  const { mutate } = useMutation();
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  // TOAST
  const [toastPop, setToastPop] = useState(true);
  const [autoHide, setAutoHide] = useState(false);
  useEffect(() => {
    if (autoHide) {
      const timeout = setTimeout(() => {
        setToastPop(true);
        setAutoHide(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [autoHide]);

  const handleSubmit = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload,
    });
    console.log("response => ", response);
    if (!response.success) {
      // console.log(response.success);
      setToastPop(response.success);
      setAutoHide(true);
    } else {
      Cookies.set("user_token", response.data.token, {
        expires: new Date(response.data.expires_at),
        path: "/",
      });
      router.push("/");
    }
  };

  return (
    <>
      {!toastPop ? (
        <div className="absolute bottom-10 right-14 z-50">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Email dan Password salah
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      ) : (
        ""
      )}
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-2xl font-semibold mb-3">LOGIN PAGE</h1>
        <form className="flex max-w-md flex-col gap-4 w-full shadow-lg p-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              placeholder="name"
              required
              type="email"
              value={payload.email}
              onChange={(e) =>
                setPayload({ ...payload, email: e.target.value })
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              required
              type="password"
              value={payload.password}
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
            />
          </div>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </form>
      </div>
    </>
  );
};

export default login;
