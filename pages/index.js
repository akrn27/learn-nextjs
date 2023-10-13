import dynamic from "next/dynamic";
import { useEffect } from "react";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p>Loading...</p>,
});

export default function Main() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hello");
        const data = await response.json();
        console.log("response => ", data);
      } catch (error) {
        console.log("err => ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="text-red-400">
        <LayoutComponent metaTitle="Home">
          <p className="p-3 shadow-2xl text-3xl font-semibold text-center cursor-pointer bg-slate-100 hover:bg-slate-50 active:shadow-none active:scale-95">
            Home
          </p>
        </LayoutComponent>
      </div>
    </>
  );
}
