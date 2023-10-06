import Head from "next/head";
import { Layout } from "@/layout";

export default function Profile() {
  return (
    <>
      <Layout>
        <p className="p-3 shadow-2xl text-3xl font-semibold text-center cursor-pointer bg-slate-100 hover:bg-slate-50 active:shadow-none active:scale-95">
          Profile
        </p>
      </Layout>
    </>
  );
}
